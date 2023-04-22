import { RoleService } from '@/services/RoleService';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

type Params = {
  id: number | undefined;
};

@Injectable()
export class RoleGuard implements CanActivate {
  public constructor(private readonly roleService: RoleService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, method } = context.switchToHttp().getRequest<Request>();
    const { id } = params as unknown as Params;

    const role = await this.roleService.getRoleById(id);

    if (!role) {
      throw new BadRequestException(`No role id ${id}`);
    }

    if (role.name === 'Admin' && (method === 'PUT' || method === 'DELETE')) {
      throw new BadRequestException("Can't modify role admin");
    }

    return true;
  }
}
