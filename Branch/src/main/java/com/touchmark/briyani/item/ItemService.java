package com.touchmark.briyani.item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
	private ItemRepository repository;
	private MenuRepository mRepository;
	private ImageRepository iRepository;

	@Autowired
	public ItemService(ItemRepository repository, MenuRepository mRepository, ImageRepository iRepository) {
		this.repository = repository;
		this.mRepository = mRepository;
		this.iRepository = iRepository;
	}

	public List<Item> getAll() {
		return Item.builder().build().transformEntities(repository.findAll());
	}

	public List<Item> getAllWithImages() {
		List<ItemEntity> itemsFromDB = repository.findAll();
		for (ItemEntity itemEntity : itemsFromDB) {
			itemEntity.setImage(iRepository.findByTypeAndTypeId("item", itemEntity.getId()).get(0).getImage());
		}
		return Item.builder().build().transformEntities(itemsFromDB);
	}

	public ItemEntity save(Item object) {
		MenuEntity menuEntity = null;
		List<MenuEntity> menuNames = mRepository.findByName(object.getMenuName());
		if (menuNames == null || menuNames.size() == 0) {
			menuEntity = mRepository.save(MenuEntity.builder().name(object.getMenuName()).build());
		} else {
			menuEntity = menuNames.get(0);
		}

		ItemEntity itemEntity = object.createEntity();
		itemEntity.setMenu(menuEntity);
		return this.repository.save(itemEntity);
	}

	public List<Item> getRecent() {
		return Item.builder().build().transformEntities(repository.findRecent());
	}
}
