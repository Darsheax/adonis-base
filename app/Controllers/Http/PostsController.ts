// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class PostsController {

  public async index({bouncer}: HttpContextContract){

    const posts = await Post.all()
    //const userIsAllowed = await bouncer.with('PostPolicy').allows('viewPreniumList')
    //const bouncedPosts = await Post.query().withScopes(async (scopes) => scopes.showPrenium(userIsAllowed))

    return await Promise.all(posts.map(async post => await bouncer.with('PostPolicy').allows('viewPost', post))).then(array => posts.filter((_, i) => array[i]))
  }

  public async admin(){
    return [
      {
        message: 'bienvenu ADMIN'
      }
    ]
  }

}
