import { BadRequestException, Injectable } from '@nestjs/common';
import { BranchRepository } from '@/repositories/BranchRepository';
import { BranchCreateDto, BranchUpdateDto } from '@/utils/dtos/BranchDto';

@Injectable()
export class BranchService {
  public constructor(private readonly branchRepository: BranchRepository) {}

  public async createBranch(data: BranchCreateDto) {
    return this.branchRepository.createBranchIfNotExist(data);
  }

  public async getBranchById(id: number) {
    const branch = await this.branchRepository.getBranchById(id);
    if (!branch) throw new BadRequestException(`No branch id ${id}`);
    return branch;
  }

  public async getAllBranch() {
    return this.branchRepository.getAllBranch();
  }

  public async updateBranchById(id: number, data: BranchUpdateDto) {
    if (id === 1) {
      throw new BadRequestException("Can't Change Branch Admin");
    }
    return this.branchRepository.updateBranchById(id, data);
  }

  public async deleteBranchById(id: number) {
    if (id === 1) {
      throw new BadRequestException("Can't Delete Branch Admin");
    }
    return this.branchRepository.deleteBranchById(id);
  }
}
