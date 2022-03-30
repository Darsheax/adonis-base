// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Event from "@ioc:Adonis/Core/Event";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class PostsController {

  public async index(ctx: HttpContextContract){

    console.log(ctx.location)

    Event.emit('new:user', { id: 1 })
    return [
      {
        id: 1,
        title: 'Hello world',
      },
      {
        id: 2,
        title: 'Hello universe',
      },
    ]
  }

  public async admin(){
    return [
      {
        message: 'bienvenu ADMIN'
      }
    ]
  }

}
