import { Model, Column, Table, HasMany, Scopes, PrimaryKey, BeforeCreate } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

import { Event } from "./Event";

@Scopes(() => ({
  consents: {
    include: [
      {
        model: Event,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({ timestamps: false })
export class User extends Model {

  @PrimaryKey
  @Column
  id!: string;

  @Column({ allowNull: false, unique: true })
  get email(): string {
    return this.getDataValue('email');
  }
  set email(value: string) {
    this.setDataValue('email', value.toLowerCase().trim());
  }

  @HasMany(() => Event)
  consents?: Event[];

  @BeforeCreate
  static createId(instance: User) {
    instance.id = uuidv4();
  }
}