let n =  5 ;
let k = 2 ;

ChinhHopChap(k,n)
function GiaiThua(a){
    if((a === 0) || (a === 1))
        return 1;
    else return a * (a -1);
}
// console.log(GiaiThua(n));
// console.log(GiaiThua(k));
function ChinhHopChap(k,n){
    if(k > n || k < 0){
        console.log("Gia Tri Khong Hop Le")
    }
    else{
        let chinhHop = GiaiThua(n)/((GiaiThua(k) * GiaiThua(n - k)));
        console.log(chinhHop);
    }
}