import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Prisma } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(
        createUserDto.password,
        process.env.HASH_SALT ? Number(process.env.HASH_SALT) : 10,
      ),
    }

    const createdUser = await this.prisma.user.create({ data })

    return {
      ...createdUser,
      password: undefined,
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map((user) => {
      return { ...user, password: undefined }
    })
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      return { ...user }
    }

    return undefined
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    return { ...user, password: undefined }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        password: await bcrypt.hash(
          updateUserDto.password,
          process.env.HASH_SALT ? Number(process.env.HASH_SALT) : 10,
        ),
      },
    })

    return { ...updatedUser, password: undefined }
  }

  async remove(id: number): Promise<User> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    })

    return { ...deletedUser, password: undefined }
  }
}
