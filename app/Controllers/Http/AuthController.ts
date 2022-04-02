// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

import RegisterUserValidator from "App/Validators/User/RegisterUserValidator";
import LoginUserValidator from "App/Validators/User/LoginUserValidator";

import User from "App/Models/User";

export default class AuthController {

  public async register({request}: HttpContextContract){
    await User.create(await request.validate(RegisterUserValidator))
  }

  public async login({auth, request, response}: HttpContextContract) {
    const {email, password} = await request.validate(LoginUserValidator)

    try {
      await auth.use('web').attempt(email, password, true)
    } catch {
      return response.badRequest('Invalid credentials')
    }

  }

  public async logout({auth}: HttpContextContract){
    await auth.use('web').logout()
    //response.redirect('login')
  }

}
