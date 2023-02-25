import { AppService } from './app.service'
import { CurrentUser } from './auth/decorators/current-user.decorator'
import { User } from './user/entities/user.entity'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  ping(): string {
    return this.appService.ping()
  }

  @Get('me')
  getMet(@CurrentUser() user: User): User {
    return user
  }
}
