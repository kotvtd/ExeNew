let money= 123456723;
let a;
let stringNum_TP = "", stringNum, temp = "", string_temp = "", string_End = "";

//ConvertMoney(money);
ConvertMoney(money);
Chia1K(money);
function ConvertMoney(monneyNum){
    if((monneyNum != null) || (monneyNum != undefined)){
        if(monneyNum % 1 > 0){
            stringNum_TP = "." + ((monneyNum % 1).toFixed(3) * 100).toString();
            monneyNum = monneyNum - monneyNum;
            console.log(stringNum_TP.toString());
        }
    }
}

function Chia1K(a){
    //console.log(a);
    while(a > 1000){
        temp = Math.trunc(a) % 1000;;
        string_temp = "," + temp.toString();
        stringFocus = string_End;
        string_End = string_temp + string_End;
        a = Math.trunc( a / 1000) ;
        console.log(temp);
        console.log(string_End);
    } 
    if( a < 1000 ){
        stringNum = "\"" +  a.toString() + string_End + stringNum_TP + "\"";
        console.log(stringNum);
    }     
}