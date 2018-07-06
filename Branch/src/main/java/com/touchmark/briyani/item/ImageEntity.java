package com.touchmark.briyani.item;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Entity
@Table(name = "image")
public class ImageEntity {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
    private Long id;
	
	@Column(name= "type")
	private String type;
	
	@Column(name = "typeId")
	private Long typeId;
	
	@Column(name = "size")
	private Long size;
	
	@Column(name= "fileName")
	private String fileName;

	@Lob
	@Column(name = "image")
	private byte[] image;
}
