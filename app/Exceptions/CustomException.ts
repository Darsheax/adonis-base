import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export class CustomException extends Error {

  timestamp: number = Date.now()
  name: string
  message: string
  help?: string
  code?: string
  status: number

  constructor(message: string) {
    super(message);
  }

  get json(){
    return{
      code: this.code,
      timestamp: this.timestamp,
      message: this.message
    }
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).json(error.json)
  }

}
