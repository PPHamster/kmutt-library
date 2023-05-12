import { BranchService } from '@/services/BranchService';
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
export class BranchGuard implements CanActivate {
  public constructor(private readonly branchService: BranchService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, method } = context.switchToHttp().getRequest<Request>();
    const { id } = params as unknown as Params;

    const branch = await this.branchService.getBranchById(id);

    if (!branch) {
      throw new BadRequestException(`No branch id ${id}`);
    }

    if (branch.name === 'Admin' && (method === 'PUT' || method === 'DELETE')) {
      throw new BadRequestException("Can't modify branch admin");
    }

    return true;
  }
}
