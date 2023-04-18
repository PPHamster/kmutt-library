import { RoleCreateDto, RoleUpdateDto } from '@/utils/dtos/RoleDto';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
@Injectable()
export class RoleRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createRoleIfNotExist(data: RoleCreateDto) {
    await this.connection.query(
      'INSERT INTO Role (name) SELECT ? WHERE NOT EXISTS ( SELECT * FROM Role WHERE name = ? )',
      [data.name, data.name],
    );
  }

  public async getRoleById(id: number) {
    const [rows] = await this.connection.query(
      'SELECT * FROM Role WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  public async getAllRole() {
    const [rows] = await this.connection.query('SELECT * FROM Role');
    return rows;
  }

  public async updateRoleById(id: number, data: RoleUpdateDto) {
    const [rows] = await this.connection.query(
      "UPDATE Role SET name = ? WHERE id = ? AND name != 'Admin'",
      [data.name, id],
    );
    return rows;
  }

  public async deleteRoleById(id: number) {
    await this.connection.query(
      "DELETE FROM Role WHERE id = ? AND name != 'Admin'",
      [id],
    );
  }
}
