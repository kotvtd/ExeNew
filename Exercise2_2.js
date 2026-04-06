let min = 1;
let max = 10;
Random(min,max);
function Random(min,max){
    let a = Math.floor(Math.random() * (max - min)) + min;
    console.log(a);
}