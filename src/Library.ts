process.stdin.setEncoding("utf-8");
import fs from 'fs';
import { count } from 'console';
import { parse } from 'node:path';
import readline from 'node:readline';
import { blob } from 'node:stream/consumers';
import { chownSync } from 'node:fs';
const data = fs.readFileSync('src/Data.json','utf-8');
const dataLbr = JSON.parse(data);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function SaveJson(){
    fs.writeFileSync('src/Data.json',JSON.stringify(dataLbr, null, 2),'utf-8');
}
function EndLine(){
    console.log("==============================");
    console.log("Bạn hãy nhập lựa chọn phù hợp:");
}

function NotTrue(fnc: () => void): void{
    rl.question("Lựa chọn không hợp lệ, Nhấn Enter để chọn lại!!", function(inputEnter: string){
        fnc();
    });
}
Menu();
function Menu(){
    let a: number;
    // for(let i: number = 0; i> dataLbr.book.length; i++){
    //                 console.log(dataLbr.book[i].name);
    // }
    console.log("=== Chào Mừng Bạn Đến Với Thư Viện ====");
    console.log("         Bạn Muốn Làm Gì ?             ");
    console.log("1 => Tra cứu.");    
    console.log("2 => Thao tác với sách.");    
    console.log("3 => Thao tác với học sinh.");    
    console.log("0 => Thoát.");    
    EndLine();    
    rl.question("Bạn muốn làm gì? \n", function(inputChoose){
        a = Number(inputChoose);
        if(!isNaN(a) && isNumber(a)){
            switch(a){
                case 0:
                    rl.close();
                    break;
                case 1:
                    CheckListMenu();
                    break;
                case 2:
                    BookHandle();
                    break;
                case 3:
                    HSHandle();
                    break;
                default:
                    NotTrue(Menu);
                    break;
            }
        }
        else{
            NotTrue(Menu);
        }
    });
}
function isNumber(value: any): value is number{
    return typeof value === "number" && !isNaN(value);
}
function CheckListMenu(): void{
    let a: number;
    console.log("=== Bạn Muốn Tra Cứu Gì ? ====");
    console.log("==============================");
    console.log("1 => Tra cứu sách.");    
    console.log("2 => Tra cứu người mượn sách."); 
    console.log("0 => Quay lại Menu.");   
    EndLine();
    rl.question("Bạn muốn tra cứu gì? \n", function(input){
        a = Number(input);
        if(!isNaN(a) && isNumber(a)){
            switch(a){
                case 1:
                    CheckBook();
                    break;
                case 2:
                    CheckHS();
                    break;
                case 0:
                    Menu();   
                    break;
                default :
                    console.log(123);
                    NotTrue(CheckListMenu);
                    break;
            }
        }
        else{
            NotTrue(CheckListMenu);
        }
    });
}
function CheckBook(): void{
    let a: number;
    console.log("=== Bạn Muốn Tra Cứu Gì ? ====");
    console.log("==============================");
    console.log("1 => Tra cứu tất cả sách.");    
    console.log("2 => Tra cứu theo ID sách."); 
    console.log("3 => Tra cứu theo tên sách.");
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(name){
        a = Number(name);
        if(!isNaN(a) && isNumber(a)){
            switch(a){
                case 0:
                    CheckListMenu();
                    break;
                case 1:
                    console.log("====================================================");
                    for(let i: number = 0; i < dataLbr.book.length; i++){
                        console.log("Sách: " + dataLbr.book[i].name + ". Tác giả: " + dataLbr.book[i].audor );
                        console.log("====================================================");
                    }
                    rl.question("Nhấn Enter để quay lại", function(enter){
                        CheckBook();
                    });
                    break;
                case 2:
                    rl.question("Nhập ID sách cần tìm: ", function(inputId){
                        let inputID: string =  inputId;
                        let found_2: boolean = false;
                        for(let i: number = 0; i < dataLbr.book.length; i++){
                            if(inputID === dataLbr.book[i].id){
                                //let found: boolean = true;
                                let tempcount: number = Number(dataLbr.book[i].total) - Number(dataLbr.book[i].count);
                                console.log("====================================================");
                                console.log("ID: " + dataLbr.book[i].id);
                                console.log("Tên Sách: " + dataLbr.book[i].name);
                                console.log("Tên TG: " + dataLbr.book[i].audor);
                                console.log("Số Lượng: " + dataLbr.book[i].total);
                                console.log("Còn Lại: " + dataLbr.book[i].count);
                                console.log("Đã Cho Mượn: " + tempcount.toString());
                                if(tempcount > 0){
                                    //let arrayHs = dataLbr.book[i].hBorrow;
                                    console.log("Học Sinh Đã Mượn: " + tempcount.toString());
                                    for(let j = 0; j < dataLbr.book[i].hBorrow.length; j++){
                                        console.log("=> Học Sinh: " + dataLbr.book[i].hBorrow[j].name + 
                                            " (Mã Thư Viện: " + dataLbr.book[i].hBorrow[j].id + ")");
                                    }
                                }
                                found_2 = true;
                                console.log("====================================================");
                                break;
                            }
                        }
                        if(found_2 === false){
                            rl.question("Không tìm thấy sách này, nhấn Enter để quay lại!!!!", function(){
                                CheckBook();
                            });
                        }
                        else{
                            rl.question("Nhấn Enter để quay lại", function(enterIp){
                                    CheckBook();
                            });
                        }
                    });
                    break;
                case 3:
                    let found_3: boolean = false;
                    rl.question("Nhập tên sách: ", function(nameB){
                        let nameBook: string = nameB.toLowerCase().normalize('NFD').
                            replace(/[\u0300-\u036f]/g,"").replace(/đ/g, "d").trim().replace(/\s/g, "");
                        for(let i: number = 0; i < dataLbr.book.length; i++){
                            let temp: string = dataLbr.book[i].name.toLowerCase().normalize('NFD').
                            replace(/[\u0300-\u036f]/g,"").replace(/đ/g, "d").trim().replace(/\s/g, "");
                            if(temp === nameBook){
                                found_3 = true;
                                let tempcount = parseInt(dataLbr.book[i].total) - parseInt(dataLbr.book[i].count);
                                console.log("====================================================");
                                console.log("ID: " + dataLbr.book[i].id);
                                console.log("Tên Sách: " + dataLbr.book[i].name);
                                console.log("Tên TG: " + dataLbr.book[i].audor);
                                console.log("Số Lượng: " + dataLbr.book[i].total);
                                console.log("Còn Lại: " + dataLbr.book[i].count);
                                console.log("Đã Cho Mượn: " + tempcount.toString());
                                if(tempcount > 0){
                                    //let arrayHs = dataLbr.book[i].hBorrow;
                                    console.log("Học Sinh Đã Mượn: " + tempcount.toString());
                                    for(let j = 0; j < dataLbr.book[i].hBorrow.length; j++){
                                        console.log("=> Học Sinh: " + dataLbr.book[i].hBorrow[j].name + 
                                            " (Mã Thư Viện: " + dataLbr.book[i].hBorrow[j].id + ")");
                                    }
                                }
                                console.log("====================================================");
                            }
                        }
                        if(found_3 != true){
                            if(found_3 === false){
                                rl.question("Không tìm thấy sách này, nhấn Enter để quay lại!!!!", function(){
                                    CheckBook();
                                });
                            }
                        }
                        else{
                            rl.question("Nhấn Enter để quay lại!", function(name){
                                CheckBook();
                            });
                        }
                    })
                    break;
                default:
                    NotTrue(CheckBook);
                    break;
            }
        }
        else{
            NotTrue(CheckBook);
        }
    });
}
function CheckHS(): void{
    let a: number;
    console.log("=== Bạn Muốn Tra Cứu Gì ? ====");
    console.log("==============================");
    console.log("1 => Tra cứu tất cả học sinh.");    
    console.log("2 => Tra cứu theo ID thư viện."); 
    console.log("3 => Tra cứu theo tên học sinh.");
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(name){
        a = Number(name);
        if(!isNaN(a) && isNumber(a)){
            switch(a){
                case 0: 
                    CheckListMenu();
                    break;
                case 1: 
                    for( let i: number = 0; i < dataLbr.hBorrow.length; i++){
                        console.log("Học sinh: " + dataLbr.hBorrow[i].name + " (Mã thư viện: " + dataLbr.hBorrow[i].id + ")");
                    }
                    rl.question("Nhấn Enter để quay lại", function(name){
                        if(true){
                            CheckHS();
                        }
                    });
                    break;
                case 2:
                    let found_2: boolean = false;
                    rl.question("Nhập ID thư viện của học sinh cần tìm: ", function(inputId){
                        let tempID: string = inputId;
                        //a = name;
                        for(let i: number = 0; i < dataLbr.hBorrow.length; i++){
                            if(tempID === dataLbr.hBorrow[i].id){
                                found_2 = true;
                                console.log("====================================================");
                                console.log("Học sinh:" + dataLbr.hBorrow[i].name);
                                console.log("Mã thư viện:" + dataLbr.hBorrow[i].id);
                                console.log("Số sách đã mượn: " + dataLbr.hBorrow[i].total);
                                if(parseInt(dataLbr.hBorrow[i].total) > 0){
                                    console.log("====================================================");
                                    for(let j: number = 0; j < dataLbr.hBorrow[j].bBorrow.length; j++){
                                        console.log("  Sách: " + dataLbr.hBorrow[i].bBorrow[j].name);
                                        console.log("  ID Sách: " + dataLbr.hBorrow[i].bBorrow[j].id);
                                        console.log("====================================================");
                                    }
                                }
                                console.log("====================================================");
                                break;
                            }
                        }
                        if(found_2 != true){
                            rl.question("Không có học sinh nào có ID này. Nhấn Enter để quay lại!!!", function(name){
                                    CheckHS();
                            });
                        }
                        else{
                            rl.question("Nhấn Enter để quay lại!", function(name){
                                    CheckHS();
                            });
                        }
                    });
                    break;
                case 3:
                    let found_3: boolean = false;
                    rl.question("Nhập tên của học sinh cần tìm: ", function(nameHs){
                        let nameHS: string = nameHs.toLowerCase().normalize('NFD').
                            replace(/[\u0300-\u036f]/g,"").replace(/đ/g, "d").trim().replace(/\s/g, "");
                        for(let i: number = 0; i < dataLbr.hBorrow.length; i++){
                            let temp: string = dataLbr.hBorrow[i].name.toLowerCase().normalize('NFD').
                            replace(/[\u0300-\u036f]/g,"").replace(/đ/g, "d").trim().replace(/\s/g, "");
                            if(temp === nameHS){
                                found_3 = true;
                                console.log("====================================================");
                                console.log("Học sinh: " + dataLbr.hBorrow[i].name);
                                console.log("Mã thư viện: " + dataLbr.hBorrow[i].id);
                                console.log("Số sách đã mượn: " + dataLbr.hBorrow[i].total);
                                if(parseInt(dataLbr.hBorrow[i].total) > 0){
                                    for(let j = 0; j < dataLbr.hBorrow[j].bBorrow.length; j++){
                                        console.log("  Sách: " + dataLbr.hBorrow[i].bBorrow[j].name);
                                        console.log("  ID Sách: " + dataLbr.hBorrow[i].bBorrow[j].id);
                                    }
                                }
                                console.log("====================================================");
                            }
                        }
                        if(found_3 != true){
                            rl.question("Không có học sinh nào có ID này. Nhấn Enter để quay lại!!!", function(name){
                                    CheckHS();
                            });
                        }
                        else{
                            rl.question("Nhấn Enter để quay lại!", function(name){
                                    CheckHS();
                            });
                        }
                    });
                    break;
                default:
                    CheckHS();
                    break;
            }
        }
        else{
            NotTrue(CheckHS);
        }
    })
}
function BookHandle(): void{
    let a: number;
    console.log("=== Bạn Muốn Thao Tác Gì ? ====");
    console.log("==============================");
    console.log("1 => Thêm Sách.");    
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(inputChoose){
        a = Number(inputChoose);
        if(!isNaN(a) && isNumber(a)){
            switch(a){
                case 0:
                    Menu();
                    break;
                case 1:
                    ChooseAdd();
                    break;
                default:
                    NotTrue(BookHandle);
                    break;
            }
        }
        else{
            NotTrue(BookHandle);
        }
    })
}
function ChooseAdd(): void{
    let a: number;
    console.log("=== Bạn Muốn Thêm Vào Sách Cũ Hay Thêm Mới? ====");
    console.log("==============================");
    console.log("1 => Thêm Cũ.");    
    console.log("2 => Thêm Mới."); 
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(name){
        a = Number(name);
        if(!isNaN(a) && isNumber(a)){
            switch(a){
                case 0: 
                    BookHandle();
                    break;
                case 1:
                    AddOld();
                    break;
                case 2:
                    AddNew();
                    break;
                default: 
                    NotTrue(ChooseAdd);
                    break;
            }
        }
        else{
            NotTrue(ChooseAdd);
        }
    })
}
function AddNew(): void{
    let nameAdd: string, nameadAdd:string, idAdd: number, totalAdd:string ;
        idAdd = dataLbr.book.length + 1;
        rl.question("Nhập tên sách: ", function(nameBook){
            nameAdd = nameBook;
            rl.question("Nhập tên tác gỉả: ", function(nameADAdd){
                nameadAdd = nameADAdd;
                rl.question("Nhập số lượng thêm: ", function(inputNum){
                    if(isNaN(Number(inputNum)) || !isNumber(Number(inputNum)) || Number(inputNum) <= 0){
                        rl.question("Số lượng không hợp lệ, nhấn Enter để thực hiện lại!", function(enter){
                            AddNew();
                        });
                    }
                    totalAdd = inputNum;
                    AskAdd(nameAdd, nameadAdd, idAdd, totalAdd);
                });
            });
        });
}
function AskAdd(nameAdd: string,nameADAdd: string, idAdd: number, totalAdd: string): void{
        rl.question("Bạn có chắc thêm mới: "
            + "\n===================================================="
            + "\nTên sách: " + nameAdd
            + "\nTên tác giả: " + nameADAdd
            + "\nID(Hệ thống quy ước): "
            + "\nSố lượng: " + totalAdd
            + "\n===================================================="
            + "\n1 => Đồng ý."
            + "\n0 => Không, quay lại."
            , function(confirm){
                if(confirm === "1"){
                    let book: object = {
                        "id": "B" + (idAdd + 1).toString(),
                        "name": nameAdd,
                        "audor": nameADAdd,
                        "total": totalAdd,
                        "count": totalAdd,
                        "hBorrow": []
                    };
                    dataLbr.book.push(book);
                    SaveJson();
                    rl.question("Thêm thành công. Nhấn Enter để quay lại!", function(enter){
                        BookHandle();
                    });
                }
                else if(confirm = "0"){
                    BookHandle();
                }
                else{
                    AskAdd(nameAdd, nameADAdd, idAdd, totalAdd);
                }
        });
}
function AddOld(): void{
    let stringName: string;
    let found: boolean = false;
    let totalAdd: string;
    rl.question("Nhập ID của sách: ", function(inputId){
        for(let i = 0; i < dataLbr.book.length; i++){
            if(inputId === dataLbr.book[i].id){
                found = true;
                stringName = dataLbr.book[i].name;
                let stringNameAudor: string = dataLbr.book[i].audor;
                rl.question("Nhập số lượng thêm vào sách: " + stringName + " ", function(inputNum){
                    totalAdd = inputNum;
                    if(isNaN(Number(totalAdd)) || !isNumber(Number(totalAdd)) || Number(totalAdd) <= 0){
                        rl.question("Số lượng không hợp lệ, nhấn Enter để thực hiện lại!", function(enter){
                            AddOld();
                        });
                    }
                    rl.question("Bạn có chắc thêm \n"
                        + "\n===================================================="
                        + "\nTên sách: " + stringName
                        + "\nTên Tác giả: " + stringNameAudor
                        + "\nSố lượng cũ:" + dataLbr.book[i].total
                        + "\nSố lượng mới: " + (Number(totalAdd) + Number(dataLbr.book[i].total))
                        +"\n===================================================="
                        + "\n1 => Đồng ý."
                        + "\n0 => Không, quay lại.", function(confirm){ 
                            if(confirm === "1"){
                                let temp_tt: number = Number(dataLbr.book[i].total);
                                let temp_count: number = Number(dataLbr.book[i].count);
                                dataLbr.book[i].total = (parseInt(totalAdd) + temp_tt).toString();
                                dataLbr.book[i].count = (Number(totalAdd) + temp_count).toString();
                                SaveJson()
                                rl.question("Nhấn Enter để quay lại!", function(enter){
                                    ChooseAdd();
                                });
                            }
                            else if(confirm === "0"){
                                BookHandle();
                            }
                            else{
                                console.log("Lựa chọn không hợp lệ. Hãy thao tác lại!");
                                AddOld();
                            }
                        });
                });
                break;
            }
        }
        if(!found){
            rl.question("Không tồn tại sách có ID: " + inputId + " trong thư viện." + 
                "Nhấn Enter để quay lại!", function(enter){
                    ChooseAdd();
                });
        }
    });
}

