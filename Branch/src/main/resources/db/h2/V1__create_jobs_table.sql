CREATE TABLE JOBS(
	PROCESS_CODE BIGINT NOT NULL AUTO_INCREMENT,
	COMPLETED NUMBER,
	JOB_END_TIME TIMESTAMP,
	JOB_RUN_START_TIME TIMESTAMP,
	JOB_START_TIME TIMESTAMP,
	JOB_STATUS VARCHAR(255),
	JVM_NAME VARCHAR(255),
	LAST_UPDATED_TIME TIMESTAMP,
	LAST_UPDATED_USER VARCHAR(255),
	PARAMETERS CLOB,
	PROCESS_CODE_NAME VARCHAR(255),
	RECORD_CREATED_TIME TIMESTAMP,
	RECORD_CREATED_USER VARCHAR(255),
	STOP_FLAG VARCHAR(255),
	SUBMITTED_TIME TIMESTAMP
);
