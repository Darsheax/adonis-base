import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from "App/Models/Role";
import User from "App/Models/User";

export default class RoleSeeder extends BaseSeeder {
  public async run () {

    //Create user
    const user = await User.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'test'
    })

    //Create roles
    const roles = await Role.createMany([{name: 'admin'}, {name: 'autor'}])

    //Create association User <-> Role
    roles[0].related('users').save(user)

  }
}
