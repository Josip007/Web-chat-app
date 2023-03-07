const formElement = document.getElementById('message-input__form');
const messageOutput = document.getElementById('message-output');
const messageOutputText = document.getElementById('message-output__text');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message-input__message');
const messageInputLabel = document.querySelector('label[for="message-input__message"]');
const nameButton = document.getElementById('nameButton');
const message = document.getElementById('message-input');
const nameDiv = document.getElementById('yourname');

window.onload = function () {
    nameInput.focus();
}

const drone = new Scaledrone('28YYwHeJZQFVMpSQ');
drone.on('open', error => {
    console.log('connected');
});
drone.on('error', error => {
    console.error('Error with connection', error);
});
drone.on('close', event => {
    console.log('closed', event);
});
drone.on('disconnect', () => {
    console.log('Disconnected');
});
drone.on('reconnect', () => {
    console.log('reconnected');
});

const room = drone.subscribe('Chat - App');
room.on('open', error => {
    if(error) {
        return console.error(error);
    } else {
        console.log('connected to room');
    }
});

room.on('message', message => {
    const messageText = message.data;
    messageOutputText.innerHTML += `<br><br><span style="color:${color}"><br>${messageText}</span>`;
    messageOutputText.style.width = '80vw';
    messageOutputText.style.wordBreak = 'break-word';
  });

  function randomColor() {
    let color = "#";
    for (let i = 0; i < 3; i++)
      color += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
    return color;
  }

/* function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
} */

const color = randomColor();
nameButton.addEventListener('click', () => {
    if(nameInput.value === '') {
        alert('Enter your name!');
    } else {
    messageInputLabel.innerHTML = `<span style="color:${color}">${nameInput.value}'s message:</span>`;
    message.style.display = 'block';
    nameDiv.style.display = 'none';
    }
});

nameInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        if(nameInput.value === '') {
            alert('Enter your name!');
        } else {
        messageInputLabel.innerHTML = `<span style="color:${color}; background-color: lightblue">${nameInput.value}'s message:</span>`;
        message.style.display = 'block';
        nameDiv.style.display = 'none';
        messageInput.focus();
    }}
});

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    if(messageInput.value === '') {
        alert('Empty message!');
    } else {

    drone.publish({
        room: 'Chat - App',
        message:  `${nameInput.value}: ${messageInput.value}`
    });
    
    messageOutput.style.border = '1px solid black';
    messageOutput.style.borderRadius = '10px';
    messageInput.value = '';
    nameInput.focus();
    setTimeout(() => {
        window.scrollBy(0, 500);
    }, 1000)
    //messageOutputText.scrollIntoView({block: 'end'});
    /* requestAnimationFrame(() => {
        messageOutput.scrollIntoView(false);
      }); */
    }
});

document.addEventListener('keydown', (e) => {
    if(e.key === 'i') {
        e.preventDefault();
        messageInput.focus();
        nameInput.focus();
    }
});

