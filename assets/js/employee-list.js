let xmlhttp;

var baseUrl = "http://localhost:8088/api/"

var employeeList = [];
var datatablesSimple;

window.addEventListener('DOMContentLoaded', event => {

    xmlhttp = new XMLHttpRequest();
    getEmployeeList();
    datatablesSimple = document.getElementById('datatablesSimple');
});


function getEmployeeList() {
    var url = baseUrl + "employee";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        var response = xhr.response;
        let responseObj = JSON.parse(response);
        employeeList = responseObj.detail;

        console.log(employeeList)

        if (xhr.readyState === 4) {
            if (datatablesSimple) {
                const dataTableBody = document.getElementById('dataTableBody');

                employeeList.forEach(rowData => {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${rowData.firstName} ${rowData.lastName}</td>
                        <td>${rowData.email}</td>
                        <td>${rowData.phone}</td>
                        <td>${rowData.address} , ${rowData.postalCode}, ${rowData.state}</td>
                        <td>${rowData.position}</td>
                        <td>${rowData.hireDate}</td>
                        <td>${rowData.salary}</td>
                        <td>${rowData.status}</td>
                        <td>${rowData.createdDate[0]}- ${rowData.createdDate[1]}- ${rowData.createdDate[2]}</td>
                    `;
                    dataTableBody.appendChild(newRow);
                });

                new simpleDatatables.DataTable(datatablesSimple);
            }
        }
    };

}