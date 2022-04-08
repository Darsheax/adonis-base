// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import PostValidator from "App/Validators/PostValidator";
import {filter} from "App/Helper";

export default class PostsController {

  public async index({bouncer} : HttpContextContract) {
    const posts = await new Promise(resolve => setTimeout(resolve, 2000)).then(async () => {
      const posts = await Post.all()
      return filter(posts, async post => await bouncer.with('PostPolicy').allows('viewPost', post))
    })

    console.log(posts)
    console.log("----------------")

    return posts
  }

  public async destroy({bouncer, params} : HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await bouncer.with('PostPolicy').authorize('deletePost', post)
    await post.delete()
  }

  public async store({request, bouncer, auth}: HttpContextContract) {
    await bouncer.with('PostPolicy').authorize('createPost')
    const payload = await request.validate(PostValidator)
    await auth.user?.related('posts').create(payload)
  }

  public async show({params, bouncer}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.load('user')

    await bouncer.with('PostPolicy').authorize('viewPost', post)
    return post
  }

  public async update({bouncer, params, request}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await bouncer.with('PostPolicy').authorize('updatePost', post)
    const payload = await request.validate(PostValidator)
    await post.merge(payload).save()
  }

}
