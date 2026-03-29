import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  boardId: string;

  @Column()
  name: string;

  @Column()
  position: number;
}
