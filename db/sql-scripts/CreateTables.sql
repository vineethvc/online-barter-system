CREATE TABLE user (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    PRIMARY KEY (email)
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_description VARCHAR(255),
    cat_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE advert (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    posted_by VARCHAR(255) NOT NULL,
    action INT NOT NULL,
    quantity INT NOT NULL,
    image_url VARCHAR(255),
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE action (
    action_id INT NOT NULL AUTO_INCREMENT,
    action_name VARCHAR(255) NOT NULL,
    action_description VARCHAR(255),
    PRIMARY KEY (action_id)
);

ALTER TABLE advert ADD CONSTRAINT FK_adv_prod FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE advert ADD CONSTRAINT FK_adv_action FOREIGN KEY (action) REFERENCES action(action_id); 
ALTER TABLE advert ADD CONSTRAINT FK_advuser FOREIGN KEY (posted_by) REFERENCES user(email); 

CREATE TABLE transaction (
    transaction_id INT NOT NULL AUTO_INCREMENT,
    responded_by VARCHAR(255) NOT NULL,
    action_id INT NOT NULL,
    advert_id INT NOT NULL, 
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (transaction_id)
);


ALTER TABLE transaction ADD CONSTRAINT FK_tran_adv FOREIGN KEY (advert_id) REFERENCES advert(id);
ALTER TABLE transaction ADD CONSTRAINT FK_tran_action FOREIGN KEY (action_id) REFERENCES action(action_id); 
ALTER TABLE transaction ADD CONSTRAINT FK_tran_user FOREIGN KEY (responded_by) REFERENCES user(email); 

CREATE TABLE wishlist (
    wishlist_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    advert_id INT NOT NULL,
    PRIMARY KEY (wishlist_id)
);


ALTER TABLE wishlist ADD CONSTRAINT FK_wish_adv FOREIGN KEY (advert_id) REFERENCES advert(id);
ALTER TABLE wishlist ADD CONSTRAINT FK_wish_user FOREIGN KEY (user_id) REFERENCES user(email);