import { loadJSON, saveJSON } from "./JsonManager";
import { askQuestion, PressEnterToContinue, closeReadline } from "./AppManager";
import { addCustomer } from "./CustomerManager";


const customerFile = "customer.json";
const productFile = "product.json";
const orderFile = "orders.json";
const billFile = "bills.json";
const staffFile = "staffs.json";
const customers = loadJSON(customerFile);
const product = loadJSON(productFile);
const orders = loadJSON(orderFile);
const bills = loadJSON(billFile);
const staffs = loadJSON(staffFile);
function getNameByCustomerId(customerId: number): string{
    const customer = customers.find((customer: any) => customer.id === customerId);
    return customer.name;
}
function getPhoneByCustomerId(customerId: number): string{
    const customer = customers.find((customer: any) => customer.id === customerId);
    return customer.phone;
}
function getProductById(productId: number): object{
    const productItem = product.find((product: any) => product.id === productId);
    return productItem;
}
function getNameByStaffId(staffId: number): string{
    const staff = staffs.find((staff: any) => staff.id === staffId);
    return staff.name;
}
function BrowseBills(): void{
    console.log("\n\n====== Bill List ======\n");
    bills.forEach((bill: any) => {
        console.log(` - Bill ID  : ${bill.id}`);
        const customerName = getNameByCustomerId(bill.customer_id);
        console.log(` - Customer Name  : ${customerName}`);
        const customerPhone = getPhoneByCustomerId(bill.customer_id);
        console.log(` - Phone  : ${customerPhone}`);
        const staffName = getNameByStaffId(bill.staff_id);
        console.log(` - Salesperson  : ${staffName}`);
        console.log("   ------------------------------   ");
        for(let indexItemBill: number =0; indexItemBill < bill.items.length; indexItemBill++){
            const productItem: any = getProductById(bill.items[indexItemBill].product_id);
            const productVariant = productItem.variant.find((variant: any) => variant.id === bill.items[indexItemBill].variant_id);
            console.log(`     Product Name : ${productItem.name}`);
            console.log(`     Size : ${productVariant.size}`);
            console.log(`     Color : ${productVariant.color}`);
            console.log(`     Quantity : ${bill.items[indexItemBill].quantity}`);
            console.log(`     Price : ${productVariant.price}`);
        }
        console.log("   ------------------------------   ");
        console.log(` - Total Price  : ${bill.total_price}`);
        console.log(` - Pay Method  : ${bill.pay_method}`);
        console.log(` Create At  : ${bill.create_at}`);
    });
}

export async function createBill(orderId: number): Promise<void>{
    if(isNaN(orderId)){
        //do something
    } else {
        //do something
    }
}

export async function menuSaleManager(): Promise<void>{
    console.log("====== Sale Interface ======");
    console.log("1. Browse Orders");
    console.log("2. Browse Bills");
    console.log("3. Add customer");
    console.log("4. Create Bill");
    console.log("0. Exit");
    const option: string = await askQuestion("Please select an option: ");
    await handleSaleManager(option);
}
export async function menuBrowseOrders(): Promise<void>{
    console.log("====== Browse Orders ======");
    console.log("1. By Day");
    console.log("2. By Month");
    console.log("3. By Year");
    console.log("0. Exit");
    const option: string = await askQuestion("Please select an option: ");
    switch(option){
        case "0":
            console.log("Exiting...");
            handleSaleManager("1");
            return;
        case "1":

            console.log("Browsing Orders by Day...");
            break;
        case "2":
            console.log("Browsing Orders by Month...");
            break;
        case "3":
            console.log("Browsing Orders by Year...");
            break;
        default:
            console.log("Invalid option. Please try again.");
            break;
        
    }
}
export async function BrowseOrder(): Promise<void>{
    let checkHaveOrder: boolean = false;
    console.log("\n\n====== Order List ======");
    for( let indexOrder: number = 0; indexOrder < orders.length; indexOrder++) {
        if(orders[indexOrder].status === "order"){
            checkHaveOrder = true;
            console.log("------------------------------------");
            console.log(` - Order ID  : ${orders[indexOrder].id}`);
            console.log(` - Customer ID  : ${orders[indexOrder].customer_id}`);
            const customerName = getNameByCustomerId(orders[indexOrder].customer_id);
            console.log(` - Customer Name  : ${customerName}`);
            for(let indexItemOrder: number = 0; indexItemOrder < orders[indexOrder].items.length; indexItemOrder++){
                const productItem: any = getProductById(orders[indexOrder].items[indexItemOrder].product_id);
                const productVariant = productItem.variant.find((variant: any) => variant.id === orders[indexOrder].items[indexItemOrder].variant_id);
                console.log(`     Product Name : ${productItem.name}`);
                console.log(`     Size : ${productVariant.size}`);
                console.log(`     Color : ${productVariant.color}`);
                console.log(`     Quantity : ${orders[indexOrder].items[indexItemOrder].quantity}`);
                console.log(`     Price : ${productVariant.price}`);
            }
            console.log("------------------------------------");
            console.log(` - Total Price  : ${orders[indexOrder].total_price}`);
            console.log(` Create At  : ${orders[indexOrder].create_at}`);
        }
    }
}
export async function handleSaleManager(option: string): Promise<void>{
    switch(option){
        case "0":
            console.log("Exiting...");
            closeReadline();
            return;
        case "1":
            BrowseOrder();
            PressEnterToContinue(menuSaleManager);
            break;
        case "2":
            console.log("Browsing Bills...");
            BrowseBills();
            PressEnterToContinue(menuSaleManager);
            break;
        case "3":
            await addCustomer();
            console.log("Adding customer...");
            await PressEnterToContinue(menuSaleManager);
            break;
        case "4":
            console.log("Creating Order...");
            break;
        default:
            console.log("Invalid option. Please try again.");
            await menuSaleManager();
            break;
        
    }
}