package com.touchmark.briyani.user;

import static org.junit.Assert.*;

import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCrypt;

public class UserServiceTest {

	@Test
	public void checkForPasswordVerification() {
		assertTrue(BCrypt.checkpw("Himalayas@2018", "$2a$10$NLWF1n.S/NP5rvTCPhvXO.NeRdLyq1UB8fUizTfMezT2Mpp06u5DG"));
	}

}
