package com.touchmark.briyani.item;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MenuRepository extends JpaRepository<MenuEntity, Long> {
	public List<MenuEntity> findByName(String name);
	@Query(value = "SELECT * FROM MENU p ORDER BY LAST_UPDATED_DATE DESC LIMIT 2",  nativeQuery = true)
	List<MenuEntity> findRecent();
}
