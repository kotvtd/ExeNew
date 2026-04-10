import { loadJSON, saveJSON } from "./JsonManager";
import { askQuestion, PressEnterToContinue, closeReadline } from "./AppManager";

const productFile = "product.json";
const product = loadJSON(productFile);

export async function addVariantFlow(productID: number): Promise<void>{
    const size:string = await askQuestion("Enter variant size: ");
    const color: string = await askQuestion("Enter variant color: ");
    const price: string = await askQuestion("Enter variant price: ");
    const cost_price: string = await askQuestion("Enter variant cost price: ");
    const stock: string = await askQuestion("Enter variant stock: ");
    AddVarProduct(productID, size, color, Number(price), Number(cost_price), Number(stock));
    console.log("Variant added.");
    askQuestion("Press Enter to return...").then(() => {
        menuProductManager();
    });
}

export async function addProductFlow(): Promise<void>{
    const name: string = await askQuestion("Enter product name: ");
    const category: string = await askQuestion("Enter product category: ");
    let productNew = AddProduct(name, category);
    console.log(`Product added: ${productNew.id}`);
    await addVariantFlow(productNew.id);
}



export interface Variant {
    id: number;
    size: string;
    color: string;
    price: number;
    cost_price: number;
    stock: number;
}
export interface Product {
    id: number;
    name: string;
    category: string;
    variant: Variant[];
}
export function BrowseProduct(): void{
    console.log("\n\n====== Product List ======");
    for (let indexProduct = 0; indexProduct < product.length; indexProduct++) {
        console.log(`\n\n📦 Product ${indexProduct + 1}: `);
        console.log(` - Name     : ${product[indexProduct].name}`);
        console.log(` - Category : ${product[indexProduct].category}`);
        for (let indexVariant = 0; indexVariant < product[indexProduct].variant.length; indexVariant++) {
            console.log("------------------------------------");
            console.log(`     Size  : ${product[indexProduct].variant[indexVariant].size}`);
            console.log(`     Color : ${product[indexProduct].variant[indexVariant].color}`);
            console.log(`     Price : ${product[indexProduct].variant[indexVariant].price}`);
            console.log(`     Stock : ${product[indexProduct].variant[indexVariant].stock}`);
        }
            console.log("------------------------------------");
    }
}
export function AddProduct(name: string, category: string): Product{
    let productNew: Product = {
        "id": product.length > 0 ? product[product.length - 1].id + 1 : 1,
        "name": name,
        "category": category,
        "variant": []
    };
    product.push(productNew);
    saveJSON(productFile, product);
    return productNew;
}
export function AddVarProduct(productId: number, size: string, color: string, 
    price: number, cost_price: number, stock: number): void{
    const product_temp = product.find((p: Product) => p.id === productId);
    if(!product_temp){
        console.log("Product not found");
        return;
    }
    const variantNew: Variant = {
        id: product_temp.variant.length > 0
            ? product_temp.variant[product_temp.variant.length - 1].id + 1
            : product_temp.id * 10000 + 1,
        "size": size,
        "color": color,
        "price": price,
        "cost_price": cost_price,
        "stock": stock
    };
    product_temp.variant.push(variantNew);
    saveJSON(productFile, product);
}


