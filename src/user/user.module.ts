import { UserController } from './user.controller'
import { UserService } from './user.service'
import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
