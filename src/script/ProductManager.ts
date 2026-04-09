import { loadJSON, saveJSON } from "./JsonManager";
import { askQuestion, menuProductManager } from "./AppManager";

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



interface Variant {
    id: number;
    size: string;
    color: string;
    price: number;
    cost_price: number;
    stock: number;
}
interface Product {
    id: number;
    name: string;
    category: string;
    variant: Variant[];
}
export function BrowseProduct(): void{
    console.log("\n\n====== Product List ======");
    for (let i = 0; i < product.length; i++) {
        console.log(`\n\n📦 Product ${i + 1}: `);
        console.log(` - Name     : ${product[i].name}`);
        console.log(` - Category : ${product[i].category}`);
        for (let j = 0; j < product[i].variant.length; j++) {
            console.log("------------------------------------");
            console.log(`     Size  : ${product[i].variant[j].size}`);
            console.log(`     Color : ${product[i].variant[j].color}`);
            console.log(`     Price : ${product[i].variant[j].price}`);
            console.log(`     Stock : ${product[i].variant[j].stock}`);
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
export function EditProduct(productId: number, name: string, category: string): void{
    const product_temp = product.find((p: Product) => p.id === productId);
    if(!product_temp){
        console.log("Product not found");
        return;
    }
    product_temp.name = name;
    product_temp.category = category;
    saveJSON(productFile, product);
}
export function EditVarProduct(productId: number, variantId: number, size: string,
    color: string, price: number, cost_price: number, stock: number): void{
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

    list.innerHTML = ""; // xóa dữ liệu cũ

    products.forEach((product: Product) => {
        const li = document.createElement("li");

        // thông tin product
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