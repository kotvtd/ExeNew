let _string = "";
function CheckWords(stringApper){
    if(_string == ""){
        console.log(0);
    }
    else{
        let count = 1;
        for(let char of stringApper){
            if(char >= 'A' && char <='Z')
                count++;
        }
        console.log(count);
    }
}
CheckWords(_string);