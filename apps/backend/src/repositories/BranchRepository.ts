import { BranchCreateDto } from '@/utils/dtos/BranchDto';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
@Injectable()
export class BranchRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createBranchIfNotExist(data: BranchCreateDto) {
    await this.connection.query(
      'INSERT INTO Branch (name) SELECT ? WHERE NOT EXISTS ( SELECT * FROM Branch WHERE name = ? )',
      [data.name, data.name],
    );
  }

  public async getBranchById(id: number) {
    const [rows] = await this.connection.query(
      'SELECT * FROM Branch WHERE id = ?',
      [id],
    );
    return rows[0];
  }
}
