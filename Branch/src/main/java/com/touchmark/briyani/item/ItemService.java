package com.touchmark.briyani.item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
	private ItemRepository repository;
	
	@Autowired
	public ItemService(ItemRepository repository) {
		this.repository = repository;
	}
	
	public List<Item> getAll() {
		return Item.builder().build().transformEntities(repository.findAll());
	}
	
	public ItemEntity save(Item object) {
		return this.repository.save(object.createEntity());
	}
	
}
