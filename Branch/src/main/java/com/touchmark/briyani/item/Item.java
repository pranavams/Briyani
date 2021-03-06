package com.touchmark.briyani.item;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.commons.Validator;

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
	private int quantity;

	public ItemEntity createEntity() {
		return ItemEntity.builder().description(description).name(name).price(price)
				.lastUpdatedDate(OffsetDateTime.now()).build();
	}

	public Item transformEntity(ItemEntity entity) {
		if (entity == null)
			return Item.builder().build();
		try {
			return Item.builder().id(transformId(entity.getId())).name(entity.getName().toUpperCase())
					.description(entity.getDescription()).price(entity.getPrice()).menuName(entity.getMenu().getName().toUpperCase())
					.menuId(transformMenuId(entity.getMenu().getId())).build();
		} catch (Exception ex) {
			Log.log("Item", "Transform", "Exception " + ex, ex);
			return Item.builder().build();
		}
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

	public void validateForCreation() {
		List<String> errors = new ArrayList<>();
		if (Validator.isStringWithOutValue(this.menuName))
			errors.add("Invalid Category Name");

		if (Validator.isStringWithOutValue(this.name))
			errors.add("Invalid Menu Name");

		if (Validator.isStringWithOutValue(this.description))
			errors.add("Invalid Description");

		if (Validator.isInvalidPrice(this.price))
			errors.add("Invalid Price");
		
		Validator.throwExceptionWhenNotEmpty(errors);
	}
}
