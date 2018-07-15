package com.touchmark.briyani.branch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;

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

	public Branch update(Branch object) {
		BranchEntity entity = getByID(object);
		return Branch.builder().build().transformEntities(this.branchRepository.saveAndFlush(entity));
	}

	private BranchEntity getByID(Branch object) {
		try {
			return branchRepository.findById(Branch.builder().id(object.getId()).build().DBID()).get();
		} catch (Exception ex) {
			throw new RuntimeException("Branch Not Found");
		}
	}

	public String delete(String id) {
		try {
			Long idToDelete = Branch.builder().id(id).build().DBID();
			Log.log("BranchService", "delete", "Customer ID to Delete " + idToDelete + ", " + id);
			this.branchRepository.deleteById(idToDelete);
			return "Branch " + id + " deleted Successfully";
		} catch (Exception ex) {
			Log.error("BranchService", "Delete", "Customer Not Deleted " + ex, ex);
			return "Failure - Branch Not Deleted";
		}
	}
}
