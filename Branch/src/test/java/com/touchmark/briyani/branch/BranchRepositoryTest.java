package com.touchmark.briyani.branch;

import static org.junit.Assert.fail;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BranchRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private BranchRepository repository;
	
	@Test
	public void testRetrievalOfBranch() {
		fail("Not yet implemented");
	}

}
