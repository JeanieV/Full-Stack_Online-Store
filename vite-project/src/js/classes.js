import { supabase } from "../../supabase";

// -------------
// Product class (Stoneware, Porcelain, Ceramic and Tools)
// -------------

export class Product {
    constructor(product_id, name, description, barcode, price, image, category) {
        this._product_id = product_id;
        this._name = name;
        this._description = description;
        this._barcode = barcode;
        this._price = price;
        this._image = image;
        this._category = category;
    }

    // Getters
    get getProductId() {
        return this._product_id;
    }
    get getName() {
        return this._name;
    }
    get getDescription() {
        return this._description;
    }
    get getBarcode() {
        return this._barcode;
    }
    get getPrice() {
        return this._price;
    }
    get getImage() {
        return this._image;
    }
    get getCategory() {
        return this._category;
    }

    static async fetchAll(tableName) {
        try {
            const { data, error } = await supabase.from(tableName).select();
            if (error) {
                throw error;
            }
    
            // Process the data as needed
            // Create an array of Product instances from the fetched data
            return data.map((productData) => {
                return new Product(
                    productData.product_id,
                    productData.name,
                    productData.description,
                    productData.barcode,
                    productData.price,
                    productData.image,
                    tableName
                );
            });
        } catch (error) {
            throw error;
        }
    }
}

// -------------
// Contact Class
// -------------

export class Contact {
    constructor(name, email, phoneNumber, questionType, message) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.questionType = questionType;
        this.message = message;
    }

    // Getters
    get getName() {
        return this.name;
    }
    get getEmail() {
        return this.email;
    }
    get getPhoneNumber() {
        return this.phoneNumber;
    }
    get getQuestionType() {
        return this.questionType;
    }
    get getMessage() {
        return this.message;
    }
}


// -------------
// User Class
// -------------

export class User {
    constructor(username, fullname, address, password, email, phoneNumber) {
        this.username = username;
        this.fullname = fullname;
        this.address = address;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    // Getters
    get getUsername() {
        return this.username;
    }
    get getFullName() {
        return this.fullname;
    }
    get getAddress() {
        return this.address;
    }
    get getPassword() {
        return this.password;
    }
    get getEmail() {
        return this.email;
    }
    get getPhoneNumber() {
        return this.phoneNumber;
    }

    static async fetchAll() {
        // Replace this with your Supabase query to fetch products
        const { data, error } = await supabase.from("users").select();

        if (error) {
            throw error;
        }

        // Create an array of Products instances from the fetched data
        return data.map((productData) => {
            return new User(
                productData.username,
                productData.fullname,
                productData.address,
                productData.password,
                productData.email,
                productData.phoneNumber
            );
        });
    }
}

// -------------
// CartEntry Class
// -------------

export class CartEntry {
    constructor(user_id, product_category, product_id, quantity, totalPrice) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.product_category = product_category;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    // Getters
    get getUserId() {
        return this.user_id;
    }
    get getProductId() {
        return this.product_id;
    }
    get getCategory() {
        return this.product_category;
    }
    get getQuantity() {
        return this.quantity;
    }
    get getTotalPrice() {
        return this.totalPrice;
    }
}


