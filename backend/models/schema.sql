CREATE TABLE roles (
  roles_id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (roles_id)
);

CREATE TABLE permissions (
  permission_id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (permission_id)
);
CREATE TABLE role_permission (
  id SERIAL PRIMARY KEY,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(roles_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),  
);

CREATE TABLE history (
 history_id SERIAL PRIMARY KEY,
user_id INT
medications VARCHAR(255),
medicalHistory VARCHAR(255),
FOREIGN KEY (user_id) REFERENCES users(users_id),
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE insurance (
insurance_id SERIAL PRIMARY KEY,
insuranceName VARCHAR(255),
is_deleted SMALLINT DEFAULT 0
);


CREATE TABLE specialty (
specialty_id SERIAL PRIMARY KEY,
specialty VARCHAR(255),
img VARCHAR(255),
 created_at TIMESTAMP
);

CREATE TABLE users(
users_id SERIAL PRIMARY KEY,
firstName VARCHAR(255) NOT NULL,
lastName VARCHAR(255),
 age INT,
phone INT NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
address VARCHAR(255),
history INT,
insurance INT,
specialty INT,
role_id INT,
img VARCHAR(255),
is_deleted SMALLINT DEFAULT 0,
 FOREIGN KEY (specialty) REFERENCES specialty(specialty_id),
  FOREIGN KEY (insurance) REFERENCES insurance(insurance_id),
 FOREIGN KEY (history) REFERENCES history(history_id),
FOREIGN KEY (role_id) REFERENCES roles(roles_id)
);

CREATE TABLE docInfo (
docInfo_id SERIAL PRIMARY KEY,
specialty  INT,
provider_id INT,
FOREIGN KEY (provider_id) REFERENCES users(users_id),
FOREIGN KEY (specialty) REFERENCES specialty(specialty_id),
experience VARCHAR(255),
certificates VARCHAR(255),
is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE notes (
 notes_id SERIAL PRIMARY KEY,
notes VARCHAR(255),
users_id INT,
provider_id INT,
FOREIGN KEY (users_id) REFERENCES users(users_id),
FOREIGN KEY (provider_id) REFERENCES users(users_id),
created_at TIMESTAMP,
 is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE review (
 review_id SERIAL PRIMARY KEY,
comment VARCHAR(255),
users_id INT,
provider_id INT,
FOREIGN KEY (users_id) REFERENCES users(users_id),
FOREIGN KEY (provider_id) REFERENCES users(users_id),
created_at TIMESTAMP,
 is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE schedule (
 schedule_id SERIAL PRIMARY KEY,
 date DATE,
 timeFrom TIME,
 timeTo TIME,
provider_id INT,
FOREIGN KEY (provider_id) REFERENCES users(users_id),
booked BOOLEAN DEFAULT false
);

CREATE TABLE notification (
notification_id SERIAL PRIMARY KEY,
notification  VARCHAR(255),
users_id INT,
schedule_id INT,
created_at TIMESTAMP,
FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id),
is_deleted SMALLINT DEFAULT 0,
 FOREIGN KEY (users_id) REFERENCES users(users_id)
);


 CREATE TABLE appointmint (
 appointmint_id SERIAL PRIMARY KEY,
 date DATE,
 timeFrom TIME,
 timeTo TIME,
provider_id INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(users_id),
FOREIGN KEY (provider_id) REFERENCES users(users_id),
status varchar(255) DEFAULT 'pending'
);
