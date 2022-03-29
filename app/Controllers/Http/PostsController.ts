// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class PostsController {

  public async index(){
    //Event.emit('new:user', { id: 1 })
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

  public async admin(ctx: HttpContextContract){
    return [
      {
        message: 'bienvenu ADMIN'
      }
    ]
  }

}
