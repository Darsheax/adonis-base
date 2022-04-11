import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {MyReporter} from "App/Validators/Reporters/MyReporter";

export default class LoginUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = MyReporter

  public schema = schema.create({
    email: schema.string({}, [
      rules.email({
        sanitize: false,
      }),
    ]),
    password: schema.string({})
  })

  public messages = {}
}