function HSHandle(): void{
let a: number;
    console.log("=== Bạn Muốn Thao Tác Gì ? ====");
    console.log("==============================");
    console.log("1 => Thêm Thành Viên.");    
    console.log("2 => Mượn Sách."); 
    console.log("3 => Trả sách."); 
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(input){
        a = Number(input);
        switch(a){
            case 0:
                Menu();
                break;
            case 1:
                AddHS();
                break;
            case 2:
                BorrowBook();
                break;
            case 3:
                ReturnBook();
                break;
            default:
                NotTrue(HSHandle);
                break;
        }
    })
}



function AddHS(): void{
    let nameHs: string;
    rl.question("Nhập tên học sinh: ", function(inputName){
        nameHs = inputName;
        let temp_idhs: number = Number(dataLbr.hBorrow.length) + 1;
        let hocsinh: object = {
            "id": "H" + temp_idhs.toString(),
            "name": nameHs,
            "total": 0,
            "bBorrow": []
        };

        rl.question("Bạn có chắc thêm mới: "
            + "\n===================================================="
            + "\nTên học sinh: " + nameHs
            + "\nID(Hệ thống quy ước): " + "H" + temp_idhs.toString()
            + "\n===================================================="
            + "\n1 => Đồng ý."
            + "\n0 => Không, quay lại."
            , function(confirm){
                if(confirm === "1"){
                    dataLbr.hBorrow.push(hocsinh);
                    SaveJson();
                    rl.question("Thành công, nhấn Enter để quay lại!", function(enter){
                        HSHandle();
                    });
                }
                else if(confirm === "0"){
                    HSHandle();
                }
                else{
                    NotTrue(HSHandle);
                }
        });
    })
}

