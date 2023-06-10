let messegesOnScreen = []
const userId = Math.floor( Math.random()*(1000000 - 100000) + 100000);

const screenDiv = document.getElementById('screen');
const textArea = document.getElementById('textArea');
const btnSend = document.getElementById('btnSend');



textArea.addEventListener('keydown',IfEnterSend)
btnSend.addEventListener('click', send)

function IfEnterSend(event)
{
    if(event.code == "Enter" && !event.shiftKey )
    {
        send()
    }
    else if(event.code == "Enter"){
        textArea.value +='\n';
    }
        
}
async function send()
{
    const data = textArea.value
    const messegId = Math.random()*10000000000;
    const textMessege = {
        method:'POST'
        // tell you that its going to be json
        ,headers:{
            'Content-Type': 'application/json'
        }
        // body is the data stringefy makes is a string
        ,body: JSON.stringify({data,userId,messegId})

    }
    // send data to server
    const respons = await fetch('/MBS', textMessege).catch((e)=>{console.error(e)})
    // emptis the text aria
    textArea.value = '';
}


// resive/reqast data and call crita messege
async function resiveData()
{
    const response = await fetch('/MSB', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    
    const wholeChat = await response.json()
    criateMessege(wholeChat)
}

// put all new messeges on screnn and call scrollToBottom
function criateMessege(chat)
{
    for(let i = arrsNeedToAdd(chat); i < chat.length; i++)
    {
        const newMessege = document.createElement('p');
        screenDiv.appendChild(newMessege)
        newMessege.innerText = chat[i].data;
        // syleing the meeseg booble
            
            newMessege.style.paddingLeft = '2px'
            newMessege.style.margin = '5px'
            newMessege.style.marginTop = '7px'
            newMessege.style.marginBottom = '0px'
            newMessege.style.maxWidth= 'auto';
            newMessege.style.height= 'word-wrap';
            
             // if it is my messege than put the blak bar on the left side else put it on the right side
            if(chat[i].userId === userId)
                newMessege.style.borderLeft= '5px solid #000000';
            else
                newMessege.style.borderRight= '5px solid #000000';

            newMessege.style.borderTop = '2px solid #000000';
            newMessege.style.borderBottom = '2px solid transparent';
            newMessege.style.overflowWrap = 'break-word';
            newMessege.style.color = 'white'
            // color the messege acording to the user
            newMessege.style.backgroundColor = '#'+chat[i].userId;
             

        // adds the now visible messege to the array of visible messeges
        messegesOnScreen.push(chat[i]);
        // scrol down
        scrollToBottom();
    }
}
// Function to scroll the bottom of the #screen
function scrollToBottom() {
    screenDiv.scrollTop = screenDiv.scrollHeight;
  }
// compers the entire chat to the messeges on the screen and returns the i of how far behined the screen is
function arrsNeedToAdd(chat)
{// sends back the position of the chat array from what is new 
    for(let j = messegesOnScreen.length-1; j >= 0; j--)
    {
        for(let i = chat.length-1; i >= 0; i--)
        {
            if(chat[i].messegId == messegesOnScreen[j].messegId)
            {
                return i+1;
            }
        }
    }
    return 0;

}
function main()
{
    // update the arr 
    resiveData()
}
setInterval(main, 250);