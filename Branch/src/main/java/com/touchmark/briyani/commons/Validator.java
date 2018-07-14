package com.touchmark.briyani.commons;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {

	public static boolean isInValidDateOfBirth(OffsetDateTime dateOfBirth) {
		if (dateOfBirth == null)
			return true;
		return dateOfBirth.isAfter(OffsetDateTime.now().minus(18, ChronoUnit.YEARS));
	}

	public static boolean isInValidGender(String gender) {
		if (isStringWithOutValue(gender))
			return true;
		return !(Arrays.asList("Male", "Female", "Other").contains(gender));
	}

	public static boolean isInValidMobileNumber(String mobileNumber) {
		if (isStringWithOutValue(mobileNumber))
			return true;
		Pattern p = Pattern.compile("[0-9]{10}");
		Matcher m = p.matcher(mobileNumber);
		return !(m.find() && m.group().equals(mobileNumber));
	}

	public static boolean isStringWithOutValue(String value) {
		return value == null || value.trim().equals("");
	}
}
