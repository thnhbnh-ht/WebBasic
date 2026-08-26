import express from "express"
const app = express();
app.get("/", (req, res)=> {
    // res.send("Hello");
    res.send("<a href='hello'>Hello</a>")
})
app.get("/end", (req, res)=> {
    res.send("<a href='hello'>Chao Xin</a>")
})
app.listen(3000, ()=>{
    console.log("Sever is running on port 3000");
})