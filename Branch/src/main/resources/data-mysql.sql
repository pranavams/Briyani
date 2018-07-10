###INSERT INTO role (role_id, name, description) VALUES (0, 'DUMMY_USER', 'Dummy User - Has no rights');
###INSERT INTO role (role_id, name, description) VALUES (1, 'STANDARD_USER', 'Standard User - Has no admin rights');

###INSERT INTO role (role_id, name, description) VALUES (2, 'ADMIN_USER', 'Admin User - Has permission to perform admin tasks');
### USER

###INSERT INTO actor_role(actor_id, role_id) VALUES(1, 1);
###INSERT INTO actor_role(actor_id, role_id) VALUES(2, 1);
###INSERT INTO actor_role(actor_id, role_id) VALUES(2, 2);
###INSERT INTO actor_role(actor_id, role_id) VALUES(3, 2);


###DELETE

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

###Address
INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('dunton', 'dunton', 'England', '5', 'GB', 'x Street', '444555');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('dearborn', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('new york', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('new jersey', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('dallas', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('chicago', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('wisconsin', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('great lakes', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('niagara', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('san jose', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('san fransisco', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('las vegas', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('los angels', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('salt lakes', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

INSERT INTO ADDRESS (AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES ('pa', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');

###Rider

INSERT INTO RIDER (DEPARTMENT_TYPE, DATE_OF_BIRTH, EMAIL, GENDER, MOBILE_NUMBER, RIDER_ID_CARD_NO, RIDER_PERSON_FIRST_NAME, RIDER_PERSON_MIDDLE_NAME, RIDER_PERSON_LAST_NAME, RIDER_PERSON_NUMBER, RIDER_PERSON_SALUTATION, ZONE, ADDRESS_ID)
VALUES ('Branch', '1981-10-27 00:00:00', 'ryder@gmail.com', 'Male', '234234', 'IDCARD', 'John', 'R', 'Smith', '23423423', 'Mr.', 'ZoneA', (select address_id from address where area = 'dunton'));

INSERT INTO RIDER (DEPARTMENT_TYPE, DATE_OF_BIRTH, EMAIL, GENDER, MOBILE_NUMBER, RIDER_ID_CARD_NO, RIDER_PERSON_FIRST_NAME, RIDER_PERSON_MIDDLE_NAME, RIDER_PERSON_LAST_NAME, RIDER_PERSON_NUMBER, RIDER_PERSON_SALUTATION, ZONE, ADDRESS_ID)
VALUES ('End User', '1991-11-19 00:00:00', 'ed@gmail.com', 'FeMale', '234234', 'IDCARD', 'Lyla', 'James', 'Fitter', '23423423', 'Miss.', 'ZoneB', (select address_id from address where area = 'dearborn'));

###Branch
INSERT INTO BRANCH (CONTACT_PERSON_FIRST_NAME, CONTACT_PERSON_MIDDLE_NAME, CONTACT_PERSON_LAST_NAME, CONTACT_PERSON_NUMBER, CONTACT_PERSON_SALUTATION, EMAIL, LATITUDE, LONGITUDE, MOBILE_NUMBER, NAME, NOTES, TELEPHONE, ADDRESS_ID)
VALUES ('Ajith', 'M', 'Roy', '123455', 'Mr.', 'ajith.roy@gmail.com', '234234', '234234', '123234234', 'OMR Branch', 'Branch in omr', '323234234', (select address_id from address where area = 'new york'));

INSERT INTO BRANCH (CONTACT_PERSON_FIRST_NAME, CONTACT_PERSON_MIDDLE_NAME, CONTACT_PERSON_LAST_NAME, CONTACT_PERSON_NUMBER, CONTACT_PERSON_SALUTATION, EMAIL, LATITUDE, LONGITUDE, MOBILE_NUMBER, NAME, NOTES, TELEPHONE, ADDRESS_ID)
VALUES ('Prabhas', 'M', 'Roy', '123455', 'Mr.', 'prabhas.roy@gmail.com', '234234', '234234', '123234234', 'ECR Branch', 'Branch in EC', '323234234', (select address_id from address where area = 'new jersey'));


INSERT INTO ACTOR (roles, first_name, last_name, user_name, password) VALUES ('STANDARD_USER', 'Dummy', 'Head', 'dummy.head', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a');
INSERT INTO ACTOR (roles, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('BRANCH_USER,BRANCH_MANAGER,SYSTEM_MANAGER', 'ALEX' ,'ALEX', 'Alex123', '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu');
INSERT INTO ACTOR (roles, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('BRANCH_ADMIN', 'TOM', 'TOM', 'Tom234', '$2a$04$PCIX2hYrve38M7eOcqAbCO9UqjYg7gfFNpKsinAxh99nms9e.8HwK');
INSERT INTO ACTOR (roles, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('BRANCH_MANAGER', 'ADAM', 'ADAM', 'Adam', '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu');
INSERT INTO ACTOR (roles, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('SYSTEM_MANAGER', 'Evelyn', 'M', 'Chang', '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu');

###menu * item
INSERT INTO MENU (NAME) VALUES ('Chicken');
INSERT INTO MENU (NAME) VALUES ('Mutton');
INSERT INTO MENU ( NAME) VALUES ('Steak');


INSERT INTO ITEM (DESCRIPTION,  	NAME,  	PRICE,  	MENU_ID)
VALUES ('With Onions Marinated in Curd', 'Briyani', 10, (select id from menu where name = 'Chicken'));

INSERT INTO ITEM (DESCRIPTION,  	NAME,  	PRICE,  	MENU_ID)
VALUES ('With Onions Marinated in Curd', 'Briyani', 10, (select id from menu where name = 'Mutton'));

INSERT INTO ITEM  (DESCRIPTION,  	NAME,  	PRICE,  	MENU_ID)
VALUES ('With Chilli Sauce and Tobasco Sauce', 'Fried Rice', 10, (select id from menu where name = 'Steak'));


###Staff

INSERT INTO STAFF (EMAIL, FIRST_NAME, MIDDLE_NAME, LAST_NAME, SALUTATION, MOBILE_NUMBER, DATE_OF_BIRTH, ADDRESS_ID, LAST_UPDATED_DATE)
VALUES ('devaki@vengadesh.com', 'Devaki', 'V', 'Vengadesh', 'Mrs.', '3423423', '1991-12-12 00:00:00', (select address_id from address where area = 'dallas'), NOW());

INSERT INTO STAFF (EMAIL, FIRST_NAME, MIDDLE_NAME, LAST_NAME, SALUTATION, MOBILE_NUMBER, DATE_OF_BIRTH, ADDRESS_ID, LAST_UPDATED_DATE)
VALUES ('kumari@jyoti.com', 'Jyothi', 'A', 'Kumari', 'Miss.', '3423423', '1991-01-01 00:00:00', (select address_id from address where area = 'chicago'), NOW());

INSERT INTO STAFF (EMAIL, FIRST_NAME, MIDDLE_NAME, LAST_NAME, SALUTATION, MOBILE_NUMBER, DATE_OF_BIRTH, ADDRESS_ID, LAST_UPDATED_DATE)
VALUES ('karthick@raj.com', 'Karthick', 'T', 'Rajkumar', 'Mr.', '3423423', '1981-01-01 00:00:00', (select address_id from address where area = 'wisconsin'), NOW());

###Customer

INSERT INTO CUSTOMER (GENDER, EMAIL, FIRST_NAME, MIDDLE_NAME, LAST_NAME, SALUTATION, MOBILE_NUMBER, DATE_OF_BIRTH, ADDRESS_ID, LAST_UPDATED_DATE)
VALUES ('Female', 'devaki@vengadesh.com', 'Devaki', 'V', 'Vengadesh', 'Mrs.', '3423423', '1991-12-12 00:00:00', (select address_id from address where area = 'great lakes'), NOW());

INSERT INTO CUSTOMER (GENDER, EMAIL, FIRST_NAME, MIDDLE_NAME, LAST_NAME, SALUTATION, MOBILE_NUMBER, DATE_OF_BIRTH, ADDRESS_ID, LAST_UPDATED_DATE)
VALUES ('Female', 'kumari@jyoti.com', 'Jyothi', 'A', 'Kumari', 'Miss.', '3423423', '1991-01-01 00:00:00', (select address_id from address where area = 'niagara'), NOW());

INSERT INTO CUSTOMER (GENDER, EMAIL, FIRST_NAME, MIDDLE_NAME, LAST_NAME, SALUTATION, MOBILE_NUMBER, DATE_OF_BIRTH, ADDRESS_ID, LAST_UPDATED_DATE)
VALUES ('Male', 'karthick@raj.com', 'Karthick', 'T', 'Rajkumar', 'Mr.', '3423423', '1981-01-01 00:00:00', (select address_id from address where area = 'san jose'), NOW());

###Order

INSERT INTO ORDER_INFO (NUMBER_OF_VESSELS, VESSEL_STATUS, ORDER_STATUS, CUSTOMER_ID, COUPON_CODE,  DATE_AND_TIME,  	PAYMENT_STATUS,  	TAX_AMOUNT,  	TAX_PERCENTAGE,  	TOTAL_AMOUNT,  	USER_NAME, ADDRESS_ID, BRANCH_ID)
values (3, 'NOT_RETURNED', 'PACKING', 
(select id from customer where first_name = 'Devaki'),
'', current_timestamp, 'COMPLETED', 6, 
6, 106, 'Alex123', (select address_id from address where area = 'sanfransisco'), 
(select id from branch where CONTACT_PERSON_FIRST_NAME = 'Ajith'));

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES ( 5, 10, 1, 
(select order_id from order_info where address_id = (select address_id from address where area = 'sanfransisco'))
);

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (3, 10, 2, 
(select order_id from order_info where address_id = (select address_id from address where area = 'sanfransisco'))
);

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (2, 10, 3, 
(select order_id from order_info where address_id = (select address_id from address where area = 'sanfransisco'))
);


INSERT INTO ORDER_INFO (NUMBER_OF_VESSELS, VESSEL_STATUS, ORDER_STATUS, CUSTOMER_ID, COUPON_CODE,  DATE_AND_TIME,  	PAYMENT_STATUS,  	TAX_AMOUNT,  	TAX_PERCENTAGE,  	TOTAL_AMOUNT,  	USER_NAME, ADDRESS_ID, BRANCH_ID)
values (30, 'RETURNED', 'REJECTED', 
(select id from customer where first_name = 'Jyothi'),
 '', current_timestamp, 'REFUNDED', 6, 6, 106, 'Alex123', (select address_id from address where area = 'las vegas'), 
 (select id from branch where CONTACT_PERSON_FIRST_NAME = 'Prabhas'));

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (6, 10, 
(select id from item where menu_id = (select id from menu where name = 'Chicken')), 
(select order_id from order_info where address_id = (select address_id from address where area = 'las vegas'))
);

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (4, 10, 
(select id from item where menu_id = (select id from menu where name = 'Mutton')), 
(select order_id from order_info where address_id = (select address_id from address where area = 'las vegas'))
);


INSERT INTO ORDER_INFO (NUMBER_OF_VESSELS, VESSEL_STATUS, ORDER_STATUS, CUSTOMER_ID, COUPON_CODE,  DATE_AND_TIME,  	PAYMENT_STATUS,  	TAX_AMOUNT,  	TAX_PERCENTAGE,  	TOTAL_AMOUNT,  	USER_NAME, ADDRESS_ID, BRANCH_ID)
values (13, 'NOT_RETURNED', 'DELIVERED', 
(select id from customer where first_name = 'Karthick'),
 '', '2018-07-01 00:00:00', 'COMPLETED', 6, 6, 106, 'Alex123', (select address_id from address where area = 'los angels'), 
 (select id from branch where CONTACT_PERSON_FIRST_NAME = 'Prabhas'));

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (6, 10, 
(select id from item where menu_id = (select id from menu where name = 'Chicken')),  
(select order_id from order_info where address_id = (select address_id from address where area = 'los angels'))
);

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (4, 10, 
(select id from item where menu_id = (select id from menu where name = 'Mutton')),  
(select order_id from order_info where address_id = (select address_id from address where area = 'los angels'))
);

INSERT INTO ORDER_INFO (NUMBER_OF_VESSELS, VESSEL_STATUS, ORDER_STATUS, CUSTOMER_ID, COUPON_CODE,  DATE_AND_TIME,  	PAYMENT_STATUS,  	TAX_AMOUNT,  	TAX_PERCENTAGE,  	TOTAL_AMOUNT,  	USER_NAME, ADDRESS_ID, BRANCH_ID)
values (14, 'NOT_RETURNED', 'COMPLETED', 
(select id from customer where first_name = 'Karthick'),
 '', '2018-07-01 00:00:00', 'COMPLETED', 70, 10, 770, 'Alex123', (select address_id from address where area = 'salt lakes'), 
(select id from branch where CONTACT_PERSON_FIRST_NAME = 'Ajith'));

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (6, 10, 
(select id from item where menu_id = (select id from menu where name = 'Chicken')),   
(select order_id from order_info where address_id = (select address_id from address where area = 'salt lakes'))
);

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (4, 10, 
(select id from item where menu_id = (select id from menu where name = 'Steak')),  
(select order_id from order_info where address_id = (select address_id from address where area = 'salt lakes'))
);

INSERT INTO ORDER_DETAIL (QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (60, 10, 
(select id from item where menu_id = (select id from menu where name = 'Mutton')),   
(select order_id from order_info where address_id = (select address_id from address where area = 'salt lakes'))
);
