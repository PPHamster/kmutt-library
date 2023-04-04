import { UserCreateDto } from '@/utils/dtos/UserDto';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
@Injectable()
export class UserRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createUser(data: UserCreateDto): Promise<void> {
    await this.connection.query(
      'INSERT INTO User VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.id,
        data.email,
        data.password,
        data.tel,
        data.firstname,
        data.lastname,
        data.image,
        false,
        data.registYear,
        data.roleId,
        data.branchId,
      ],
    );
  }
}
