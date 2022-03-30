import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import geoip from 'geoip-lite'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class LocationProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const HttpContext = this.app.container.use('Adonis/Core/HttpContext')

    HttpContext.getter('location', function location() {
      console.log('Appel location', this.request.ip())
      return geoip.lookup(this.request.ip())
    }, true)
  }
}
