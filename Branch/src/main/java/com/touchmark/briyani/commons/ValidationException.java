package com.touchmark.briyani.commons;

import java.util.List;

import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private List<String> errors;

	public ValidationException(List<String> errors) {
		super(errors.toString());
		this.errors = errors;
	}
	
}
