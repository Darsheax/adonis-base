import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({trim: true}),
    content: schema.string({escape: true}),
    isPrenium: schema.boolean.optional(),
    published: schema.boolean.optional()
  })

  public messages = {}
}
