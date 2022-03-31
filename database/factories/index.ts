import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from "App/Models/Post";
import User from "App/Models/User";
import Role from "Contracts/roles";

export const PostFactory = Factory
  .define(Post, ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(4),
      isPrenium: faker.datatype.boolean(),
      published: faker.datatype.boolean(),
    }
  })
  .build()

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'test',
      role: faker.random.number({max: Object.keys(Role).length / 2 - 1})
    }
  })
  .relation('posts', () => PostFactory)
  .build()
