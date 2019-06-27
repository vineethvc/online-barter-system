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

CREATE TABLE advert (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    posted_by VARCHAR(255) NOT NULL,
    action INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE action (
    action_id INT NOT NULL AUTO_INCREMENT,
    action_name VARCHAR(255) NOT NULL,
    action_description VARCHAR(255),
    PRIMARY KEY (action_id)
);

CREATE TABLE review (
    id INT NOT NULL AUTO_INCREMENT,
    review_advert_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE barter (
    id INT NOT NULL AUTO_INCREMENT,
    barter_adv_id INT NOT NULL,
    barterer VARCHAR(255) NOT NULL,
    barteree VARCHAR(255) NOT NULL,
    barter_status VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE advert ADD CONSTRAINT FK_adv_prod FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE advert ADD CONSTRAINT FK_adv_action FOREIGN KEY (action) REFERENCES action(action_id); 
ALTER TABLE advert ADD CONSTRAINT FK_advuser FOREIGN KEY (posted_by) REFERENCES user(email); 
ALTER TABLE review ADD CONSTRAINT FK_revadv FOREIGN KEY (review_advert_id) REFERENCES advert(id);
ALTER TABLE review ADD CONSTRAINT FK_revuser FOREIGN KEY (email) REFERENCES user(email);
ALTER TABLE barter ADD CONSTRAINT FK_barteruser FOREIGN KEY (barterer) REFERENCES user(email);
ALTER TABLE barter ADD CONSTRAINT FK_barter_ad_id FOREIGN KEY (barter_adv_id) REFERENCES advert(id);