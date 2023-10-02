// window.onload = init;

var baseurl = "http://localhost:8088/api/";
var editId;

document.addEventListener("DOMContentLoaded", function () {
    let registerCreateBtn = document.getElementById("registerBtn");

    // Check if the URL parameters contain a "deleted" parameter
    const urlParams = new URLSearchParams(window.location.search);
    const editParam = urlParams.get('employeeId');
    editId = editParam;

    if (editParam) {
        getEmployeeById(editParam)
    }

    if (registerCreateBtn) {
        registerCreateBtn.addEventListener('click', event => {
            event.preventDefault();
            editEmployee();
        });
    }

    // validateForm();
})


function editEmployee() {

    var url = baseurl + "employee";
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const formtosubmit = document.getElementById('employeeCreateForm');
    const formData = new FormData(formtosubmit);
    const formJSON = Object.fromEntries(formData.entries());
    formJSON.role = "EMPLOYEE";
    formJSON.country = "Australia";
    formJSON.status = "ACTIVE";
    formJSON.id = editId;
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
    x.innerHTML = "Employee edited successfully.";

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


    if (isValid) {
        registerBtn.removeAttribute('disabled');
    } else {
        registerBtn.setAttribute('disabled', 'disabled');
    }


    requiredFields.forEach(field => {
        field.addEventListener('input', validateForm);
    });
}

function getEmployeeById(id) {

    var editUrl = baseurl + "employee/" + id;
    var employeeXhr = new XMLHttpRequest();
    employeeXhr.open('GET', editUrl, true);
    employeeXhr.send();

    employeeXhr.onreadystatechange = function () {
        var response = employeeXhr.response;
        let responseObj = JSON.parse(response);
        employeeObj = responseObj.detail;

        if (employeeXhr.readyState === 4) {
            const firstNameInput = document.getElementById('firstName');
            firstNameInput.value = employeeObj.firstName;
            const lastNameInput = document.getElementById('lastName');
            lastNameInput.value = employeeObj.lastName;
            const emailInput = document.getElementById('email');
            emailInput.value = employeeObj.email;
            const phoneInput = document.getElementById('phone');
            phoneInput.value = employeeObj.phone;
            const stateInput = document.getElementById('state');
            stateInput.value = employeeObj.state;
            const cityInput = document.getElementById('city');
            cityInput.value = employeeObj.city;
            const postalCodeInput = document.getElementById('postalCode');
            postalCodeInput.value = employeeObj.postalCode;
            const addressInput = document.getElementById('address');
            addressInput.value = employeeObj.address;
            const postitionInput = document.getElementById('position');
            postitionInput.value = employeeObj.position;
            const hireDateInput = document.getElementById('hireDate');
            hireDateInput.value = employeeObj.hireDate;
            const salaryInput = document.getElementById('salary');
            salaryInput.value = employeeObj.salary;

            validateForm();
        }
    };
}