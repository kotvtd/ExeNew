let num = 413;
FormatMonneey(num);
function FormatMonneey(monney){
    let NUM, temp, value;
    if(monney >= 1e9){
        NUM = (monney/1e9).toFixed(2);
        value = "B";
    }
    else if(monney >= 1e6){
        NUM = (monney/1e6).toFixed(2);
        value = "M"
    }
    else if(monney >= 1e3){
        NUM = (monney/1e3).toFixed(2);
        value = "K"
    }
    else{
        NUM = monney;
        value="";
    }
    console.log(NUM.toString()+value);
}
