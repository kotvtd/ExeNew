
process.stdin.setEncoding("utf-8");


import fs from 'fs'
import { count } from 'node:console';
import { parse } from 'node:path';
import readline from 'node:readline';
const data = fs.readFileSync('Data.json','utf-8');
const dataLbr = JSON.parse(data);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function SaveJson(){
    fs.writeFileSync('Data.json',JSON.stringify(dataLbr, null, 2),'utf-8');
}
// for(let i =0; i < dataLbr.book.length; i++){
//     if(dataLbr.book[i].id === "B3"){
//         dataLbr.book.splice(i,1);
//     }
// }
Menu();

function CheckBook(){
    let a;
    console.log("=== Bạn Muốn Tra Cứu Gì ? ====");
    console.log("==============================");
    console.log("1 => Tra cứu tất cả sách.");    
    console.log("2 => Tra cứu theo ID sách."); 
    console.log("3 => Tra cứu theo tên sách.");
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(name){
        a = parseInt(name);
        switch(a){
            case 0:
                CheckListMenu();
                break;
            case 1:
                for(let i = 0; i < dataLbr.book.length; i++){
                    console.log(dataLbr.book[i].name);
                }
                rl.question("Nhấn Enter để quay lại", function(name){
                        CheckBook();
                });
                break;
            case 2:
                rl.question("Nhập ID sách cần tìm: ", function(name){
                    a = name;
                    let found_2 = false;
                    for(let i = 0; i < dataLbr.book.length; i++){
                        if(a === dataLbr.book[i].id){
                            let found = true;
                            let tempcount = parseInt(dataLbr.book[i].total) - parseInt(dataLbr.book[i].count);
                            console.log("=====================================");
                            console.log("ID: " + dataLbr.book[i].id);
                            console.log("Tên Sách: " + dataLbr.book[i].name);
                            console.log("Số Lượng: " + dataLbr.book[i].total);
                            console.log("Còn Lại: " + dataLbr.book[i].count);
                            console.log("Đã Cho Mượn: " + tempcount.toString());
                            if(tempcount > 0){
                                let arrayHs = dataLbr.book[i].hBorrow;
                                console.log("Học Sinh Đã Mượn: " + tempcount.toString());
                                for(let j = 0; j < arrayHs.length; j++){
                                    console.log("=> Học Sinh: " + arrayHs[j].name + 
                                        " (Mã Thư Viện: " + arrayHs[j].id + ")");
                                }
                            }
                            console.log("=====================================");
                            break;
                        }
                    }
                    if(found_2 != true){
                        console.log("Không tìm thấy sách này!!!");
                    }
                    rl.question("Nhấn Enter để quay lại", function(name){
                            CheckBook();
                    });
                });
                break;
            case 3:
                let found_3 = false;
                rl.question("Nhập tên sách: ", function(name){
                    let nameBook = name.toLowerCase().normalize('NFD').
                        replace(/[\u0300-\u036f]/g,"").replace(/đ/g, "d").trim().replace(/\s/g, "");
                    for(let i = 0; i < dataLbr.book.length; i++){
                        let temp = dataLbr.book[i].name.toLowerCase().normalize('NFD').
                        replace(/[\u0300-\u036f]/g,"").replace(/đ/g, "d").trim().replace(/\s/g, "");
                        if(temp === nameBook){
                            found_3 = true;
                            let tempcount = parseInt(dataLbr.book[i].total) - parseInt(dataLbr.book[i].count);
                            console.log("=====================================");
                            console.log("ID: " + dataLbr.book[i].id);
                            console.log("Tên Sách: " + dataLbr.book[i].name);
                            console.log("Số Lượng: " + dataLbr.book[i].total);
                            console.log("Còn Lại: " + dataLbr.book[i].count);
                            console.log("Đã Cho Mượn: " + tempcount.toString());
                            if(tempcount > 0){
                                let arrayHs = dataLbr.book[i].hBorrow;
                                console.log("Học Sinh Đã Mượn: " + tempcount.toString());
                                for(let j = 0; j < arrayHs.length; j++){
                                    console.log("=> Học Sinh: " + arrayHs[j].name + 
                                        " (Mã Thư Viện: " + arrayHs[j].id + ")");
                                }
                            }
                            console.log("=====================================");
                        }
                    }
                    if(found_3 != true){
                        console.log("Không tìm thấy sách này!!!");
                    }
                    rl.question("Nhấn Enter để quay lại!", function(name){
                        CheckBook();
                    });
                })
                break;
            default:
                CheckBook();
                break;
        }
    });
}
function CheckHS(){
    let a;

    console.log("=== Bạn Muốn Tra Cứu Gì ? ====");
    console.log("==============================");
    console.log("1 => Tra cứu tất cả học sinh.");    
    console.log("2 => Tra cứu theo ID thư viện."); 
    console.log("3 => Tra cứu theo tên học sinh.");
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(name){
        a = parseInt(name);
        switch(a){
            case 0: 
                CheckListMenu();
                break;
            case 1: 
                for(let i =0; i < dataLbr.hBorrow.length; i++){
                    console.log("Học sinh: " + dataLbr.hBorrow[i].name + " (Mã thư viện: " + dataLbr.hBorrow[i].id + ")");
                }
                rl.question("Nhấn Enter để quay lại", function(name){
                    if(true){
                        CheckBook();
                    }
                });
                break;
            case 2:
                let found_2 = false;
                rl.question("Nhập ID thư viện của học sinh cần tìm: ", function(name){
                    a = name;
                    for(let i = 0; i < dataLbr.hBorrow.length; i++){
                        if(a === dataLbr.hBorrow[i].id){
                            found_2 = true;
                            console.log("===================================");
                            console.log("Học sinh:" + dataLbr.hBorrow[i].name);
                            console.log("Mã thư viện:" + dataLbr.hBorrow[i].id);
                            console.log("Số sách đã mượn: " + dataLbr.hBorrow[i].total);
                            if(parseInt(dataLbr.hBorrow[i].total) > 0){
                                for(let j = 0; j < dataLbr.hBorrow[j].bBorrow.length; j++){
                                    console.log("   => " + dataLbr.hBorrow[i].bBorrow[j]);
                                }
                            }
                            console.log("===================================");
                            break;
                        }
                    }
                    if(found_2 != true){
                        console.log("Không có học sinh nào có ID này!!!")
                    }
                    rl.question("Nhấn Enter để quay lại!", function(name){
                            CheckHS();
                    });
                });
                break;
            case 3:
                let found_3 = false;
                rl.question("Nhập tên của học sinh cần tìm: ", function(name){
                    let nameHS = name.toLowerCase().normalize('NFD').
                        replace(/[\u0300-\u036f]/g,"").replace(/đ/g, "d").trim().replace(/\s/g, "");
                    for(let i = 0; i < dataLbr.hBorrow.length; i++){
                        let temp = dataLbr.hBorrow[i].name.toLowerCase().normalize('NFD').
                        replace(/[\u0300-\u036f]/g,"").replace(/đ/g, "d").trim().replace(/\s/g, "");
                        if(temp === nameHS){
                            found_3 = true;
                            console.log("===================================");
                            console.log("Học sinh: " + dataLbr.hBorrow[i].name);
                            console.log("Mã thư viện: " + dataLbr.hBorrow[i].id);
                            console.log("Số sách đã mượn: " + dataLbr.hBorrow[i].total);
                            if(parseInt(dataLbr.hBorrow[i].total) > 0){
                                for(let j = 0; j < dataLbr.hBorrow[j].bBorrow.length; j++){
                                    console.log("   => " + dataLbr.hBorrow[i].bBorrow[j]);
                                }
                            }
                            console.log("===================================");
                        }
                    }
                    if(found_3 != true){
                        console.log("Không có học sinh nào có ID này!!!")
                    }
                    rl.question("Nhấn Enter để quay lại!", function(name){
                            CheckHS();
                    });
                });
                break;
            default:
                CheckHS();
                break;
        }
    })
}
function CheckListMenu(){
    let a;
    console.log("=== Bạn Muốn Tra Cứu Gì ? ====");
    console.log("==============================");
    console.log("1 => Tra cứu sách.");    
    console.log("2 => Tra cứu người mượn sách."); 
    console.log("0 => Quay lại Menu.");   
    EndLine();
    rl.question("Ban Muon Lam Gi? \n", function(name){
        a = parseInt(name);
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
                CheckListMenu();
                break;
        }
    });
}
function EndLine(){
    console.log("==============================");
    console.log("Bạn hãy nhập lựa chọn phù hợp:");
}
function ChooseAdd(){
    let a;
    console.log("=== Bạn Muốn Thêm Vào Sách Cũ Hay Thêm Mới? ====");
    console.log("==============================");
    console.log("1 => Thêm Cũ.");    
    console.log("2 => Thêm Mới."); 
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(name){
        a = parseInt(name);
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
                ChooseAdd();
                break;
        }
    })
}
function AskAdd(nameAdd, idAdd, totalAdd){
        rl.question("Bạn có chắc thêm mới: "
            + "\n===================================================="
            + "\nTên sách: " + nameAdd
            + "\nID(Hệ thống quy ước): "
            + "\nSố lượng: " + totalAdd
            + "\n===================================================="
            + "\n1 => Đồng ý."
            + "\n0 => Không, quay lại."
            , function(confirm){
                if(confirm === "1"){
                    let book = {
                        "id": "B" + (idAdd + 1).toString(),
                        "name": nameAdd,
                        "total": totalAdd,
                        "count": totalAdd,
                        "hBorrow": []
                    };
                    dataLbr.book.push(book);
                    SaveJson();
                    rl.question("Nhấn Enter để quay lại!", function(name){
                        BookHandle();
                    });
                }
                else if(confirm = "0"){
                    BookHandle();
                }
                else{
                    AskAdd(nameAdd, idAdd, totalAdd);
                }
        });

}
function AddOld(){
    let stringName;
    let found = false;
    let totalAdd;
    rl.question("Nhập ID của sách: ", function(inputId){
        for(let i = 0; i < dataLbr.book.length; i++){
            if(inputId === dataLbr.book[i].id){
                found = true;
                stringName = dataLbr.book[i].name;
                rl.question("Nhập số lượng thêm vào sách: " + stringName + " ", function(inputNum){
                    totalAdd = inputNum;
                    rl.question("Bạn có chắc thêm \n"
                        + "\n===================================================="
                        + "\nTên sách: " + stringName
                        + "\nSố lượng cũ:" + dataLbr.book[i].total
                        + "\nSố lượng mới: " + (parseInt(totalAdd) + parseInt(dataLbr.book[i].total))
                        +"\n===================================================="
                        + "\n1 => Đồng ý."
                        + "\n0 => Không, quay lại.", function(confirm){ 
                            if(confirm === "1"){
                                let temp_tt = parseInt(dataLbr.book[i].total);
                                let temp_count = parseInt(dataLbr.book[i].count);
                                dataLbr.book[i].total = (parseInt(totalAdd) + temp_tt).toString();
                                dataLbr.book[i].count = (parseInt(totalAdd) + temp_count).toString();
                                SaveJson()
                                rl.question("Nhấn Enter để quay lại!", function(name){
                                    ChooseAdd();
                                });
                            }
                            else if(confirm === "0"){
                                BookHandle();
                            }
                            else{
                                AddOld();
                            }
                        });
                });
                break;
            }
        }
        if(!found){
            console.log("Không tồn tại sách có ID: " + inputId + " trong thư viện.")
                rl.question("Nhấn Enter để quay lại!", function(name){
                    ChooseAdd();
                });
        }
    });
}
function AddNew(){
    let nameAdd, idAdd, totalAdd ;
        idAdd = dataLbr.book.length + 1;
        rl.question("Nhập tên sách: ", function(nameBook){
            nameAdd = nameBook;
            rl.question("Nhập số lượng thêm: ", function(inputNum){
                totalAdd = inputNum;
                AskAdd(nameAdd, idAdd, totalAdd);
            });
        });
}
function BookHandle(){
    let a;
    console.log("=== Bạn Muốn Thao Tác Gì ? ====");
    console.log("==============================");
    console.log("1 => Thêm Sách.");    
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(input){
        a = parseInt(input);
        switch(a){
            case 0:
                Menu();
                break;
            case 1:
                ChooseAdd();
                break;
            default:
                BookHandle();
                break;
        }
    })
}
function AddHS(){
    let a;
    rl.question("Nhập tên học sinh: ", function(inputName){
        a = inputName;
        let temp_idhs = parseInt(dataLbr.hBorrow.length) + 1;
        let hocsinh = {
            "id": "H" + temp_idhs.toString(),
            "name": a,
            "total": 0,
            "bBorrow": []
        };

        rl.question("Bạn có chắc thêm mới: "
            + "\n===================================================="
            + "\nTên học sinh: " + a
            + "\nID(Hệ thống quy ước): " + "H" + temp_idhs.toString()
            + "\n===================================================="
            + "\n1 => Đồng ý."
            + "\n0 => Không, quay lại."
            , function(confirm){
                if(confirm === "1"){
                    dataLbr.hBorrow.push(hocsinh);
                    SaveJson();
                    rl.question("Nhấn Enter để quay lại!", function(name){
                        HSHandle();
                    });
                }
                else{
                    HSHandle();
                }
        });
    })
}
function ReturnBook(){
    let idTv, idB;
    let nameTv, nameBook;
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
                                            dataLbr.book[j].hBorrow = dataLbr.book[j].hBorrow.filter(function(h){
                                                return h.id !== idTv;
                                            });
                                            dataLbr.hBorrow[i].bBorrow = dataLbr.hBorrow[i].bBorrow.filter(function(b){
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
    let idTv, idB;
    let nameTv, nameBook;
    rl.question("Nhập ID học sinh là thành viên của thư viện: ", function(inputId){
        idTv = inputId  ;
        let check = false;
        for(let i = 0; i < dataLbr.hBorrow.length; i++){
            if(dataLbr.hBorrow[i].id === idTv){
                check = true;
                nameTv = dataLbr.hBorrow[i].name;
                rl.question("Nhập ID sách mượn: ", function(inputIDS){
                    idB = inputIDS;
                    for(let j = 0; j < dataLbr.book.length; j++){
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

function HSHandle(){
let a;
    console.log("=== Bạn Muốn Thao Tác Gì ? ====");
    console.log("==============================");
    console.log("1 => Thêm Thành Viên.");    
    console.log("2 => Mượn Sách."); 
    console.log("3 => Trả sách."); 
    console.log("0 => Quay lại.");
    EndLine();
    rl.question("Bạn muốn làm gì?\n", function(input){
        a = parseInt(input);
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
                HSHandle();
                break;
        }
    })
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
    EndLine();    
    rl.question("Bạn muốn làm gì? \n", function(name){
        a = parseInt(name);
        console.log(a);
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
                Menu();
                break;
        }
    });
}
