package com.touchmark.briyani.rider;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
}
