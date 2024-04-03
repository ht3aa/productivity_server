import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Productivity } from "./productivity.entity";

@Entity()
export class Languages {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  language: string = "";

  @Column()
  productivityInSeconds: number = 0;

  @ManyToOne(() => Productivity, (productivity: Productivity) => productivity.languages)
  productivity: Productivity = new Productivity();
}
