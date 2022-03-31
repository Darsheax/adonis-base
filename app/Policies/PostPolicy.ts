import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class PostPolicy extends BasePolicy {
	public async viewList(user: User) {}
	public async view(user: User, post: Post) {}
	public async create(user: User) {}
	public async update(user: User, post: Post) {}
	public async delete(user: User, post: Post) {}
}
