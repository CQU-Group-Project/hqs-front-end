let xmlhttp;

var baseUrl = "http://localhost:8088/api/"

var employeeList = [];
var datatablesSimple;

window.addEventListener('DOMContentLoaded', event => {

    xmlhttp = new XMLHttpRequest();
    getRoomList();
    datatablesSimple = document.getElementById('datatablesSimple');
});


function getRoomList() {
    var url = baseUrl + "room";
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
                        <td>${rowData.roomNumber}</td>
                        <td>${rowData.price}</td>
                        <td>${rowData.roomType.name}</td>
                        <td>${rowData.roomType.maxOccupancy}</td>
                        <td>${rowData.roomType.amentities}</td>
                        <td>${rowData.description}</td>
                        <td>${rowData.available}</td>
                        <td>${rowData.clean}</td>
                        <td>${rowData.createdDate[0]}- ${rowData.createdDate[1]}- ${rowData.createdDate[2]}</td>
                    `;
                    dataTableBody.appendChild(newRow);
                });

                new simpleDatatables.DataTable(datatablesSimple);
            }
        }
    };

}