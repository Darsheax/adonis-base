/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import type {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class ExceptionHandler extends HttpExceptionHandler {

  public timestamp?: number = Date.now()

  constructor () {
    super(Logger)
  }

  json(error: any){
    return{
      timestamp: this.timestamp,
      code: error.code,
      message: error.message
    }
  }

  public async handle(error: any, ctx: HttpContextContract) {
    return ctx.response.status(error.status).send(this.json(error))
    //return super.handle(error, ctx)
  }

}
