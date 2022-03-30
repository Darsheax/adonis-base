import { EventsList } from '@ioc:Adonis/Core/Event'

export default class User {

  public async welcome(user: EventsList['new:user']) {
    console.log('Welcome ! ', user)
  }

  public async sendEmail(user: EventsList['new:user']) {
    console.log('Send email to user...', user)
  }

}
