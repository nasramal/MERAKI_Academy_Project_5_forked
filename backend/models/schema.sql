CREATE TABLE roles (
  roles_id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (roles_id)
);
CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(roles_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
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
workingHours INT,
notes INT,
appointment INT,
role_id INT,
is_deleted SMALLINT DEFAULT 0,
 FOREIGN KEY (specialty) REFERENCES specialty(specialty_id),
  FOREIGN KEY (insurance) REFERENCES insurance(insurance_id),
 FOREIGN KEY (history) REFERENCES history(history_id),
FOREIGN KEY (appointment) REFERENCES appointment(appointment_id),
FOREIGN KEY (notes) REFERENCES notes(notes_id),
FOREIGN KEY (workingHours) REFERENCES workingHours(workingHours_id),
FOREIGN KEY (role_id) REFERENCES roles(roles_id)
);
CREATE TABLE history (
 history_id SERIAL PRIMARY KEY,
medications VARCHAR(255),
medicalHistory VARCHAR(255),
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE insurance (
 insurance_id SERIAL PRIMARY KEY,
insuranceName VARCHAR(255),
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE specialty  (
 specialty_id SERIAL PRIMARY KEY,
specialty  VARCHAR(255),
experience VARCHAR(255),
certificates VARCHAR(255),
    is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE notes (
 notes_id SERIAL PRIMARY KEY,
notes VARCHAR(255),
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE workingHours (
 workingHours_id SERIAL PRIMARY KEY,
date VARCHAR(255),
fromTime VARCHAR(255),
toTime VARCHAR(255),
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
comments  VARCHAR(255),
users INT,
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (users) REFERENCES users(users_id)
);


CREATE TABLE notification (
  notification_id SERIAL PRIMARY KEY,
 notification  VARCHAR(255),
users INT,
   created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0,
 FOREIGN KEY (users) REFERENCES users(users_id)
  
);
CREATE TABLE appointment (
  appointment_id SERIAL PRIMARY KEY,
date VARCHAR(255),
time VARCHAR(255),
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE schedule (
  schedule_id SERIAL PRIMARY KEY,
 date  VARCHAR(255),
 timeFrom VARCHAR(255),
 timeTo VARCHAR(255),
users INT,
appointment INT,
    is_deleted SMALLINT DEFAULT 0,
 FOREIGN KEY (users) REFERENCES users(users_id),
   FOREIGN KEY (appointment) REFERENCES appointment(appointment_id)

);

