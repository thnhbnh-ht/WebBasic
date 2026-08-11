let button = document.querySelector("button");
let color_res = document.getElementById("color");
button.addEventListener('click', function(){
    event.preventDefault();
    let width = document.getElementById("w").value.trim();
    let height = document.getElementById("h").value.trim();
    let color = document.getElementById("mau").value.trim();
    if (!color || !width || !height) {
        alert('Vui lòng nhập đủ mã màu, chiều ngang và chiều dọc');
        return;
    }
    color_res.style.backgroundColor = color;
    color_res.style.width = width + "px";
    color_res.style.height = height + "px";
})
color_res.addEventListener('click', function(){
    document.getElementById("w").value = "";
    document.getElementById("h").value = "";
    document.getElementById("mau").value = "";
    color_res.style.display = "none";
})