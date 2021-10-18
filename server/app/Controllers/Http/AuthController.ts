import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {

  public async register({ request, response }: HttpContextContract) {
    const payload = {
      email: request.input('email'),
      password: request.input('password'),
    }

    await User.create(payload)
    return response.status(201)
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User
      .query()
      .where('email', email)
      .firstOrFail()

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest('Invalid credentials')
    }

    // Create session
    await auth.use('web').login(user)
    return user
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.status(200)
  }
}
