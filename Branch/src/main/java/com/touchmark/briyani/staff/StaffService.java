package com.touchmark.briyani.staff;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;

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

	public Staff save(Staff object) {
		return Staff.builder().build().transformEntities(this.repository.save(object.createEntity()));
	}

	public String delete(String id) {
		try {
			Long staffID = Staff.builder().id(id).build().DBID();
			Log.log("StaffService", "delete", "Staff ID to Delete " + staffID + ", " + id);
			this.repository.deleteById(staffID);
			return "Staff " + id + " deleted Successfully";
		} catch (Exception ex) {
			Log.error("StaffService", "Delete", "Staff Not Deleted " + ex, ex);
			return "Failure - Staff Not Deleted";
		}
	}

	public List<Staff> getRecent() {
		return Staff.builder().build().transformEntities(repository.findRecent());
	}

	public Staff get(String id) {
		return Staff.builder().build().transformEntities(repository.findById(Staff.builder().id(id).build().DBID()).get());
	}
	
	public Staff update(Staff object) {
		StaffEntity entity = getByID(object);
		entity.updateWith(object);
		return Staff.builder().build().transformEntities(this.repository.saveAndFlush(entity));
	}
	
	private StaffEntity getByID(Staff object) {
		try {
			return repository.findById(Staff.builder().id(object.getId()).build().DBID()).get();
		} catch (Exception ex) {
			throw new RuntimeException("Staff Not Found");
		}
	}

}
