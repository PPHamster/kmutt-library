import { Injectable } from '@nestjs/common';
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
    return branch;
  }

  public async getAllBranch() {
    return this.branchRepository.getAllBranch();
  }

  public async updateBranchById(id: number, data: BranchUpdateDto) {
    return this.branchRepository.updateBranchById(id, data);
  }

  public async deleteBranchById(id: number) {
    return this.branchRepository.deleteBranchById(id);
  }
}
