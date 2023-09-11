import { supabase } from "../../supabase";

export class Stoneware {
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
        const { data, error } = await supabase.from("stoneware").select();

        if (error) {
            throw error;
        }

        // Create an array of Products instances from the fetched data
        return data.map((productData) => {
            return new Stoneware(
                productData.name,
                productData.description,
                productData.barcode,
                productData.price,
                productData.image
            );
        });
    }
}

export function filterStonewareByCategory(category) {
    return data.stoneware.filter((stoneware) => stoneware.category === category);
}


export class Porcelain {
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
        const { data, error } = await supabase.from("porcelain").select();

        if (error) {
            throw error;
        }

        // Create an array of Products instances from the fetched data
        return data.map((productData) => {
            return new Porcelain(
                productData.name,
                productData.description,
                productData.barcode,
                productData.price,
                productData.image
            );
        });
    }
}

export function filterPorcelainByCategory(category) {
    return data.porcelain.filter((porcelain) => porcelain.category === category);
}


export class Ceramic {
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
        const { data, error } = await supabase.from("ceramic").select();

        if (error) {
            throw error;
        }

        // Create an array of Products instances from the fetched data
        return data.map((productData) => {
            return new Ceramic(
                productData.name,
                productData.description,
                productData.barcode,
                productData.price,
                productData.image
            );
        });
    }
}

export function filterCeramicByCategory(category) {
    return data.ceramic.filter((ceramic) => ceramic.category === category);
}