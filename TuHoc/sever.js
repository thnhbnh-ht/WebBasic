const express = require("express"); //gọi thư viện express
const app = express(); // khởi tạo app

app.use(express.json()); 

// chạy sever
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`sever dang chay`);
});

// 1. GET - lấy ALL
app.get("/api/students", (req, res) => {
    res.status(200).json(students);
});

// 2. GET - lấy 1 ID
app.get("/api/students/:id", (req, res) => { //:id dùng để trỏ đến tài nguyên cụ thể
    const studentID = parseInt(req.params.id);
    const student = students.find(s => s.id === studentID);
    if (!student){
        return res.status(404).json({message: "Not Found"});
    }
    res.status(200).json(student);
});

// 3. POST - create 1
app.post("/api/students", (req, res) => {
    const newStudent = {
        id: students.lenght + 1,
        name: req.body.name,
        course: req.body.course
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// 4. DELETE 
app.delete("/api/studentts/:id", (req, res) => {
    const studentID = parseInt(req.params.id);
    students = students.filter(s => s.id !== studentID);
    res.status(200).json({message: "Success"});
});