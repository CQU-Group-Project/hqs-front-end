// window.onload = init;

var baseurl = "http://localhost:8088/api/";

var errorMsg = false;


document.addEventListener("DOMContentLoaded", function () {

    let loginBtn = document.getElementById("loginBtn");
   

    if (loginBtn) {
        loginBtn.addEventListener('click', event => {
            event.preventDefault();
            login();
        });
    }

    validateForm();
})


function login() {


    var url = baseurl + "user/login";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const formtosubmit = document.getElementById('loginForm');
    const formData = new FormData(formtosubmit);
    const formJSON = Object.fromEntries(formData.entries());
 
    var jsonString = JSON.stringify(formJSON, null, 2);
    xhr.send(jsonString);

    xhr.onreadystatechange = function () {
        var response = xhr.responseText;
        var responseObj = JSON.parse(response);
        
        if (xhr.readyState === 4) {

            snackBar(responseObj);

        }
    };


}



function snackBar(obj) {

    console.log(obj);
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    x.className = obj.message == "Successful" ? "success" : "error";
    x.innerHTML = obj.message;

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("error", "");
        x.className = x.className.replace("success", "")
        if (obj.message == "Successful") {
            if(obj.detail.role=='ADMIN') {
                window.open("admin/dashboard.html")
            }else{
                window.open("index.html", "_self");
            }
            
        }
    }, 1000);
}

function validateForm() {
    const loginForm = document.getElementById('loginForm');
    const loginbtn = document.getElementById('loginBtn');
    const requiredFields = loginForm.querySelectorAll('[required]');

    let isValid = true;
    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            isValid = false;
        }
    });

    console.log(isValid);
    console.log("error msg", errorMsg)

    if (isValid && !errorMsg) {
        loginbtn.removeAttribute('disabled');
    } else {
        loginbtn.setAttribute('disabled', 'disabled');
    }


    requiredFields.forEach(field => {
        field.addEventListener('input', validateForm);
    });
}