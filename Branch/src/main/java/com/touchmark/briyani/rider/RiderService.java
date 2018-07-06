package com.touchmark.briyani.rider;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.staff.Staff;

@Service
public class RiderService {
	private RiderRepository repository;
	
	@Autowired
	public RiderService(RiderRepository repository) {
		this.repository = repository;
	}
	
	public List<Rider> getAll() {
		return Rider.builder().build().transformEntities(repository.findAll());
	}
	
	public RiderEntity save(Rider object) {
		return this.repository.save(object.createEntity());
	}

	public String delete(String id) {
		try {
			Long idToDelete = Rider.builder().id(id).build().getDatabaseID();
			Log.log("RiderService", "delete", "Rider ID to Delete " + idToDelete + ", " + id);
			this.repository.deleteById(idToDelete);
			return "Rider " + id + " deleted Successfully";
		} catch (Exception ex) {
			Log.error("RiderService", "Delete", "Rider Not Deleted " + ex, ex);
			return "Failure - Rider Not Deleted";
		}
	}
	
	public List<Rider> getRecent() {
		return Rider.builder().build().transformEntities(repository.findRecent());
	}

}
