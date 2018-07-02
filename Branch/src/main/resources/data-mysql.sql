--INSERT INTO role (role_id, name, description) VALUES (0, 'DUMMY_USER', 'Dummy User - Has no rights');
--INSERT INTO role (role_id, name, description) VALUES (1, 'STANDARD_USER', 'Standard User - Has no admin rights');

--INSERT INTO role (role_id, name, description) VALUES (2, 'ADMIN_USER', 'Admin User - Has permission to perform admin tasks');
-- USER

--INSERT INTO actor_role(actor_id, role_id) VALUES(1, 1);
--INSERT INTO actor_role(actor_id, role_id) VALUES(2, 1);
--INSERT INTO actor_role(actor_id, role_id) VALUES(2, 2);
--INSERT INTO actor_role(actor_id, role_id) VALUES(3, 2);


--DELETE

TRUNCATE TABLE ORDER_DETAIL;
TRUNCATE TABLE ORDER_INFO;
TRUNCATE TABLE ITEM;
TRUNCATE TABLE MENU;
TRUNCATE TABLE BRANCH;
TRUNCATE TABLE ADDRESS;
TRUNCATE TABLE ACTOR;

--Address
INSERT INTO ADDRESS (ADDRESS_ID, AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES (1, 'dunton', 'dunton', 'England', '5', 'GB', 'x Street', '444555');

INSERT INTO ADDRESS (ADDRESS_ID, AREA,  	CITY,  	COUNTRY,  	DOOR_NUMBER,  	STATE,  	STREET,  	ZIPCODE  )
VALUES (2, 'dearborn', 'dearborn', 'United States', '5', 'Michigan', 'x Street', '42186');


INSERT INTO ACTOR (roles, actor_id, first_name, last_name, user_name, password) VALUES ('STANDARD_USER', 0, 'Dummy', 'Head', 'dummy.head', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a');
INSERT INTO ACTOR (roles, actor_id, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('STANDARD_USER,ADMIN_USER', 1, 'ALEX' ,'ALEX', 'Alex123', '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu');
INSERT INTO ACTOR (roles, actor_id, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('ADMIN_USER', 2, 'TOM', 'TOM', 'Tom234', '$2a$04$PCIX2hYrve38M7eOcqAbCO9UqjYg7gfFNpKsinAxh99nms9e.8HwK');
INSERT INTO ACTOR (roles, actor_id, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('STANDARD_USER', 3, 'ADAM', 'ADAM', 'Adam', '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu');

--menu * item
INSERT INTO MENU (ID, NAME) VALUES (1, 'Chicken');
INSERT INTO MENU (ID, NAME) VALUES (2, 'Mutton');
INSERT INTO MENU (ID, NAME) VALUES (3, 'Steak');


INSERT INTO ITEM (ID,  	DESCRIPTION,  	NAME,  	PRICE,  	MENU_ID)
VALUES (1, 'With Onions Marinated in Curd', 'Briyani', 10, 1);

INSERT INTO ITEM (ID,  	DESCRIPTION,  	NAME,  	PRICE,  	MENU_ID)
VALUES (2, 'With Onions Marinated in Curd', 'Briyani', 10, 2);

INSERT INTO ITEM  (ID,  	DESCRIPTION,  	NAME,  	PRICE,  	MENU_ID)
VALUES (3, 'With Chilli Sauce and Tobasco Sauce', 'Fried Rice', 10, 3);


--Order

INSERT INTO ORDER_INFO (ORDER_ID, COUPON_CODE,  	DATE_AND_TIME,  	PAYMENT_STATUS,  	TAX_AMOUNT,  	TAX_PERCENTAGE,  	TOTAL_AMOUNT,  	USER_NAME, ADDRESS_ID)
values (1, '', current_timestamp, 'completed', 6, 6, 106, 'Alex123', 1);

INSERT INTO ORDER_DETAIL (ORDER_DETAILS_ID,  	QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (1, 5, 10, 1, 1);

INSERT INTO ORDER_DETAIL (ORDER_DETAILS_ID,  	QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (2, 3, 10, 2, 1);

INSERT INTO ORDER_DETAIL (ORDER_DETAILS_ID,  	QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (3, 2, 10, 3, 1);


INSERT INTO ORDER_INFO (ORDER_ID, COUPON_CODE,  	DATE_AND_TIME,  	PAYMENT_STATUS,  	TAX_AMOUNT,  	TAX_PERCENTAGE,  	TOTAL_AMOUNT,  	USER_NAME, ADDRESS_ID)
values (2, '', current_timestamp, 'completed', 6, 6, 106, 'Alex123', 2);

INSERT INTO ORDER_DETAIL (ORDER_DETAILS_ID,  	QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (4, 6, 10, 1, 1);

INSERT INTO ORDER_DETAIL (ORDER_DETAILS_ID,  	QUANTITY,  	UNIT_PRICE,  	ITEM_ID,  	ORDER_ID)
VALUES (5, 4, 10, 3, 1);
