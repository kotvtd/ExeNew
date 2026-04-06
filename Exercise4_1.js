



const hangTram = new Map();
hangTram.set(1000,"M");
hangTram.set(9,"CM");
hangTram.set(8,"DCCC");
hangTram.set(7,"DCC");
hangTram.set(6,"DC");
hangTram.set(5,"D");
hangTram.set(4,"CD");
hangTram.set(3,"CCC");
hangTram.set(2,"CC");
hangTram.set(1,"C");

const hangChuc = new Map();
hangChuc.set(9,"XC");
hangChuc.set(8,"LXXX");
hangChuc.set(7,"LXX");
hangChuc.set(6,"LX");
hangChuc.set(5,"L");
hangChuc.set(4,"XL");
hangChuc.set(3,"XXX");
hangChuc.set(2,"XX");
hangChuc.set(1,"X");

const hangDonvi = new Map();
hangDonvi.set(9,"IX");
hangDonvi.set(8,"VIII");
hangDonvi.set(7,"VII");
hangDonvi.set(6,"VI");
hangDonvi.set(5,"V");
hangDonvi.set(4,"IV");
hangDonvi.set(3,"III");
hangDonvi.set(2,"II");
hangDonvi.set(1,"I");

let num = 32;
ConvertRomanNum(num);
function ConvertRomanNum(number){
    let stringFor = "";
    if(number === 1000){
        stringFor = hangTram.get(number);
    }
    else if(number >= 100){
        let tram, chuc, donvi, ft, fc, fdv;
        tram = Math.floor(number / 100);
        number -= tram * 100;
        chuc = Math.floor(number / 10);
        number -= chuc * 10;
        donvi = number;
        ft = hangTram.get(tram);
        if(chuc > 0){
            fc = hangChuc.get(chuc);
        }
        else if( chuc === 0){
            fc = "";
        }
        if(donvi > 0){
            fdv = hangDonvi.get(donvi);
        }
        else if( donvi === 0){
            fdv = "";
        }
        stringFor = ft + fc + fdv;
    }
    else if(number >= 10){
        let  chuc, donvi, fc, fdv;
        chuc = Math.floor(number / 10);
        number -= chuc * 10;
        donvi = number;
        if(chuc > 0){
            fc = hangChuc.get(chuc);
        }
        else if( chuc === 0){
            fc = "";
        }
        if(donvi > 0){
            fdv = hangDonvi.get(donvi)
        }
        else if( donvi === 0){
            fdv = "";
        }
        stringFor = fc + fdv;
    }
    else {
        stringFor = hangDonvi.get(number);
    }
    console.log(stringFor);
}


