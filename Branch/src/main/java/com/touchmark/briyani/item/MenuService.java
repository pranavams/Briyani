package com.touchmark.briyani.item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.staff.Staff;

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
		return mRepository.save(MenuEntity.builder().name(object.getName()).build());
	}

	public List<Menu> getRecent() {
		return Menu.builder().build().transformEntities(mRepository.findRecent());
	}

}
