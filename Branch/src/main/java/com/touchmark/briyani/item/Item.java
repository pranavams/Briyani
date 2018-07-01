package com.touchmark.briyani.item;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

	private String id;
	private String name;
	private String description;
	private float price;

	public ItemEntity createEntity() {
		return ItemEntity.builder().description(description)
				.name(name)
				.price(price)
				.build();
	}

	public Item transformEntity(ItemEntity entity) {
		this.id = transformId(entity.getId());
		this.name = entity.getName();
		this.description = entity.getDescription();
		this.price = entity.getPrice();
		return this;
	}

	private String transformId(long id) {
		return "ITM-" + id;
	}

	public List<Item> transformEntities(List<ItemEntity> entities) {
		List<Item> branches = new ArrayList<>(entities.size());
		for (ItemEntity branchEntity : entities) {
			branches.add(transformEntity(branchEntity));
		}
		return branches;
	}
}
