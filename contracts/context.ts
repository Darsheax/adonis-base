declare module '@ioc:Adonis/Core/HttpContext' {

  import { Lookup } from 'geoip-lite'

  interface HttpContextContract {
    location: Lookup | null
  }
}
