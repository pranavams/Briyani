package com.touchmark.briyani.commons;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {

	public static void throwExceptionWhenNotEmpty(List<String> errors) {
		if (errors.isEmpty() == false)
			throw new ValidationException(errors);
	}

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

	public static boolean isInValidDateOfJoin(OffsetDateTime dateOfJoin) {
		if (dateOfJoin == null)
			return true;
		return dateOfJoin.isAfter(OffsetDateTime.now());
	}

	public static boolean isInValidRole(String role) {
		if (isStringWithOutValue(role))
			return true;
		return !(Arrays.asList("Admin", "Kitchen", "Staff").contains(role));
	}

	public static boolean isInValidAddress(Address address) {
		return false;
	}

	public static boolean isInValidLicenseIssueDate(OffsetDateTime licenceIssueDate) {
		if (licenceIssueDate == null)
			return true;
		return licenceIssueDate.isAfter(OffsetDateTime.now());
	}

	public static boolean isInValidLicenseExpiryDate(OffsetDateTime licenceExpiryDate,
			OffsetDateTime licenceIssueDate) {
		if (licenceExpiryDate == null || licenceIssueDate == null)
			return true;
		return licenceExpiryDate.isBefore(licenceIssueDate);
	}

	public static boolean isInvalidPrice(float price) {
		if (price <= 0)
			return true;
		return false;
	}

	public static boolean isInvalidPassword(String password) {
		return !(Pattern.compile("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{12,32})").matcher(password).matches());
	}

}
