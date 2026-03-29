import 'reflect-metadata';
import AppDataSource from '../../../config/data-source.js';

// Entities
import { User } from '../entities/user.entity.js';
import { Project } from '../entities/project.entity.js';
import { ProjectMember } from '../entities/project-member.entity.js';
import { Board } from '../entities/boards.entity.js';
import { ColumnEntity } from '../entities/columns.entity.js';
import { Task } from '../entities/task.entity.js';
import { Comment } from '../entities/comments.entity.js';

// Enums
import { UserRole } from '../../../common/enums/user-role.enum.js';
import { ProjectRole } from '../../../common/enums/project-role.enum.js';
import { TaskPriority } from '../../../common/enums/task-priority.enum.js';

async function bootstrap() {
  console.log('Connecting to database...');
  await AppDataSource.initialize();
  console.log('Database connected!');

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const manager = queryRunner.manager;

    // 1. Create a Seed User
    console.log('Seeding Demo User...');
    const userRepo = manager.getRepository(User);
    let demoUser = await userRepo.findOne({
      where: { email: 'demo@taskmaster.com' },
    });
    if (!demoUser) {
      demoUser = userRepo.create({
        name: 'Demo User',
        email: 'demo@taskmaster.com',
        password: 'password123', // Will be hashed via @BeforeInsert in User Entity
        role: UserRole.USER,
      });
      demoUser = await userRepo.save(demoUser);
      console.log('-> Created user:', demoUser.email);
    } else {
      console.log('-> User already exists:', demoUser.email);
    }

    // 2. Create a Seed Project
    console.log('Seeding Demo Project...');
    const projectRepo = manager.getRepository(Project);
    let demoProject = await projectRepo.findOne({
      where: { name: 'Demo Project' },
    });
    if (!demoProject) {
      demoProject = projectRepo.create({
        name: 'Demo Project',
        description: 'A sample project populated by the seed script.',
        ownerId: demoUser.id,
      });
      demoProject = await projectRepo.save(demoProject);
      console.log('-> Created project:', demoProject.name);

      // Add user as ADMIN in the project
      const memberRepo = manager.getRepository(ProjectMember);
      const projectMember = memberRepo.create({
        projectId: demoProject.id,
        userId: demoUser.id,
        role: ProjectRole.ADMIN,
      });
      await memberRepo.save(projectMember);
      console.log('-> Added demo user to project as Admin');
    } else {
      console.log('-> Project already exists:', demoProject.name);
    }

    // 3. Create a Seed Board
    console.log('Seeding Demo Board...');
    const boardRepo = manager.getRepository(Board);
    let mainBoard = await boardRepo.findOne({
      where: { name: 'Main Development Board', projectId: demoProject.id },
    });
    if (!mainBoard) {
      mainBoard = boardRepo.create({
        projectId: demoProject.id,
        name: 'Main Development Board',
      });
      mainBoard = await boardRepo.save(mainBoard);
      console.log('-> Created board:', mainBoard.name);
    } else {
      console.log('-> Board already exists:', mainBoard.name);
    }

    // 4. Create Columns (To Do, In Progress, Done)
    console.log('Seeding Board Columns...');
    const columnRepo = manager.getRepository(ColumnEntity);
    const existingColumns = await columnRepo.find({
      where: { boardId: mainBoard.id },
    });
    let columns = existingColumns;
    if (existingColumns.length === 0) {
      const columnsData = [
        { boardId: mainBoard.id, name: 'To Do', position: 1 },
        { boardId: mainBoard.id, name: 'In Progress', position: 2 },
        { boardId: mainBoard.id, name: 'Code Review', position: 3 },
        { boardId: mainBoard.id, name: 'Done', position: 4 },
      ];
      columns = await columnRepo.save(columnRepo.create(columnsData));
      console.log('-> Created columns:', columns.map((c) => c.name).join(', '));
    } else {
      console.log('-> Columns already exist for this board');
    }

    // 5. Create Tasks
    console.log('Seeding Demo Tasks...');
    const taskRepo = manager.getRepository(Task);
    const toDoColumn = columns.find((c) => c.name === 'To Do') || columns[0];
    const inProgressColumn =
      columns.find((c) => c.name === 'In Progress') || columns[1];
    const doneColumn =
      columns.find((c) => c.name === 'Done') || columns[columns.length - 1];

    const existingTasks = await taskRepo.find({
      where: { columnId: toDoColumn.id },
    });
    let task1;
    if (existingTasks.length === 0) {
      const tasksData = [
        {
          title: 'Implement Authentication',
          description: 'Set up JWT based authentication and user registration.',
          columnId: doneColumn.id,
          assigneeId: demoUser.id,
          priority: TaskPriority.HIGH,
          position: 1,
        },
        {
          title: 'Create Board Entities',
          description:
            'Define TypeORM entities for boards, columns, and tasks.',
          columnId: inProgressColumn.id,
          assigneeId: demoUser.id,
          priority: TaskPriority.MEDIUM,
          position: 1,
        },
        {
          title: 'Seed Initial Data',
          description:
            'Write a script to seed initial demo data into the database.',
          columnId: toDoColumn.id,
          assigneeId: demoUser.id,
          priority: TaskPriority.LOW,
          position: 1,
        },
      ];
      const savedTasks = await taskRepo.save(taskRepo.create(tasksData));
      task1 =
        savedTasks.find((t) => t.title === 'Seed Initial Data') ||
        savedTasks[2];
      console.log('-> Created sample tasks');
    } else {
      console.log('-> Tasks already exist');
      task1 = existingTasks[0];
    }

    // 6. Create Demo Comments
    console.log('Seeding Demo Comment...');
    if (task1) {
      const commentRepo = manager.getRepository(Comment);
      const existingComments = await commentRepo.find({
        where: { taskId: task1.id },
      });
      if (existingComments.length === 0) {
        const comment = commentRepo.create({
          taskId: task1.id,
          userId: demoUser.id,
          content: 'I will start working on the seed script soon.',
        });
        await commentRepo.save(comment);
        console.log('-> Created a comment on task:', task1.title);
      } else {
        console.log('-> Comment already exists');
      }
    }

    // Commit transaction
    await queryRunner.commitTransaction();
    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error(
      '\n❌ Error seeding database, rolling back transaction:',
      error,
    );
    await queryRunner.rollbackTransaction();
  } finally {
    console.log(
      'Releasing query runner and shutting down database connection...',
    );
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

bootstrap();
