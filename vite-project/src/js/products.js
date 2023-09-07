import { supabase } from "../../supabase";

export class Products {
    constructor(name, description, barcode, price, image) {
        this._name = name;
        this._description = description;
        this._barcode = barcode;
        this._price = price;
        this._image = image;
    }

    // Getters
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

    static async fetchAll() {
        // Replace this with your Supabase query to fetch products
        const { data, error } = await supabase.from("products").select();

        if (error) {
            throw error;
        }

        // Create an array of Products instances from the fetched data
        return data.map((productData) => {
            return new Products(
                productData.name,
                productData.description,
                productData.barcode,
                productData.price,
                productData.image
            );
        });
    }
}

export function filterProductsByCategory(category) {
    return data.products.filter((product) => product.category === category);
}