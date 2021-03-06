package com.touchmark.briyani.item;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
	public List<ItemEntity> findByName(String name);
	@Query(value = "SELECT * FROM ITEM p ORDER BY LAST_UPDATED_DATE DESC LIMIT 2",  nativeQuery = true)
	List<ItemEntity> findRecent();
}
