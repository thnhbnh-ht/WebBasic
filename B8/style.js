let button = document.querySelector("button");
let color_res = document.querySelector(".color");
button.addEventListener('click', function(event){
    event.preventDefault();
    let width = document.getElementById("w").value.trim();
    let height = document.getElementById("h").value.trim();
    let color = document.getElementById("mau").value.trim();
    color_res.style.backgroundColor = color;
    color_res.style.width = width + "px";
    color_res.style.height = height + "px";
})