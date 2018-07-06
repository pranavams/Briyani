package com.touchmark.briyani.item;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {

	List<ImageEntity> findByTypeAndTypeId(String type, Long typeId);
}
