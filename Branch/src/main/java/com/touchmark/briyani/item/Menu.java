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
public class Menu {

	private String id;
	private String name;

	public MenuEntity createEntity() {
		return MenuEntity.builder().name(name).lastUpdatedDate(OffsetDateTime.now()).build();
	}

	public Menu transformEntity(MenuEntity entity) {
		if (entity == null)
			return Menu.builder().build();
		try {
			return Menu.builder().id(transformId(entity.getId())).name(entity.getName().toUpperCase()).build();
		} catch (Exception ex) {
			Log.log("Menu", "Transform", "Exception " + ex, ex);
			return Menu.builder().build();
		}
	}

	private String transformId(long id) {
		return "CHBI" + id;
	}

	Long DBID(String id) {
		return Long.parseLong(id.substring(4));
	}

	public List<Menu> transformEntities(List<MenuEntity> entities) {
		List<Menu> menus = new ArrayList<>(entities.size());
		for (MenuEntity menuEntity : entities) {
			menus.add(transformEntity(menuEntity));
		}
		return menus;
	}

	public void validateForCreation() {
		List<String> errors = new ArrayList<>();
		if (Validator.isStringWithOutValue(this.name))
			errors.add("Invalid Category Name");

		Validator.throwExceptionWhenNotEmpty(errors);
	}
}
