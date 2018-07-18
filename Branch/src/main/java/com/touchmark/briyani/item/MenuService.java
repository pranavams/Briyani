package com.touchmark.briyani.item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Validator;

@Service
public class MenuService {
	private MenuRepository mRepository;

	@Autowired
	public MenuService(MenuRepository mRepository) {
		this.mRepository = mRepository;
	}

	public List<Menu> getAll() {
		return Menu.builder().build().transformEntities(mRepository.findAll());
	}

	public MenuEntity save(Menu object) {
		MenuEntity entity = null;
		entity = getOrCreateMenu(object);
		return mRepository.save(entity);
	}

	private MenuEntity getOrCreateMenu(Menu object) {
		MenuEntity entity;
		if(Validator.isStringWithOutValue(object.getId()))
			entity = MenuEntity.builder().name(object.getName().toUpperCase()).build();
		else {
			entity = mRepository.findById(object.DBID(object.getId())).get();
			entity.setName(object.getName().toUpperCase());
		}
		return entity;
	}

	public List<Menu> getRecent() {
		return Menu.builder().build().transformEntities(mRepository.findRecent());
	}

}
