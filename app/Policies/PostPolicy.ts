import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Role from "Contracts/roles";
import Post from "App/Models/Post";

export default class PostPolicy extends BasePolicy {

  public async before(user: User | null) {
    //Need to return 'undefined' to continue the execution
    if(user?.role === Role.ADMIN){
      return true
    }
  }

  public async viewPreniumList(user: User){
    return [Role.PRENIUM].includes(user.role)
  }

  public async viewPost(user: User, post : Post){

    if(user.id !== post.userId && !post.published) return Bouncer.deny('This post is not yet published', 404)

    if(![Role.PRENIUM].includes(user.role) && post.isPrenium) return Bouncer.deny('You do not have access to this page', 404)

    return true
  }

}
