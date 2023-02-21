import { UnauthorizedError } from './errors/unauthorized.error'
import { UserPayload } from './models/UserPayload'
import { UserToken } from './models/UserToken'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (isPasswordValid) {
        return { ...user, password: undefined }
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    )
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    }

    const jwtToken = this.jwtService.sign(payload)

    return {
      access_token: jwtToken,
    }
  }
}
