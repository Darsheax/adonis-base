// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

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

  public async delete({bouncer, params} : HttpContextContract) {

    const post = await Post.findOrFail(params.id)
    await bouncer.with('PostPolicy').authorize('deletePost', post)
    await post.delete()

  }

}
