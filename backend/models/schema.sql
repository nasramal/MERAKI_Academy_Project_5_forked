CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
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
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);
CREATE TABLE specialty  (
 specialty_id SERIAL PRIMARY KEY,
specialty  VARCHAR(255),
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE info (
  id SERIAL PRIMARY KEY,
diagnosis VARCHAR(255),
users INT,
provider INT,
appointment INT,
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0,
FOREIGN KEY (appointment) REFERENCES appointment(appointment_id),
    FOREIGN KEY (users) REFERENCES users(id),
    FOREIGN KEY (provider) REFERENCES provider(provider_id)
);
CREATE TABLE notification (
  notification_id SERIAL PRIMARY KEY,
 notification  VARCHAR(255),
users INT,
provider INT,
   created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0,
 FOREIGN KEY (users) REFERENCES users(id),
    FOREIGN KEY (provider) REFERENCES provider(provider_id)
);
CREATE TABLE provider(
provider_id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
phone INT,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255),
location VARCHAR(255),
workingHours VARCHAR(255),
insurance VARCHAR(255),
specialty INT,
appointment INT,
category INT,
role_id INT,
 created_at TIMESTAMP,
is_deleted SMALLINT DEFAULT 0,
 FOREIGN KEY (specialty) REFERENCES specialty(specialty_id),
FOREIGN KEY (appointment) REFERENCES appointment(appointment_id),
FOREIGN KEY (category) REFERENCES category(category_id),
FOREIGN KEY (role_id) REFERENCES roles(id),
 PRIMARY KEY (id)
);
CREATE TABLE users (
  id SERIAL NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  age INT,
phone INT,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (id)
);
CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
comments  VARCHAR(255),
users INT,
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (users) REFERENCES users(id),
);
CREATE TABLE category (
 category_id SERIAL PRIMARY KEY,
category  VARCHAR(255),
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE appointment (
  appointment_id SERIAL PRIMARY KEY,
date DATE,
medications VARCHAR(255),
medicalHistory VARCHAR(255),
notes VARCHAR(255),
users INT,
    created_at TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0,
FOREIGN KEY (users) REFERENCES users(id)
);
CREATE TABLE provider_review(
id SERIAL PRIMARY KEY,
    provider_id INT,
    review_id INT,
  FOREIGN KEY (provider_id) REFERENCES provider(provider_id),
    FOREIGN KEY (review_id) REFERENCES review(review_id)
);