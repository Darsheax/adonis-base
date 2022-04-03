import Bouncer, {action, BasePolicy} from '@ioc:Adonis/Addons/Bouncer'
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

  @action({allowGuest: true})
  public async viewPost(user: User | null, post : Post){

    if(( !user || ![Role.PRENIUM, Role.EDITOR].includes(user.role)) && post.isPrenium) return Bouncer.deny('You are not PRENIUM. You do not have access to this page')
    if(( !user || ![Role.EDITOR].includes(user.role)) && !post.published) return Bouncer.deny('This post is not yet published')

    return true
  }

  public async updatePost(user: User, post: Post){
    if(user.id !== post.userId) return Bouncer.deny("You can't update this post")
    return true
  }

  public async deletePost(user: User, post: Post){
    if(user.id !== post.userId) return Bouncer.deny("You can't delete this post")
    return true
  }

  public async createPost(user: User){
    if(![Role.EDITOR].includes(user.role) ) return Bouncer.deny(`You can't create post. Role expected [EDITOR|ADMIN], You are [${Role[user.role]}]`)
    return true
  }

}
