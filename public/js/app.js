console.log("Loaded");
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From jS';
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    let url = `http://localhost:3000/weather?address=${location}`;
    console.log('testing', location, url);
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log("You must provide the address");
            messageOne.textContent = data.error;
        }
        else {
            console.log(data.forecast);
            messageOne.textContent = data.location;
            messageTwo.textContent = 'Temperature: '+data.forecast.temperature +' Prec: '+data.forecast.prec;
        }

    })
})
})