import { promises } from "node:dns";
import { menuProductManager} from "./ProductManager";
import { menuSaleManager } from "./SaleManager";
import { addCustomer } from "./CustomerManager";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

export function closeReadline(){
    readline.close();
}
export const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        readline.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}
menuSaleManager();
export function PressEnterToContinue(functionToCall: () => void): Promise<void>{
    return askQuestion("Press Enter to continue...").then(() => {
        functionToCall();
    });
}

