import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  async findById(@Param('userId', new ParseUUIDPipe()) userId: string) {
    const user = await this.userService.findById(userId);
    return user;
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userData: CreateUserDto) {
    const user = await this.userService.create(userData);
    return user;
  }

  @Put('update/:userId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() userData: Partial<CreateUserDto>,
  ) {
    const user = await this.userService.update(userId, userData);
    return user;
  }
}
