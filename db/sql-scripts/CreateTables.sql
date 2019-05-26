CREATE TABLE user (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    PRIMARY KEY (email)
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_description VARCHAR(255),
    cat_id INT NOT NULL,
    PRIMARY KEY (id)
);


