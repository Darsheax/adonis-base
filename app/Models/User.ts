import {DateTime} from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {BaseModel, beforeSave, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Post from "App/Models/Post";
import Role from "Contracts/roles";

export default class User extends BaseModel {
  @column({ isPrimary: true, serializeAs : null })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @column()
  public role: Role = Role.USER

  @column({serializeAs : null})
  public rememberMeToken?: string

  @column({serializeAs: null})
  public oauth: string | null

  @column.dateTime({ autoCreate: true, serializeAs : null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs : null })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
