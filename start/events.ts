/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from "@ioc:Adonis/Core/Event";

Event.on('new:user', 'User.welcome')
Event.on('new:user', 'User.sendEmail')
