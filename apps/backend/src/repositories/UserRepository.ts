import { UserCreateDto, UserUpdateImageDto } from '@/utils/dtos/UserDto';
import { Inject, Injectable } from '@nestjs/common';
import { RawUser, User } from 'api-schema';
import { Connection } from 'mysql2/promise';
@Injectable()
export class UserRepository {
  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  public async createUser(data: UserCreateDto): Promise<void> {
    await this.connection.query(
      `
      INSERT INTO User
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,
        (SELECT id FROM Role WHERE name = ?),
        (SELECT id FROM Branch WHERE name = ?))
      `,
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
        data.role,
        data.branch,
      ],
    );
  }

  public async getUserByEmail(email: string): Promise<RawUser> {
    const [rows] = await this.connection.query(
      'SELECT * FROM User WHERE email = ?',
      [email],
    );

    return rows[0];
  }

  public async getAllUserWithRoleAndBranch(): Promise<User[]> {
    const [rows] = await this.connection.query(
      `
      SELECT u.id, u.email, u.tel, u.firstname, u.lastname, u.image,
      u.isBlacklist, u.registYear, r.name AS role, b.name AS branch FROM User AS u
      LEFT JOIN Role AS r ON u.roleId = r.id
      LEFT JOIN Branch AS b ON u.branchId = b.id
      WHERE r.name != ? GROUP BY u.id
      `,
      ['Admin'],
    );

    return rows as any[] as User[];
  }

  public async getUserWithRoleAndBranchById(id: string): Promise<User> {
    const [rows] = await this.connection.query(
      `
      SELECT u.id, u.email, u.tel, u.firstname, u.lastname, u.image, u.isBlacklist,
      u.registYear, r.name AS role, b.name AS branch FROM User AS u
      LEFT JOIN Role AS r ON u.roleId = r.id
      LEFT JOIN Branch AS b ON u.branchId = b.id
      WHERE u.id = ? GROUP BY u.id`,
      [id],
    );

    return rows[0];
  }

  public async updateUserById(option: string, value: any[], id: string) {
    await this.connection.query(`UPDATE User SET ${option} WHERE id = ?`, [
      ...value,
      id,
    ]);
  }

  public async updateUserImageById(data: UserUpdateImageDto, id: string) {
    await this.connection.query('UPDATE User SET image = ? WHERE id = ?', [
      data.image,
      id,
    ]);
  }

  public async deleteUserById(id: string) {
    await this.connection.query('DELETE FROM User WHERE id = ?', [id]);
  }
}
