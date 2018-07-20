package com.touchmark.briyani.rider;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;

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
	
	public Rider save(Rider object) {
		return Rider.builder().build().transformEntities(this.repository.save(object.createEntity()));
	}

	public String delete(String id) {
		try {
			Long idToDelete = Rider.builder().id(id).build().DBID();
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

	public Rider get(String id) {
		Long riderId = Rider.builder().id(id).build().DBID();
		Log.log("RiderService", "get", "Rider ID [" + riderId + "] Display Id [" + id + "]");
		return Rider.builder().build().transformEntities(repository.findById(riderId).get());
	}
	
	public Rider update(Rider object) {
		RiderEntity entity = getByID(object);
		entity.updateWith(object);
		return Rider.builder().build().transformEntities(this.repository.saveAndFlush(entity));
	}
	
	private RiderEntity getByID(Rider object) {
		try {
			return repository.findById(Rider.builder().id(object.getId()).build().DBID()).get();
		} catch (Exception ex) {
			throw new RuntimeException("Rider Not Found");
		}
	}

}
