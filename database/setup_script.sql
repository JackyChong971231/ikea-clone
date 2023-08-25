CREATE TABLE Country (
	country_id INT AUTO_INCREMENT PRIMARY KEY,
	country_name VARCHAR(255) NOT NULL
);

CREATE TABLE Address_Type (
	address_type_id INT AUTO_INCREMENT PRIMARY KEY,
	type_name VARCHAR(50) NOT NULL
);

CREATE TABLE Address (
	address_id INT AUTO_INCREMENT PRIMARY KEY,
	address_type_id INT NOT NULL,
	FOREIGN KEY (address_type_id) REFERENCES Address_Type(address_type_id),
	unit_no VARCHAR(10),
	street_address VARCHAR(255) NOT NULL,
	city VARCHAR(100) NOT NULL,
	province VARCHAR(100) NOT NULL,
	postal_code VARCHAR(20) NOT NULL,
	country_id INT NOT NULL,
	FOREIGN KEY (country_id) REFERENCES Country(country_id)
);

CREATE TABLE Store_Type (
	store_type_id INT AUTO_INCREMENT PRIMARY KEY,
	type_name VARCHAR(50) NOT NULL
);

CREATE TABLE Store (
	store_id INT AUTO_INCREMENT PRIMARY KEY,
	display_name VARCHAR(50) NOT NULL,
	address_id INT NOT NULL,
	FOREIGN KEY (address_id) REFERENCES Address(address_id),
	store_type_id INT NOT NULL,
	FOREIGN KEY (store_type_id) REFERENCES Store_Type(store_type_id)
);

CREATE TABLE Consent_Type (
	consent_type_id INT AUTO_INCREMENT PRIMARY KEY,
	type_name VARCHAR(20) NOT NULL
);

CREATE TABLE Consent (
	consent_id INT AUTO_INCREMENT PRIMARY KEY,
	consent_type_id INT NOT NULL,
	FOREIGN KEY (consent_type_id) REFERENCES Consent_Type(consent_type_id),
	description TEXT
);

CREATE TABLE Membership (
	membership_id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	date_of_birth DATE,
	phone VARCHAR(20),
	email VARCHAR(100) NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	preferred_store_id INT NOT NULL,
	FOREIGN KEY (preferred_store_id) REFERENCES Store(store_id),
	promotion_consent_id INT NOT NULL,
	FOREIGN KEY (promotion_consent_id) REFERENCES Consent(consent_id),
	is_read_consent_id_0 BOOLEAN NOT NULL
);

CREATE TABLE Membership_Address (
	id INT AUTO_INCREMENT PRIMARY KEY,
	membership_id INT NOT NULL,
	FOREIGN KEY (membership_id) REFERENCES Membership(membership_id),
	address_id INT NOT NULL,
	FOREIGN KEY (address_id) REFERENCES Address(address_id),
	is_default BOOLEAN
);

CREATE TABLE Payment_Method (
	payment_method_id INT AUTO_INCREMENT PRIMARY KEY,
	membership_id INT NOT NULL,
	FOREIGN KEY (membership_id) REFERENCES Membership(membership_id),
	account_number VARCHAR(16) NOT NULL,
	expiry_date DATE NOT NULL,
	security_code VARCHAR(3),
	billing_address_id INT NOT NULL,
	FOREIGN KEY (billing_address_id) REFERENCES Address(address_id),
	is_default BOOLEAN 
);

CREATE TABLE Order_Status (
	order_status_id INT AUTO_INCREMENT PRIMARY KEY,
	status_name VARCHAR(20) NOT NULL
);

CREATE TABLE Orders (
	order_id INT AUTO_INCREMENT PRIMARY KEY,
	order_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
	payment_method_id INT NOT NULL,
	FOREIGN KEY (payment_method_id) REFERENCES Payment_Method(payment_method_id),
	shipping_address_id INT NOT NULL,
	FOREIGN KEY (shipping_address_id) REFERENCES Address(address_id),
	order_total DECIMAL(10, 2) NOT NULL,
	order_status_id INT NOT NULL,
	FOREIGN KEY (order_status_id) REFERENCES Order_Status(order_status_id)
);

CREATE TABLE Cart (
	cart_id INT AUTO_INCREMENT PRIMARY KEY,
	membership_id INT NOT NULL,
	FOREIGN KEY (membership_id) REFERENCES Membership(membership_id)
);

CREATE TABLE Wishlist (
	wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
	wishlist_name VARCHAR(50) NOT NULL,
	membership_id INT NOT NULL,
	FOREIGN KEY (membership_id) REFERENCES Membership(membership_id)
);

CREATE TABLE Brand (
	brand_id INT AUTO_INCREMENT PRIMARY KEY,
	brand_name VARCHAR(100) NOT NULL
);
	
CREATE TABLE Variation_Option (
	variation_option_id INT AUTO_INCREMENT PRIMARY KEY,
	option_name VARCHAR(50) NOT NULL
);

