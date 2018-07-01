package com.touchmark.briyani.item;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<MenuEntity, Long> {
	public List<MenuEntity> findByName(String name);
}
