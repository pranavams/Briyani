package com.touchmark.briyani.branch.biz;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.branch.bo.Branch;
import com.touchmark.briyani.branch.entities.BranchEntity;
import com.touchmark.briyani.branch.entities.BranchRepository;

@Service
public class BranchService {
	private BranchRepository branchRepository;
	
	@Autowired
	public BranchService(BranchRepository branchRepository) {
		this.branchRepository = branchRepository;
	}
	
	public List<Branch> getAllBranch() {
		return Branch.builder().build().transformEntities(branchRepository.findAll());
	}
	
	public BranchEntity saveBranch(Branch branch) {
		return this.branchRepository.save(branch.createEntity());
	}
	
}
