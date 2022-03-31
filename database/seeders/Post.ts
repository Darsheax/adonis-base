import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from "App/Models/User";
import {UserFactory} from "Database/factories";
import Role from "Contracts/roles";

export default class PostSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await User.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'test',
      role: Role.ADMIN,
    })

    await UserFactory.with('posts', 100).merge([{role: Role.USER}, {role: Role.PRENIUM}, {role: Role.ADMIN}]).createMany(3)

  }
}
