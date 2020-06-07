const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/",function(req,res)
{
    function myfunction(){
    res.sendFile(__dirname + "/index.html");
    }
    setTimeout(myfunction, 0000)
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function()
{
    console.log("server has started");
});
