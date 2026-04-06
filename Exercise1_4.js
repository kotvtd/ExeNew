let _string = "Sound.mp3";
Extention(_string);
function Extention(stringEx){
    let result = stringEx.split(".")[1];
    console.log(result);
}