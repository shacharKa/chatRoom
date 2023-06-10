// so i can use the expres library
const express = require('express')
const app = express();

const port = process.env.PORT || 3000
// server lisen if sombody wonts to conect the num is the port it is conecting thro
app.listen(port, () => console.log("listening at "+port))
// this is the file that will be sent to the user
app.use(express.static('public'));
// be able to anderstand json
app.use(express.json(/* if i wont i can put some restrictions here */));

// chat 
let chat = [];


// resives data
app.post('/MBS',(request,respons) =>{
    // check if messeg is empty
    if(request.body.data != '')
        chat.push(request.body)
    ////////
    respons.json("data resived")
    // make shore the chat is not to long
    keepChatAt25()
})

/////////////////////// sned data
const data={body:{chat}}
app.get('/MSB',(req,res)=>{ console.log("updayt sent: ")
    console.log(chat)
    // send the chat
    res.json(chat)
})
function keepChatAt25()
{
    if(chat.length > 50)
    {
        chat = chat.slice(chat.length - 50,chat.length)
    }
}