CREATE TABLE Variation_Value (
	variation_value_id INT AUTO_INCREMENT PRIMARY KEY,
	variation_option_id INT NOT NULL,
	FOREIGN KEY (variation_option_id) REFERENCES Variation_Option(variation_option_id),
	value VARCHAR(50) NOT NULL
);

CREATE TABLE Product_Category (
	product_category_id INT AUTO_INCREMENT PRIMARY KEY,
	category_name VARCHAR(100) NOT NULL,
	parent_product_category_id INT
);

ALTER TABLE Product_Category
ADD FOREIGN KEY (parent_product_category_id) REFERENCES Product_Category(product_category_id);

CREATE TABLE Promotion (
	promotion_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	discount_rate DECIMAL(5, 2) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL
);

CREATE TABLE Product (
	product_id INT AUTO_INCREMENT PRIMARY KEY,
	product_category_id INT NOT NULL,
	FOREIGN KEY (product_category_id) REFERENCES Product_Category(product_category_id),
	brand_id INT NOT NULL,
	FOREIGN KEY (brand_id) REFERENCES Brand(brand_id),
	description VARCHAR(100) NOT NULL,
	parent_product_id INT,
	is_for_sale BOOLEAN NOT NULL,
	promotion_id INT NOT NULL,
	FOREIGN KEY (promotion_id) REFERENCES Promotion(promotion_id)
);

ALTER TABLE Product
ADD FOREIGN KEY (parent_product_id) REFERENCES Product(product_id);

CREATE TABLE Barcode (
	barcode_id INT AUTO_INCREMENT PRIMARY KEY,
	product_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES Product(product_id),
	variation_1_value_id INT,
	FOREIGN KEY (variation_1_value_id) REFERENCES Variation_Value(variation_value_id),
	variation_2_value_id INT,
	FOREIGN KEY (variation_2_value_id) REFERENCES Variation_Value(variation_value_id),
	variation_3_value_id INT,
	FOREIGN KEY (variation_3_value_id) REFERENCES Variation_Value(variation_value_id),
	variation_4_value_id INT,
	FOREIGN KEY (variation_4_value_id) REFERENCES Variation_Value(variation_value_id),
	variation_5_value_id INT,
	FOREIGN KEY (variation_5_value_id) REFERENCES Variation_Value(variation_value_id),
	product_image BLOB,
	room_image BLOB,
	width_cm DECIMAL(10, 2) NOT NULL,
	depth_cm DECIMAL(10, 2) NOT NULL,
	height_cm DECIMAL(10, 2) NOT NULL,
	weight_kg DECIMAL(10, 2) NOT NULL,
	original_price DECIMAL(10, 2)
);

CREATE TABLE Inventory (
	inventory_id INT AUTO_INCREMENT PRIMARY KEY,
	barcode_id INT NOT NULL,
	FOREIGN KEY (barcode_id) REFERENCES Barcode(barcode_id),
	store_id INT NOT NULL,
	FOREIGN KEY (store_id) REFERENCES Store(store_id),
	click_n_collect_quantity INT,
	store_quantity INT
);

CREATE TABLE Review (
	review_id INT AUTO_INCREMENT PRIMARY KEY,
	membership_id INT NOT NULL,
	FOREIGN KEY (membership_id) REFERENCES Membership(membership_id),
	product_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES Product(product_id),
	review_title VARCHAR(100) NOT NULL,
	assembly_rating INT NOT NULL,
	price_rating INT NOT NULL,
	quality_rating INT NOT NULL,
	outlook_rating INT NOT NULL,
	expectation_rating INT NOT NULL,
	comment TEXT,
	which_consent_id_accepted INT NOT NULL,
	FOREIGN KEY (which_consent_id_accepted) REFERENCES Consent(consent_id)
);

CREATE TABLE Orders_Item (
	id INT AUTO_INCREMENT PRIMARY KEY,
	order_id INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES Orders(order_id),
	barcode_id INT NOT NULL,
	FOREIGN KEY (barcode_id) REFERENCES Barcode(barcode_id),
	quantity INT NOT NULL
);

CREATE TABLE Cart_Item (
	id INT AUTO_INCREMENT PRIMARY KEY,
	cart_id INT NOT NULL,
	FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
	barcode_id INT NOT NULL,
	FOREIGN KEY (barcode_id) REFERENCES Barcode(barcode_id),
	quantity INT NOT NULL
);

CREATE TABLE Wishlist_Item (
	id INT AUTO_INCREMENT PRIMARY KEY,
	wishlist_id INT NOT NULL,
	FOREIGN KEY (wishlist_id) REFERENCES Wishlist(wishlist_id),
	barcode_id INT NOT NULL,
	FOREIGN KEY (barcode_id) REFERENCES Barcode(barcode_id),
	quantity INT NOT NULL
);
