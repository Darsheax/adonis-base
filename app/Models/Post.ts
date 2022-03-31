import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, scope} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public isPrenium: boolean

  @column()
  public published: boolean

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static showPrenium = scope( (query, isAllowed : boolean) => {
    if(!isAllowed) query.whereNot('is_prenium', true)
  })

}
