// let person = {
//     name: "John",
//     age: 30,
//     greet: function(){
//         console.log("Hello, my name is " + this.name);
//     }
// };
// person.greet()

// function get(path, callback){
//     const req = {};
//     const res = {
//         send: (html) => {
//             console.log("Response: ", html);
//         },
//     };
//     callback(req, res);
// }
// get("/", (req, res) => {
//     res.send("Hello");
// })