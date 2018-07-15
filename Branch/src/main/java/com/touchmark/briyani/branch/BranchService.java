package com.touchmark.briyani.branch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

	public Branch get(String id) {
		return Branch.builder().build()
				.transformEntities(branchRepository.findById(Branch.builder().id(id).build().DBID()).get());
	}

	public Branch saveBranch(Branch branch) {
		return Branch.builder().build().transformEntities(this.branchRepository.save(branch.createEntity()));
	}

}
