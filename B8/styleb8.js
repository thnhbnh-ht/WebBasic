// var i = 1; //it dung, nhieu loi -- bien toan cuc -> khai bao lai thi van an, khong err
// let a = 2; //dung nhieu, tien hon var
// const b = 5; //khong the thay doi gia tri
// if (true){
//     let a = 2;
//     var i = 2;
// } //khai bao
// let a = 2;
// a = "aaaaaa" //gan lai van hop le, chi can khong khai bao lai
// string, number, boolean, undefined, null
//phan biet undefined va null
// undefined -> chi khai bao. null-> chu dong khai bao kieu null
// +, -, *, / : chia han, %
// > < >= <= == ===
// == : in ra giong nhau thi tinh la dung. vd 10 va "10" -> true
// === : phan biet them kieu du lieu -> 10 va "10" -> false
//object, array, function
// console.log(typeof(a)); //hien thi kieu du lieu
// console.log(a.length); // do dai cua a
// let fruits = ["tao", "oi", "dua"]; //array
// let student = {
//     name: "Binh",
//     age: 19,
//     class: abcxys
// }; //object
// console.log(student.name);
// function sum (a, b){
//     console.log(a + b);
//     return a + b;
// } //function
// let t = sum(3, 4); 
// console.log(t); //  -> 7 enter 7
// if (a < b){

// }
// else if () {

// }
// else{

// }
// bitwise: &, |, ^ : xor, ~ :, << : dich phai -> nhan 2 -- nhan voi toan tu sau do, >> : dich trai -> chia cho 2 -- bo di 1 bit
// let t = 5 & 1;
// 5 = 101;
// 1 = 001;
// console.log(t); 
// for (let i = 0; i <= 5; i++){
//     console.log(i);
//     // break;
//     // continue;
// }

//ngto, stn, shh
let n = 47;
let sum = 0;
//snt
function snt (n){
    if (n == 2) console.log("true");
    else if (n > 2){
        for (let i = 2; i <= n / 2; i++){
            if (n % i == 0) {
                console.log("false ");
                break;
            }
        }
        console.log("true");
    }
}
snt(n);
//stn
function stn (n){
    if (n % 1 > 0 && n > 0) console.log("not stn");
    else console.log("stn");
}
stn(n);
//shh
function shh (n){
    for (let i = 1; i < n; i++){
        if (i * i == n) sum += i;
        else if (n % i == 0){
            sum += i;
        }
    }
    if (sum == n) console.log("yes");
    else console.log("No");
}
shh(n);
console.log(Math.trunc(1.77)); // lam tron xuong

let a = 12;
let b = "aaa" + n;
console.log(b);
console.log("aaaa " + a);
console.log(`bbbbbbbbb ${a}`);






