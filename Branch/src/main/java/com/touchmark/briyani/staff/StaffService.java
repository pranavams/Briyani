package com.touchmark.briyani.staff;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
	private StaffRepository repository;
	
	@Autowired
	public StaffService(StaffRepository repository) {
		this.repository = repository;
	}
	
	public List<Staff> getAll() {
		return Staff.builder().build().transformEntities(repository.findAll());
	}
	
	public StaffEntity save(Staff object) {
		return this.repository.save(object.createEntity());
	}
	
}
