import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleRepository } from '@/repositories/RoleRepository';
import { RoleCreateDto, RoleUpdateDto } from '@/utils/dtos/RoleDto';

@Injectable()
export class RoleService {
  public constructor(private readonly roleRepository: RoleRepository) {}

  public async createRole(data: RoleCreateDto) {
    return this.roleRepository.createRoleIfNotExist(data);
  }

  public async getRoleById(id: number) {
    const role = await this.roleRepository.getRoleById(id);
    if (!role) throw new BadRequestException(`No role id ${id}`);
    return role;
  }

  public async getAllRole() {
    return this.roleRepository.getAllRole();
  }

  public async updateRoleById(id: number, data: RoleUpdateDto) {
    if (id === 1) {
      throw new BadRequestException("Can't Change Role Admin");
    }
    return this.roleRepository.updateRoleById(id, data);
  }

  public async deleteRoleById(id: number) {
    if (id === 1) {
      throw new BadRequestException("Can't Delete Role Admin");
    }
    return this.roleRepository.deleteRoleById(id);
  }
}
