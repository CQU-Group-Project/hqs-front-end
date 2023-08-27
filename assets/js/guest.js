let xmlhttp;

var baseUrl = "http://localhost:8088/api/"

var guestList = [];
var datatablesSimple;

window.addEventListener('DOMContentLoaded', event => {

    xmlhttp = new XMLHttpRequest();
    getGuestList();
    datatablesSimple = document.getElementById('datatablesSimple');
});


function getGuestList() {
    var url = baseUrl + "guest";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        var response = xhr.response;
        let responseObj = JSON.parse(response);
        guestList = responseObj.detail;

        console.log(guestList)

        if (xhr.readyState === 4) {
            if (datatablesSimple) {
                const dataTableBody = document.getElementById('dataTableBody');

                guestList.forEach(rowData => {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${rowData.firstName} ${rowData.lastName}</td>
                        <td>${rowData.email}</td>
                        <td>${rowData.phone}</td>
                        <td>${rowData.address} , ${rowData.postalCode}, ${rowData.state}</td>
                        <td>${rowData.bookings.length}</td>
                        <td>${rowData.createdDate[0]}- ${rowData.createdDate[1]}- ${rowData.createdDate[2]}</td>
                    `;
                    dataTableBody.appendChild(newRow);
                });

                new simpleDatatables.DataTable(datatablesSimple);
            }
        }
    };

}