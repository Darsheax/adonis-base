import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class PostSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    //for (let item in Role) {
    //  if (isNaN(Number(item))) {
    //    await User.create({
    //      name: item,
    //      email: item + '@gmail.com',
    //      password: 'test',
    //      // @ts-ignore -> role aspect type Role, but 'Role[item]' is type 'Role | undifined'
    //      role: Role[item],
    //    })
    //  }
    //}


    //await UserFactory.with('posts', 100).merge([{role: Role.USER}, {role: Role.PRENIUM}, {role: Role.ADMIN}]).createMany(3)

  }
}
