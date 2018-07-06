package com.touchmark.briyani.branch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.staff.Staff;

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
