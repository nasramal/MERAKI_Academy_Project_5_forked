CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE permission (
    permission_id SERIAL PRIMARY KEY,
    permission VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE role_permission (
    id SERIAL PRIMARY KEY,
    role_id INT,
    permission_id INT,
    
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (permission_id) REFERENCES permission(permission_id)
);