function ReturnBook(){
    let idTv: string, idB: string;
    let nameTv: string, nameBook: string;
    rl.question("Nhập ID học sinh là thành viên của thư viện: ", function(inputId){
        idTv = inputId  ;
        let check = false;
        for(let i = 0; i < dataLbr.hBorrow.length; i++){
            if(dataLbr.hBorrow[i].id === idTv){
                check = true;
                nameTv = dataLbr.hBorrow[i].name;
                rl.question("Nhập ID sách trả: ", function(inputIDS){
                    idB = inputIDS;
                    for(let j = 0; j < dataLbr.book.length; j++){
                        if(dataLbr.book[j].id === idB){
                            check = true;
                            nameBook = dataLbr.book[j].name;
                            let tempCountB = parseInt(dataLbr.book[i].count) + 1;
                            let tempCountH = parseInt(dataLbr.hBorrow[j].total) -1;
                            //let stringnametemp = dataLbr.book[i].name;
                            rl.question("Bạn có chắc: "
                                + "\n========================================="
                                + "\nHọc sinh: " + nameTv 
                                + "\Trả sách: " + nameBook
                                + "\n========================================="
                                + "\n1 => Đúng vậy."
                                + "\n0 => Không đúng.", function(confirm){
                                    let choose = parseInt(confirm);
                                    switch(choose){
                                        case 0:
                                            HSHandle();
                                            break;
                                        case 1:
                                            dataLbr.book[j].count = tempCountB.toString();
                                            dataLbr.hBorrow[i].total = tempCountH.toString();
                                            dataLbr.book[j].hBorrow = dataLbr.book[j].hBorrow.filter(function(h: any){
                                                return h.id !== idTv;
                                            });
                                            dataLbr.hBorrow[i].bBorrow = dataLbr.hBorrow[i].bBorrow.filter(function(b: any){
                                                return b.id !== idB;
                                            });
                                            SaveJson();
                                            rl.question("Đã cập nhật danh sách, nhấn Enter để thoát!", function(quit){
                                                HSHandle();
                                            });
                                            break;
                                        default:
                                            HSHandle();
                                            break;
                                    }
                                }
                            );
                        }
                    }
                    if(!check){
                        check = false;
                        rl.question("Không có sách này! Nhấn Enter để thoát!!!!", function(confirm){
                            HSHandle();
                        })
                    }
                })
            }
        }
        if(!check){
            check = false;
            rl.question("Không có học viên này! Nhấn Enter để thoát!!!!", function(confirm){
                HSHandle();
            })
        }

    })
}
function BorrowBook(){
    let idTv: string, idB: string;
    let nameTv: string, nameBook: string;   
    rl.question("Nhập ID học sinh là thành viên của thư viện: ", function(inputId){
        idTv = inputId  ;
        let check = false;
        for(let i = 0; i < dataLbr.hBorrow.length; i++){
            if(dataLbr.hBorrow[i].id === idTv){
                check = true;
                nameTv = dataLbr.hBorrow[i].name;
                rl.question("Nhập ID sách mượn: ", function(inputIDS){
                    let checkTr: boolean = false;
                    idB = inputIDS;
                    for(let temp = 0; temp < dataLbr.hBorrow[i].bBorrow.length; temp++){
                        if(idB === dataLbr.hBorrow[i].bBorrow[temp].id){
                            checkTr = true;
                            rl.question("Học sinh đã mượn sách này. Nhấn Enter để thoát!", function(enter){
                                BorrowBook();
                            });
                        }
                    }
                    console.log(12341);
                    if(checkTr === false){
                        for(let j: number = 0; j < dataLbr.book.length; j++){
                            if(dataLbr.book[j].id === idB){
                                check = true;
                                nameBook = dataLbr.book[j].name;
                                let tempCountB = parseInt(dataLbr.book[i].count) - 1;
                                let tempCountH = parseInt(dataLbr.hBorrow[j].total) + 1;
                                //let stringnametemp = dataLbr.book[i].name;
                                rl.question("Bạn có chắc: "
                                    + "\n========================================="
                                    + "\nHọc sinh: " + nameTv 
                                    + "\nMượn sách: " + nameBook
                                    + "\n========================================="
                                    + "\n1 => Đúng vậy."
                                    + "\n0 => Không đúng.", function(confirm){
                                        let choose = parseInt(confirm);
                                        switch(choose){
                                            case 0:
                                                HSHandle();
                                                break;
                                            case 1:
                                                dataLbr.book[j].count = tempCountB.toString();
                                                dataLbr.hBorrow[i].total = tempCountH.toString();
                                                dataLbr.book[j].hBorrow.push({
                                                    "id": idTv,
                                                    "name": nameTv
                                                });
                                                dataLbr.hBorrow[i].bBorrow.push({
                                                    "id": idB,
                                                    "name": nameBook
                                                })
                                                SaveJson();
                                                rl.question("Đã thêm vào danh sách, nhấn Enter để thoát!", function(quit){
                                                    HSHandle();
                                                });
                                                break;
                                            default:
                                                HSHandle();
                                                break;
                                        }
                                    }
                                );
                            }
                        }
                    }
                    if(!check){
                        check = false;
                        rl.question("Không có sách này! Nhấn Enter để thoát!!!!", function(confirm){
                            HSHandle();
                        })
                    }
                })
            }
        }
        if(!check){
            check = false;
            rl.question("Không có học viên này! Nhấn Enter để thoát!!!!", function(confirm){
                HSHandle();
            })
        }
    })
}