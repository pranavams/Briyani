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
public class Menu {

	private String id;
	private String name;

	public MenuEntity createEntity() {
		return MenuEntity.builder().name(name).build();
	}

	public Menu transformEntity(MenuEntity entity) {
		return Menu.builder().id(transformId(entity.getId())).name(entity.getName())
				.build();
	}

	private String transformId(long id) {
		return "CHBI" + id;
	}


	public List<Menu> transformEntities(List<MenuEntity> entities) {
		List<Menu> menus = new ArrayList<>(entities.size());
		for (MenuEntity menuEntity : entities) {
			menus.add(transformEntity(menuEntity));
		}
		return menus;
	}
}