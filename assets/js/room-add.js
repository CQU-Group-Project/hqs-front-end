// window.onload = init;

var baseurl = "http://localhost:8088/api/";


document.addEventListener("DOMContentLoaded", function () {
    let roomCreateBtn = document.getElementById("createBtn");

    if (roomCreateBtn) {
        roomCreateBtn.addEventListener('click', event => {
            event.preventDefault();
            createRoom();
        });
    }

    validateForm();
})


function createRoom() {

    var url = baseurl + "room";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const formtosubmit = document.getElementById('roomCreateForm');
    const formData = new FormData(formtosubmit);
    // const formJSON = Object.fromEntries(formData.entries());

    // Convert FormData to JSON object
    var formJSON = {};
    formData.forEach((value, key) => {
        formJSON[key] = value;
    });

    formJSON.roomTypeDto = {
        "id": 0,
        "name": formJSON['name'],
        "description": formJSON['description'],
        "maxOccupancy": formJSON['maxOccupancy'],
        "amentities": formJSON['amentities']
    };
    formJSON.available = true;
    formJSON.clean = true;

    var jsonString = JSON.stringify(formJSON, null, 2);

    console.log(jsonString);
    xhr.send(jsonString);

    xhr.onreadystatechange = function () {
        var response = xhr.responseText;
        var responseObj = JSON.parse(response);
        if (xhr.readyState === 4) {

            console.log(responseObj);
            snackBar(responseObj);

        }
    };


}


function snackBar(obj) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    x.className = obj.message == "Successful" ? "success" : "error";
    x.innerHTML = obj.message;

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("error", "");
        x.className = x.className.replace("success", "")
        if (obj.message == "Successful") {
            window.open("room-list.html", "_self");
        }
    }, 2000);
}

function validateForm() {
    const createForm = document.getElementById('roomCreateForm');
    const createBtn = document.getElementById('createBtn');
    const requiredFields = createForm.querySelectorAll('[required]');

    let isValid = true;
    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            isValid = false;
        }
    });


    if (isValid) {
        createBtn.removeAttribute('disabled');
    } else {
        createBtn.setAttribute('disabled', 'disabled');
    }


    requiredFields.forEach(field => {
        field.addEventListener('input', validateForm);
    });
}