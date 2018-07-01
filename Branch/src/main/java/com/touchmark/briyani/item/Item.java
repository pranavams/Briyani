package com.touchmark.briyani.item;

import java.util.ArrayList;
import java.util.List;

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
	private String menuName;

	public ItemEntity createEntity() {
		return ItemEntity.builder().description(description).name(name).price(price).build();
	}

	public Item transformEntity(ItemEntity entity) {
		return Item.builder().id(transformId(entity.getId())).name(entity.getName())
				.description(entity.getDescription()).price(entity.getPrice()).menuName(entity.getMenu().getName())
				.build();
	}

	private String transformId(long id) {
		return "ITM-" + id;
	}

	public List<Item> transformEntities(List<ItemEntity> entities) {
		List<Item> items = new ArrayList<>(entities.size());
		for (ItemEntity itemEntity : entities) {
			items.add(transformEntity(itemEntity));
		}
		return items;
	}
}
