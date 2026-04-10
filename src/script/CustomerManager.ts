import { loadJSON, saveJSON } from "./JsonManager";
import { askQuestion, PressEnterToContinue, closeReadline } from "./AppManager";
import { menuSaleManager } from "./SaleManager";


const customerFile = "customer.json";
const customers = loadJSON(customerFile);

export interface Customer {
    id: number;
    name: string;
    phone: string;
    total_spent: number;
}

export async function addCustomer(): Promise<void>{
    const phoneNumber: string = await askQuestion("Enter phone number: ");
    customers.forEach((customer: any) => {
        if(customer.phone === phoneNumber){
            console.log("Customer already exists.");
            PressEnterToContinue(addCustomer);
            return;
        }
    });
    const name: string = await askQuestion("Enter name: ");
    const newCustomer: Customer = {
        id: customers.length + 1,
        name: name,
        phone: phoneNumber,
        total_spent: 0
    }
    customers.push(newCustomer);
    saveJSON(customerFile, customers);
    console.log("Customer added successfully.");
}