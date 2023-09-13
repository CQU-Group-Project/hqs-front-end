var baseurl = "http://localhost:8088/api/";

var errorMsg = false;

var savedUserResponse = localStorage.getItem('userResponse');

if (!savedUserResponse) {
    document.getElementById('login').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
    document.getElementById('register').style.display = 'block';

} else {
    document.getElementById('login').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('register').style.display = 'none';
    getUserDetail(savedUserResponse);
}

function getUserDetail(userObj) {
    var parsedObject = JSON.parse(userObj);
    const username = document.getElementById('username');
    if (parsedObject.guest)
        username.textContent = parsedObject.guest.firstName
    else
        username.textContent = parsedObject.employee.firstName

}

//Handle Logout Action for guest
var logoutLink = document.getElementById("logout-link");

if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href = "index.html";
    });
}


//Handle Logout Action for employee
var employeeLogoutLink = document.getElementById("logout-employee");
if (employeeLogoutLink) {
    employeeLogoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href = "../index.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {

    let searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {
        searchBtn.addEventListener('click', event => {
            event.preventDefault();
            searchRoom();
        });
    }

    validateForm();
})



function searchRoom() {


    var url = baseurl + "booking";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const formtosubmit = document.getElementById('searchForm');
    const formData = new FormData(formtosubmit);
    const formJSON = Object.fromEntries(formData.entries());
    formJSON.sortOrder = "Relevance";
    var jsonString = JSON.stringify(formJSON, null, 2);
    xhr.send(jsonString);

    xhr.onreadystatechange = function () {
        var response = xhr.responseText;
        var responseObj = JSON.parse(response);
        if (xhr.readyState === 4) {

            var response = xhr.responseText;
            var responseObj = JSON.parse(response);

            // Check if the login was successful before storing in local storage
            if (responseObj.message == "Successful") {
                // Store the response object in local storage
                localStorage.setItem('roomAvailability', JSON.stringify(responseObj.detail));
                localStorage.setItem('searchRequest', jsonString);
                window.open("rooms.html", "_self");

            }

        }
    };


}

function validateForm() {
    const searchForm = document.getElementById('searchForm');
    const searchBtn = document.getElementById('searchBtn');
    const requiredFields = searchForm.querySelectorAll('[required]');

    let isValid = true;
    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            isValid = false;
        }
    });

    if (isValid && !errorMsg) {
        searchBtn.removeAttribute('disabled');
    } else {
        searchBtn.setAttribute('disabled', 'disabled');
    }


    requiredFields.forEach(field => {
        field.addEventListener('input', validateForm);
    });
}