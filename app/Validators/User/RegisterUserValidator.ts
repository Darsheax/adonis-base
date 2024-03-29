import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [
      rules.email({
        sanitize: false,
      }),
      rules.unique({ table: 'users', column: 'email'})
    ]),
    password: schema.string({}, [
      rules.confirmed()
    ])
  })

  public messages = {}
}
