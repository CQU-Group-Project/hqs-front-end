// window.onload = init;

var baseurl = "http://localhost:8088/api/";

var errorMsg = false;

// function init() {

//     validateForm();

// }

document.addEventListener("DOMContentLoaded", function () {
    console.log("Register guest called............")
    let registerCreateBtn = document.getElementById("registerBtn");
    // let passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('confirmPassword');

    // if (passwordInput) {
    //     passwordInput.addEventListener('input', event => {
    //         validatePassword();
    //     });
    // }

    if (passwordConfirmInput) {
        passwordConfirmInput.addEventListener('input', event => {
            validatePassword();
        });
    }

    if (registerCreateBtn) {
        registerCreateBtn.addEventListener('click', event => {
            event.preventDefault();
            registerGuest();
        });
    }

    validateForm();
})


function registerGuest() {


    var url = baseurl + "guest";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const formtosubmit = document.getElementById('registerForm');
    const formData = new FormData(formtosubmit);
    const formJSON = Object.fromEntries(formData.entries());
    formJSON.role = "GUEST";
    formJSON.country = "Australia"
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

function validatePassword() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("passwordError").innerHTML = "Passwords do not match.";
        errorMsg = true;
    } else {
        document.getElementById("passwordError").innerHTML = "";
        errorMsg = false;
    }
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
            window.open("login.html", "_self");
        }
    }, 1000);
}

function validateForm() {
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.getElementById('registerBtn');
    const requiredFields = registerForm.querySelectorAll('[required]');

    let isValid = true;
    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            isValid = false;
        }
    });

    console.log(isValid);
    console.log("error msg", errorMsg)

    if (isValid && !errorMsg) {
        registerBtn.removeAttribute('disabled');
    } else {
        registerBtn.setAttribute('disabled', 'disabled');
    }


    requiredFields.forEach(field => {
        field.addEventListener('input', validateForm);
    });
}