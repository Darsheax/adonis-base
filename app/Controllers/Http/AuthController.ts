// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

import RegisterUserValidator from "App/Validators/User/RegisterUserValidator";
import LoginUserValidator from "App/Validators/User/LoginUserValidator";

import User from "App/Models/User";
import {Exception} from "@poppinss/utils";
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {

  public async register({request}: HttpContextContract) {
    await User.create(await request.validate(RegisterUserValidator))
  }

  public async login({auth, request}: HttpContextContract) {
    const {email, password} = await request.validate(LoginUserValidator)

    const user = await User
      .query()
      .where('email', email)
      .whereNull('oauth')
      .firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      throw new Exception('Password mis-match', 403, 'E_INVALID_AUTH_PASSWORD')
    }

    return await auth.use('web').login(user, true)

    //return await auth.use('web').attempt(email, password, true)
  }

  public async logout({auth}: HttpContextContract) {
    await auth.use('web').logout()
    //response.redirect('login')
  }

  public async remember({auth}: HttpContextContract) {
    return await auth.use('web').authenticate()
  }

  public async social({ally}: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async callback({ally, auth}: HttpContextContract) {
    const google = ally.use('google')

    if (google.accessDenied()) return 'Access was denied'
    if (google.stateMisMatch()) return 'Request expired. Retry again'
    if (google.hasError()) return google.getError()

    const googleUser = await google.user()

    if(googleUser.email === null) return

    const user = await User.updateOrCreate({
      oauth: googleUser.id,
    }, {
      email: googleUser.email,
      name: googleUser.name,
      password: googleUser.token.token,
    })

    return await auth.use('web').login(user, true)
  }

}
