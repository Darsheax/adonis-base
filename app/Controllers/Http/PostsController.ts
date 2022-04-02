// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import NotFoundException from "App/Exceptions/Types/NotFoundException";

export default class PostsController {

  public async index({bouncer} : HttpContextContract) {

    const posts = await Post.all()

    return await Promise
      .all(posts.map(async post => await bouncer.with('PostPolicy').allows('viewPost', post)))
      .then(array => posts.filter((_, i) => array[i]))

  }

  public async admin() {
    return [
      {
        message: 'bienvenu ADMIN'
      }
    ]
  }

  public async delete({bouncer, params, response} : HttpContextContract) {

    try {
      const post = await Post.findOrFail(56411)
      return {success: true, e: post}

    }catch {
      throw new NotFoundException('You are not authorized')

    }

  }

}
