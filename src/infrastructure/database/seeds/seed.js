"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var data_source_js_1 = require("../../../config/data-source.js");
// Entities
var user_entity_js_1 = require("../entities/user.entity.js");
var project_entity_js_1 = require("../entities/project.entity.js");
var project_member_entity_js_1 = require("../entities/project-member.entity.js");
var boards_entity_js_1 = require("../entities/boards.entity.js");
var columns_entity_js_1 = require("../entities/columns.entity.js");
var task_entity_js_1 = require("../entities/task.entity.js");
var comments_entity_js_1 = require("../entities/comments.entity.js");
// Enums
var user_role_enum_js_1 = require("../../../common/enums/user-role.enum.js");
var project_role_enum_js_1 = require("../../../common/enums/project-role.enum.js");
var task_priority_enum_js_1 = require("../../../common/enums/task-priority.enum.js");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var queryRunner, manager, userRepo, demoUser, projectRepo, demoProject, memberRepo, projectMember, boardRepo, mainBoard, columnRepo, existingColumns, columns, columnsData, taskRepo, toDoColumn, inProgressColumn, doneColumn, existingTasks, task1, tasksData, savedTasks, commentRepo, existingComments, comment, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Connecting to database...');
                    return [4 /*yield*/, data_source_js_1.default.initialize()];
                case 1:
                    _a.sent();
                    console.log('Database connected!');
                    queryRunner = data_source_js_1.default.createQueryRunner();
                    return [4 /*yield*/, queryRunner.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.startTransaction()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 31, 33, 36]);
                    manager = queryRunner.manager;
                    // 1. Create a Seed User
                    console.log('Seeding Demo User...');
                    userRepo = manager.getRepository(user_entity_js_1.User);
                    return [4 /*yield*/, userRepo.findOne({
                            where: { email: 'demo@taskmaster.com' },
                        })];
                case 5:
                    demoUser = _a.sent();
                    if (!!demoUser) return [3 /*break*/, 7];
                    demoUser = userRepo.create({
                        name: 'Demo User',
                        email: 'demo@taskmaster.com',
                        password: 'password123', // Will be hashed via @BeforeInsert in User Entity
                        role: user_role_enum_js_1.UserRole.USER,
                    });
                    return [4 /*yield*/, userRepo.save(demoUser)];
                case 6:
                    demoUser = _a.sent();
                    console.log('-> Created user:', demoUser.email);
                    return [3 /*break*/, 8];
                case 7:
                    console.log('-> User already exists:', demoUser.email);
                    _a.label = 8;
                case 8:
                    // 2. Create a Seed Project
                    console.log('Seeding Demo Project...');
                    projectRepo = manager.getRepository(project_entity_js_1.Project);
                    return [4 /*yield*/, projectRepo.findOne({
                            where: { name: 'Demo Project' },
                        })];
                case 9:
                    demoProject = _a.sent();
                    if (!!demoProject) return [3 /*break*/, 12];
                    demoProject = projectRepo.create({
                        name: 'Demo Project',
                        description: 'A sample project populated by the seed script.',
                        ownerId: demoUser.id,
                    });
                    return [4 /*yield*/, projectRepo.save(demoProject)];
                case 10:
                    demoProject = _a.sent();
                    console.log('-> Created project:', demoProject.name);
                    memberRepo = manager.getRepository(project_member_entity_js_1.ProjectMember);
                    projectMember = memberRepo.create({
                        projectId: demoProject.id,
                        userId: demoUser.id,
                        role: project_role_enum_js_1.ProjectRole.ADMIN,
                    });
                    return [4 /*yield*/, memberRepo.save(projectMember)];
                case 11:
                    _a.sent();
                    console.log('-> Added demo user to project as Admin');
                    return [3 /*break*/, 13];
                case 12:
                    console.log('-> Project already exists:', demoProject.name);
                    _a.label = 13;
                case 13:
                    // 3. Create a Seed Board
                    console.log('Seeding Demo Board...');
                    boardRepo = manager.getRepository(boards_entity_js_1.Board);
                    return [4 /*yield*/, boardRepo.findOne({
                            where: { name: 'Main Development Board', projectId: demoProject.id },
                        })];
                case 14:
                    mainBoard = _a.sent();
                    if (!!mainBoard) return [3 /*break*/, 16];
                    mainBoard = boardRepo.create({
                        projectId: demoProject.id,
                        name: 'Main Development Board',
                    });
                    return [4 /*yield*/, boardRepo.save(mainBoard)];
                case 15:
                    mainBoard = _a.sent();
                    console.log('-> Created board:', mainBoard.name);
                    return [3 /*break*/, 17];
                case 16:
                    console.log('-> Board already exists:', mainBoard.name);
                    _a.label = 17;
                case 17:
                    // 4. Create Columns (To Do, In Progress, Done)
                    console.log('Seeding Board Columns...');
                    columnRepo = manager.getRepository(columns_entity_js_1.ColumnEntity);
                    return [4 /*yield*/, columnRepo.find({
                            where: { boardId: mainBoard.id },
                        })];
                case 18:
                    existingColumns = _a.sent();
                    columns = existingColumns;
                    if (!(existingColumns.length === 0)) return [3 /*break*/, 20];
                    columnsData = [
                        { boardId: mainBoard.id, name: 'To Do', position: 1 },
                        { boardId: mainBoard.id, name: 'In Progress', position: 2 },
                        { boardId: mainBoard.id, name: 'Code Review', position: 3 },
                        { boardId: mainBoard.id, name: 'Done', position: 4 },
                    ];
                    return [4 /*yield*/, columnRepo.save(columnRepo.create(columnsData))];
                case 19:
                    columns = _a.sent();
                    console.log('-> Created columns:', columns.map(function (c) { return c.name; }).join(', '));
                    return [3 /*break*/, 21];
                case 20:
                    console.log('-> Columns already exist for this board');
                    _a.label = 21;
                case 21:
                    // 5. Create Tasks
                    console.log('Seeding Demo Tasks...');
                    taskRepo = manager.getRepository(task_entity_js_1.Task);
                    toDoColumn = columns.find(function (c) { return c.name === 'To Do'; }) || columns[0];
                    inProgressColumn = columns.find(function (c) { return c.name === 'In Progress'; }) || columns[1];
                    doneColumn = columns.find(function (c) { return c.name === 'Done'; }) || columns[columns.length - 1];
                    return [4 /*yield*/, taskRepo.find({
                            where: { columnId: toDoColumn.id },
                        })];
                case 22:
                    existingTasks = _a.sent();
                    task1 = void 0;
                    if (!(existingTasks.length === 0)) return [3 /*break*/, 24];
                    tasksData = [
                        {
                            title: 'Implement Authentication',
                            description: 'Set up JWT based authentication and user registration.',
                            columnId: doneColumn.id,
                            assigneeId: demoUser.id,
                            priority: task_priority_enum_js_1.TaskPriority.HIGH,
                            position: 1,
                        },
                        {
                            title: 'Create Board Entities',
                            description: 'Define TypeORM entities for boards, columns, and tasks.',
                            columnId: inProgressColumn.id,
                            assigneeId: demoUser.id,
                            priority: task_priority_enum_js_1.TaskPriority.MEDIUM,
                            position: 1,
                        },
                        {
                            title: 'Seed Initial Data',
                            description: 'Write a script to seed initial demo data into the database.',
                            columnId: toDoColumn.id,
                            assigneeId: demoUser.id,
                            priority: task_priority_enum_js_1.TaskPriority.LOW,
                            position: 1,
                        },
                    ];
                    return [4 /*yield*/, taskRepo.save(taskRepo.create(tasksData))];
                case 23:
                    savedTasks = _a.sent();
                    task1 =
                        savedTasks.find(function (t) { return t.title === 'Seed Initial Data'; }) ||
                            savedTasks[2];
                    console.log('-> Created sample tasks');
                    return [3 /*break*/, 25];
                case 24:
                    console.log('-> Tasks already exist');
                    task1 = existingTasks[0];
                    _a.label = 25;
                case 25:
                    // 6. Create Demo Comments
                    console.log('Seeding Demo Comment...');
                    if (!task1) return [3 /*break*/, 29];
                    commentRepo = manager.getRepository(comments_entity_js_1.Comment);
                    return [4 /*yield*/, commentRepo.find({
                            where: { taskId: task1.id },
                        })];
                case 26:
                    existingComments = _a.sent();
                    if (!(existingComments.length === 0)) return [3 /*break*/, 28];
                    comment = commentRepo.create({
                        taskId: task1.id,
                        userId: demoUser.id,
                        content: 'I will start working on the seed script soon.',
                    });
                    return [4 /*yield*/, commentRepo.save(comment)];
                case 27:
                    _a.sent();
                    console.log('-> Created a comment on task:', task1.title);
                    return [3 /*break*/, 29];
                case 28:
                    console.log('-> Comment already exists');
                    _a.label = 29;
                case 29: 
                // Commit transaction
                return [4 /*yield*/, queryRunner.commitTransaction()];
                case 30:
                    // Commit transaction
                    _a.sent();
                    console.log('\n✅ Database seeded successfully!');
                    return [3 /*break*/, 36];
                case 31:
                    error_1 = _a.sent();
                    console.error('\n❌ Error seeding database, rolling back transaction:', error_1);
                    return [4 /*yield*/, queryRunner.rollbackTransaction()];
                case 32:
                    _a.sent();
                    return [3 /*break*/, 36];
                case 33:
                    console.log('Releasing query runner and shutting down database connection...');
                    return [4 /*yield*/, queryRunner.release()];
                case 34:
                    _a.sent();
                    return [4 /*yield*/, data_source_js_1.default.destroy()];
                case 35:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 36: return [2 /*return*/];
            }
        });
    });
}
bootstrap();
