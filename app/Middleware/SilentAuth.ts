import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the User is logged-in or not.
 *
 * The request continues as usual, even when the User is not logged-in.
 */
export default class SilentAuthMiddleware {
  /**
   * Handle request
   */
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    /**
     * Check if User is logged-in or not. If yes, then `ctx.auth.User` will be
     * set to the instance of the currently logged in User.
     */
    await auth.check()
    await next()
  }
}
