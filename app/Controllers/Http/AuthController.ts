// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

import RegisterUserValidator from "App/Validators/User/RegisterUserValidator";
import LoginUserValidator from "App/Validators/User/LoginUserValidator";

import User from "App/Models/User";

export default class AuthController {

  public async register({request}: HttpContextContract){
    await User.create(await request.validate(RegisterUserValidator))
  }

  public async login({auth, request}: HttpContextContract) {
    const {email: mail, password} = await request.validate(LoginUserValidator)

    return await auth.use('web').attempt(mail, password, true)
  }

  public async logout({auth}: HttpContextContract){
    await auth.use('web').logout()
    //response.redirect('login')
  }

  public async remember({auth} : HttpContextContract){
    return await auth.use('web').authenticate()
  }

}
