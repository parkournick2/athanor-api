import { AuthRequest } from '../models/AuthRequest'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>()

    return request.user
  },
)
