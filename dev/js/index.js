/* Fetch Variables */
const url = "https://api.nasa.gov/planetary/earth/assets";
const api_key = "BejZa0HMnDBA7j6noiXPNNaNcY8jJ7q3OWYc8Tii";
const dim = 0.08;

/* HTML Elements */
const search_form = document.querySelector(".rsm_nasa__form");
const search_input = document.querySelector("#latlon");
const result_image = document.querySelector(".rsm_nasa__result__image");
const date_input = document.querySelector("#search_date");
const form_message = document.querySelector(".rsm_nasa__form__message");

window.onload = load;

function load() {
    search_form.addEventListener("submit", getData);
    result_image.addEventListener("load", function(event) {
        cleanMessage();
    })
}

function getData (event) {
    event.preventDefault();
    result_image.src = "";
    addFormMessage("<img src='assets/loading.png' class='rsm_nasa__form__search_icon'> Searching...","info", 0);
    let input_value = search_input.value.trim();
    let date_value = date_input.value;
    let [longitude, latitude] = input_value.split(";");

    if(typeof latitude == "undefined" || latitude == '') {
        addFormMessage("Error: You entered a wrong latitude or you entered a wrong format", "error");
    } else {
        fetch(`${url}?lon=${longitude.trim()}&lat=${latitude.trim()}&date=${date_value}&dim=${dim}&api_key=${api_key}`)
        .then(response => response.json())
        .then(response => {
            addFormMessage("<img src='assets/loading.png' class='rsm_nasa__form__search_icon'> Drawing...","info", 0)
            if(response.hasOwnProperty('url')) {
                result_image.src = response.url;
            } else {
                addFormMessage("Error: "+response.msg, "error");
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

function addFormMessage(message, type = "info", msgTime = 5000 ) {
    form_message.innerHTML = message;
    if(msgTime == 0) {
        form_message.classList.add(`rsm_nasa__form__message--${type}`)
    } else {
        form_message.classList.add(`rsm_nasa__form__message--${type}`)
        setInterval(() => {
            cleanMessage();
        }, msgTime)
    }
}

function cleanMessage() {
    form_message.innerHTML = "";
    form_message.classList.remove(`rsm_nasa__form__message--info`)
    form_message.classList.remove(`rsm_nasa__form__message--error`)
}