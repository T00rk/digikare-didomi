import { Model, Column, Table, Scopes, ForeignKey, PrimaryKey, BeforeCreate } from "sequelize-typescript";
import { User } from "./User";

@Scopes(() => ({
  user: {
    include: [
      {
        model: User,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({ timestamps: false })
export class Event extends Model {

  @PrimaryKey
  @Column
  id!: string;
  
  @Column({ allowNull: false })
  enabled!: boolean;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column({ allowNull: false, onDelete: "CASCADE" })
  userId!: string;

  @PrimaryKey
  @Column
  createdAt!: Date;

  @BeforeCreate
  static createdAt(instance: Event) {
    instance.createdAt = new Date();
  }

}