export async function EditProduct(productId: number): Promise<void>{
    const product_temp = product.find((p: Product) => p.id === productId);
    if(!product_temp){
        console.log("Product not found");
        askQuestion("Press Enter to return...").then(() => {
            handleProductManager("4");
        });
        return;
    }
    const productNameEdit: string = await askQuestion("Enter new product name : ");
    const productCategoryEdit: string = await askQuestion("Enter new product category : ");
    product_temp.name = productNameEdit;
    product_temp.category = productCategoryEdit;
    saveJSON(productFile, product);
}
export async function EditVarProduct(productId: number, variantId: number): Promise<void>{
        const product_temp = product.find((p: Product) => p.id === productId);
        if(!product_temp){
            console.log("Product not found");
            askQuestion("Press Enter to return...").then(() => {
                handleProductManager("5");
            });
            return;
        }
        const variant_temp = product_temp.variant.find((v: Variant) => v.id === variantId);
        if(!variant_temp){
            console.log("Variant not found");
            handleProductManager("5");
            return;
        }
        const size: string = await askQuestion("Enter new variant size : ");
        const color: string = await askQuestion("Enter new variant color : ");
        const price: string = await askQuestion("Enter new variant price : ");
        const cost_price: string = await askQuestion("Enter new variant cost price : ");
        const stock: string = await askQuestion("Enter new variant stock : ");
        variant_temp.size = size;
        variant_temp.color = color;
        variant_temp.price = price;
        variant_temp.cost_price = cost_price;
        variant_temp.stock = stock;
        saveJSON(productFile, product);
}
export function AddQuantity(productId: number, variantId: number, quantity: number): void{
    const product_temp = product.find((p: Product) => p.id === productId);
    if(!product_temp){
        console.log("Product not found");
        return;
    }
    const variant_temp = product_temp.variant.find((v: Variant) => v.id === variantId);
    if(!variant_temp){
        console.log("Variant not found");
        return;
    }
    variant_temp.stock += quantity;
    saveJSON(productFile, product);
}
export function SubQuantity(productId: number, variantId: number, quantity: number): void{
    const product_temp = product.find((p: Product) => p.id === productId);
    if(!product_temp){
        console.log("Product not found");
        return;
    }
    const variant_temp = product_temp.variant.find((v: Variant) => v.id === variantId);
    if(!variant_temp){
        console.log("Variant not found");
        return;
    }
    variant_temp.stock -= quantity;
    if(variant_temp.stock < 0){
        console.log("Stock cannot be negative");
    }
    else{
        saveJSON(productFile, product);
    }
}
export async function LoadProduct(): Promise<Product[]>{
    const response = await fetch(productFile);
    const data = await response.json();
    return data ;
}
export async function renderProducts() {
    const products = await LoadProduct();

    const list = document.getElementById("product-list") as HTMLUListElement;

    list.innerHTML = "";

    products.forEach((product: Product) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <b>${product.name}</b> (${product.category})
            <ul>
                ${product.variant.map(v => `
                    <li>
                        Size: ${v.size} - 
                        Color: ${v.color} - 
                        Price: ${v.price} - 
                        Stock: ${v.stock}
                    </li>
                `).join("")}
            </ul>
        `;

        list.appendChild(li);
    });
}

export async function menuProductManager(): Promise<void>{
    console.log("====== Product Management System ======");
    console.log("1. Browse Product");
    console.log("2. Add Product");
    console.log("3. Add Variant For Product");
    console.log("4. Edit Product");
    console.log("5. Edit Variant");
    console.log("6. Add Quantity");
    console.log("7. Subtract Quantity");
    console.log("0. Exit");
    const option: string = await askQuestion("Please select an option: ");
    handleProductManager(option);

}

export async function handleProductManager(option: string): Promise<void>{
    let productID: string = "";
    switch(option){
        case "0":
                console.log("Exiting...");
                closeReadline();
                return;
                break
        case "1":
            BrowseProduct();
            PressEnterToContinue(menuProductManager);
            break;
        case "2":
            addProductFlow();
            PressEnterToContinue(menuProductManager);
            break;
        case "3":
             productID = await askQuestion("Enter product ID to add variant: ");
            if(isNaN(Number(productID)) || productID === ""){
                console.log("Invalid product ID. Please try again.");
                handleProductManager("3");
                return;
            }
            addVariantFlow(Number(productID));
            break;
        case "4":
            productID = await askQuestion("Enter product ID to edit: ");
            if(isNaN(Number(productID)) || productID === ""){
                console.log("Invalid product ID. Please try again.");
                handleProductManager("4");
                return;
            }
            EditProduct(Number(productID));
            PressEnterToContinue(menuProductManager);
            break;
        case "5":
            productID = await askQuestion("Enter product ID to edit variant: ");
            if(isNaN(Number(productID)) || productID === ""){
                console.log("Invalid product ID. Please try again.");
                handleProductManager("5");
                return;
            }
            const variantID = await askQuestion("Enter variant ID to edit: ");
            if(isNaN(Number(variantID)) || variantID === ""){
                console.log("Invalid variant ID. Please try again.");
                handleProductManager("5");
                return;
            }
            EditVarProduct(Number(productID), Number(variantID));
            PressEnterToContinue(menuProductManager);
            break;
        case "6":
            productID = await askQuestion("Enter product ID to add quantity: ");
            if(isNaN(Number(productID)) || productID === ""){
                console.log("Invalid product ID. Please try again.");
                handleProductManager("6");
                return;
            }
            const variantIDAdd = await askQuestion("Enter variant ID to add quantity: ");
            if(isNaN(Number(variantIDAdd)) || variantIDAdd === ""){
                console.log("Invalid variant ID. Please try again.");
                handleProductManager("6");
                return;
            }
            const quantityAdd = await askQuestion("Enter quantity to add: ");
            if(isNaN(Number(quantityAdd)) || quantityAdd === ""){
                console.log("Invalid quantity. Please try again.");
                handleProductManager("6");
                return;
            }
            AddQuantity(Number(productID), Number(variantIDAdd), Number(quantityAdd));
            PressEnterToContinue(menuProductManager);
            break;
        default:
            console.log("Invalid option. Please try again.");
            menuProductManager();
            break;
    }
}