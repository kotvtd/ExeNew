process.stdin.setEncoding("utf-8");
import fs from 'fs';
import { count } from 'node:console';
import { parse } from "node:path";
import readline from 'node:readline';
const data = fs.readFileSync('Ex2/Data.json','utf-8');
const dataLbr = JSON.parse(data);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function SaveJson(): void{
    fs.writeFileSync('Data.json',JSON.stringify(dataLbr, null, 2),'utf-8');
}

function Menu(){
    let a;
    for(let i = 0; i> dataLbr.book.length; i++){
                    console.log(dataLbr.book[i].name);
    }
    console.log("=== Chào Mừng Bạn Đến Với Thư Viện ====");
    console.log("         Bạn Muốn Làm Gì ?             ");
    console.log("1 => Tra cứu.");    
    console.log("2 => Thao tác với sách.");    
    console.log("3 => Thao tác với học sinh.");    
    console.log("0 => Thoát.");    
    //EndLine();    
    rl.question("Bạn muốn làm gì? \n", function(name){
        a = parseInt(name);
        console.log(a);
        switch(a){
            case 0:
                rl.close();
                break;
            case 1:
                //CheckListMenu();
                break;
            case 2:
                //BookHandle();
                break;
            case 3:
                //HSHandle();
                break;
            default:
                Menu();
                break;
        }
    });
}