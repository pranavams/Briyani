package com.touchmark.briyani.rider;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiderService {
	private RiderRepository riderRepository;
	
	@Autowired
	public RiderService(RiderRepository branchRepository) {
		this.riderRepository = branchRepository;
	}
	
	public List<Rider> getAllBranch() {
		return Rider.builder().build().transformEntities(riderRepository.findAll());
	}
	
	public RiderEntity saveBranch(Rider branch) {
		return this.riderRepository.save(branch.createEntity());
	}
	
}
