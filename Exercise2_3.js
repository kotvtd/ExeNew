let array_A = [1,3,1,5,23,5,6];
function RandomArray(){
    let a = Math.floor(Math.random() * array_A.length);
    console.log("Giá trị ngẫu nhiên phần tử thứ " + (a + 1 ).toString() + " của mảng là:"+ array_A[a]);
}
RandomArray();