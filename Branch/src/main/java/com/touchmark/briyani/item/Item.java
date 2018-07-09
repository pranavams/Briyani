package com.touchmark.briyani.item;

import java.time.OffsetDateTime;
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
	private String menuId;
	private byte[] image;

	public ItemEntity createEntity() {
		return ItemEntity.builder().description(description).name(name).price(price).lastUpdatedDate(OffsetDateTime.now()).build();
	}

	public Item transformEntity(ItemEntity entity) {
		return Item.builder().id(transformId(entity.getId())).name(entity.getName())
				.description(entity.getDescription()).price(entity.getPrice()).menuName(entity.getMenu().getName())
				.image(entity.getImage())
				.menuId(transformMenuId(entity.getMenu().getId())).build();
	}

	private String transformMenuId(long id) {
		return "CHBI" + id;
	}

	private String transformId(long id) {
		return "CHBIR" + id;
	}

	public List<Item> transformEntities(List<ItemEntity> entities) {
		List<Item> items = new ArrayList<>(entities.size());
		for (ItemEntity itemEntity : entities) {
			items.add(transformEntity(itemEntity));
		}
		return items;
	}

	public Long DBID() {
		return Long.parseLong(id.substring(5));
	}
}
