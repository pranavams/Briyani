TRUNCATE TABLE CUSTOMER;
TRUNCATE TABLE STAFF;
TRUNCATE TABLE ORDER_DETAIL;
TRUNCATE TABLE ORDER_INFO;
TRUNCATE TABLE ITEM;
TRUNCATE TABLE MENU;
TRUNCATE TABLE BRANCH;
TRUNCATE TABLE RIDER;
TRUNCATE TABLE ADDRESS;
TRUNCATE TABLE ACTOR;
TRUNCATE TABLE IMAGE;

###Address
INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE, LAST_UPDATED_DATE  )
VALUES ('dunton', 'dunton', 'England', '5', 'GB', 'x Street', '444555', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('dearborn', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('Perungudi', 'Chennai', 'India', '5', 'Tamilnadu', '15th Cross Street', '600096', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('Palavakkam', 'Chennai', 'India', '14', 'Tamilnadu', '23rd Street', '600041', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('dallas', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('chicago', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('wisconsin', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('great lakes', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('niagara', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('san jose', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('san fransisco', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('las vegas', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('los angels', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('salt lakes', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('pa', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186', NOW());

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  , LAST_UPDATED_DATE  )
VALUES ('Chennai', 'Chennai', 'India', '5', 'Tamil Nadu', 'x Street', '42186', NOW());

###Branch
INSERT INTO BRANCH (CONTACT_PERSON_FIRST_NAME, CONTACT_PERSON_MIDDLE_NAME, CONTACT_PERSON_LAST_NAME, CONTACT_PERSON_NUMBER, CONTACT_PERSON_SALUTATION, EMAIL, LATITUDE, LONGITUDE, MOBILE_NUMBER, NAME, NOTES, TELEPHONE, ADDRESS_ID)
VALUES ('Ajith', 'M', 'Roy', '9887766551', 'Mr.', 'ajith.roy@gmail.com', 'LAT', 'LONG', '9887766551', 'OMR Branch', 'Branch in OMR', '9887766551', (select address_id from address where area = 'Perungudi'));

INSERT INTO BRANCH (CONTACT_PERSON_FIRST_NAME, CONTACT_PERSON_MIDDLE_NAME, CONTACT_PERSON_LAST_NAME, CONTACT_PERSON_NUMBER, CONTACT_PERSON_SALUTATION, EMAIL, LATITUDE, LONGITUDE, MOBILE_NUMBER, NAME, NOTES, TELEPHONE, ADDRESS_ID)
VALUES ('Prabhas', 'M', 'Roy', '8877665544', 'Mr.', 'prabhas.roy@gmail.com', 'LAT', 'LONG', '8877665544', 'ECR Branch', 'Branch in ECR', '8877665544', (select address_id from address where area = 'Palavakkam'));


### ACTOR
INSERT INTO ACTOR (roles, first_name, last_name, user_name, password, USER_TYPE, USER_TYPE_ID) 
	VALUES ('STANDARD_USER', 'Ajith', 'Roy', '9887766551', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a', 'BRANCH', 
		(SELECT ID FROM BRANCH WHERE CONTACT_PERSON_FIRST_NAME = 'Ajith')
	);
INSERT INTO ACTOR (roles, FIRST_NAME, LAST_NAME, user_name, password, USER_TYPE, USER_TYPE_ID) 
	VALUES ('BRANCH_USER,BRANCH_MANAGER,SYSTEM_MANAGER', 'Prabhas' ,'Roy', '8877665544', '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu', 'BRANCH', 
		(SELECT ID FROM BRANCH WHERE CONTACT_PERSON_FIRST_NAME = 'Prabhas')
	);

COMMIT;