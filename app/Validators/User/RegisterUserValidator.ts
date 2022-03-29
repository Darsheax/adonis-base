import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email({
        sanitize: true,
      }),
      rules.unique({ table: 'users', column: 'email'})
    ]),
    password: schema.string({}, [
      rules.confirmed()
    ])
  })

  public messages = {}
}
