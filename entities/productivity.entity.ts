import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Languages } from "./language.entity";

@Entity()
export class Productivity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  year: number = 0;

  @Column()
  month: number = 0;

  @Column()
  day: number = 0;

  @Column()
  hour: number = 0;

  @Column()
  minute: number = 0;

  @Column()
  seconds: number = 0;

  @Column()
  totalProductivityInSeconds: number = 0;

  @Column()
  totalTimeInVim: number = 0;

  @Column()
  totalTimeSpentThinkingOrSearching: number = 0;

  @Column()
  projectPath: string = "";

  @Column()
  commitMsg: string = "";

  @OneToMany(() => Languages, (languages) => languages.productivity)
  // @ts-ignore
  languages: Languages[];
}
