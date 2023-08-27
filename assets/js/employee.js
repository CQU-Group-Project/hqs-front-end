// window.onload = init;

var baseurl = "http://localhost:8088/api/";


document.addEventListener("DOMContentLoaded", function () {
    let registerCreateBtn = document.getElementById("registerBtn");

    if (registerCreateBtn) {
        registerCreateBtn.addEventListener('click', event => {
            event.preventDefault();
            createEmployee();
        });
    }

    validateForm();
})


function createEmployee() {

    var url = baseurl + "employee";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const formtosubmit = document.getElementById('employeeCreateForm');
    const formData = new FormData(formtosubmit);
    const formJSON = Object.fromEntries(formData.entries());
    formJSON.role = "EMPLOYEE";
    formJSON.country = "Australia";
    formJSON.status="ACTIVE";
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
            window.open("employee-list.html", "_self");
        }
    }, 2000);
}

function validateForm() {
    const registerForm = document.getElementById('employeeCreateForm');
    const registerBtn = document.getElementById('registerBtn');
    const requiredFields = registerForm.querySelectorAll('[required]');

    let isValid = true;
    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            isValid = false;
        }
    });


    if (isValid ) {
        registerBtn.removeAttribute('disabled');
    } else {
        registerBtn.setAttribute('disabled', 'disabled');
    }


    requiredFields.forEach(field => {
        field.addEventListener('input', validateForm);
    });
}