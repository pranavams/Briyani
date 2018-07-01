INSERT INTO role (role_id, name, description) VALUES (0, 'DUMMY_USER', 'Dummy User - Has no rights');
INSERT INTO role (role_id, name, description) VALUES (1, 'STANDARD_USER', 'Standard User - Has no admin rights');
INSERT INTO role (role_id, name, description) VALUES (2, 'ADMIN_USER', 'Admin User - Has permission to perform admin tasks');

-- USER
-- non-encrypted password: jwtpass

INSERT INTO ACTORS (roles, actor_id, first_name, last_name, user_name, password) VALUES ('STANDARD_USER', 0, 'Dummy', 'Head', 'dummy.head', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a');
INSERT INTO ACTORS (roles, actor_id, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('STANDARD_USER,ADMIN_USER', 1, 'ALEX' ,'ALEX', 'Alex123', '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu');
INSERT INTO ACTORS (roles, actor_id, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('ADMIN_USER', 2, 'TOM', 'TOM', 'Tom234', '$2a$04$PCIX2hYrve38M7eOcqAbCO9UqjYg7gfFNpKsinAxh99nms9e.8HwK');
INSERT INTO ACTORS (roles, actor_id, FIRST_NAME, LAST_NAME, user_name, password) VALUES ('STANDARD_USER', 3, 'ADAM', 'ADAM', 'Adam', '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu');


INSERT INTO actor_role(actor_id, role_id) VALUES(1, 1);
INSERT INTO actor_role(actor_id, role_id) VALUES(2, 1);
INSERT INTO actor_role(actor_id, role_id) VALUES(2, 2);
INSERT INTO actor_role(actor_id, role_id) VALUES(3, 2);
