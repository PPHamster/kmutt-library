import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/repositories/RoleRepository';
import { RoleCreateDto, RoleUpdateDto } from '@/utils/dtos/RoleDto';

@Injectable()
export class RoleService {
  public constructor(private readonly roleRepository: RoleRepository) {}

  public async createRole(data: RoleCreateDto) {
    return this.roleRepository.createRoleIfNotExist(data);
  }

  public async getRoleById(id: number) {
    return this.roleRepository.getRoleById(id);
  }

  public async getAllRole() {
    return this.roleRepository.getAllRole();
  }

  public async updateRoleById(id: number, data: RoleUpdateDto) {
    return this.roleRepository.updateRoleById(id, data);
  }

  public async deleteRoleById(id: number) {
    return this.roleRepository.deleteRoleById(id);
  }
}
