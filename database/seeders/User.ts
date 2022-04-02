import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from "Contracts/roles";
import User from "App/Models/User";

export default class UserSeeder extends BaseSeeder {
  public async run () {

    for (let item in Role) {
      if (isNaN(Number(item))) {
        await User.create({
          name: item,
          email: item + '@gmail.com',
          password: 'test',
          // @ts-ignore -> role aspect type Role, but 'Role[item]' is type 'Role | undifined'
          role: Role[item],
        })
      }
    }

  }
}
