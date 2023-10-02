// window.onload = init;

var baseurl = "http://localhost:8088/api/";
var editId;

document.addEventListener("DOMContentLoaded", function () {
    let roomCreateBtn = document.getElementById("createBtn");

    console.log('here')
    // Check if the URL parameters contain a "deleted" parameter
    const urlParams = new URLSearchParams(window.location.search);
    const editParam = urlParams.get('roomId');
    editId = editParam;

    if (editParam) {
        getRoomById(editParam)
    }

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
    xhr.open('PUT', url, true);
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
    formJSON.id=editId;

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
    }, 3000);
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


function getRoomById(id) {

    console.log(id)

    var editUrl = baseurl + "room/" + id;
    var roomXhr = new XMLHttpRequest();
    roomXhr.open('GET', editUrl, true);
    roomXhr.send();

    roomXhr.onreadystatechange = function () {
        var response = roomXhr.response;
        let responseObj = JSON.parse(response);
        roomObj = responseObj.detail;

        if (roomXhr.readyState === 4) {
            const roomNumber = document.getElementById('roomNumber');
            roomNumber.value = roomObj.roomNumber;
            const roomType = document.getElementById('roomType');
            roomType.value = roomObj.roomType.name;
            const priceInput = document.getElementById('price');
            priceInput.value = roomObj.price;
            const maxOccupancyInput = document.getElementById('maxOccupancy');
            maxOccupancyInput.value = roomObj.roomType.maxOccupancy;
            const amentitiesInput = document.getElementById('amentities');
            amentitiesInput.value = roomObj.roomType.amentities;
            const descriptionInput = document.getElementById('description');
            descriptionInput.value = roomObj.description;
            validateForm();
        }
    };
}