import { promises } from "node:dns";
import {AddProduct, BrowseProduct, addProductFlow, addVariantFlow} from "./ProductManager";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

export const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        readline.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}

menuProductManager();


export function menuProductManager(): void{
    console.log("====== Product Management System ======");
    console.log("1. Browse Product");
    console.log("2. Add Product");
    console.log("3. Add Variant For Product");
    console.log("4. Edit Product");
    console.log("5. Edit Variant");
    console.log("6. Add Quantity");
    console.log("7. Subtract Quantity");
    console.log("0. Exit");

    askQuestion("Please select an option: ").then((option: string) => {
        switch(option){
            case "0":
                console.log("Exiting...");
                readline.close();
                return;
            case "1":
                BrowseProduct();
                askQuestion("Press Enter to return...").then(() => {
                    menuProductManager();
                });
                break;
            case "2":
                addProductFlow();
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "6":
                break;
            default:
                console.log("Invalid option. Please try again.");
                menuProductManager();
                break;
        }

    });

}