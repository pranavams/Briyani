package com.touchmark.briyani.commons;

import static org.junit.Assert.*;

import org.junit.Test;

public class ValidatorTest {

	@Test
	public void validateForGoodPassword() {
		assertFalse(Validator.isInvalidPassword("Himalayas@2018"));
	}

	@Test
	public void validateForBadPassword() {
		assertTrue(Validator.isInvalidPassword("Himalayas2018"));
		assertTrue(Validator.isInvalidPassword("Himalayas@"));
		assertTrue(Validator.isInvalidPassword("himalayas@2018"));
		assertTrue(Validator.isInvalidPassword("hi@1Laya"));
		assertTrue(Validator.isInvalidPassword("Himalayas@2018Himalayas@2018Himalayas@2018"));
	}
}
