const a = [4,2,53,254,3,23,5,574,22], b = [12,2,45,23,645,345,23,5];
let aLen = a.length, bLen = b.length;
FindElement();
function FindElement(){
    for(let j = 0; j < bLen; j++ ){
        let equal = false;
        for(let i = 0; i < aLen; i++ ){
            if(b[j]===a[i]){
                equal = true;
                break;
            }
        }
        if(!equal){
            console.log(b[j]);
        }
    }
}