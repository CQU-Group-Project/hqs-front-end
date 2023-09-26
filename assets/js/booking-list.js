let xmlhttp;

var baseUrl = "http://localhost:8088/api/"

var bookingList = [];
var datatablesSimple;

var spinner = document.getElementById("spinner");
var table = document.getElementById("table");
spinner.style.display = "block";
table.style.display = "none"

window.addEventListener('DOMContentLoaded', event => {

    xmlhttp = new XMLHttpRequest();
    getBookingList();
    datatablesSimple = document.getElementById('datatablesSimple');
});


function getBookingList() {
    var url = baseUrl + "booking";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        var response = xhr.response;
        let responseObj = JSON.parse(response);
        bookingList = responseObj.detail;

        if (xhr.readyState === 4) {
            if (datatablesSimple) {
                const dataTableBody = document.getElementById('dataTableBody');

                bookingList.forEach(rowData => {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${rowData.bookingNumber}</td>
                        <td>${rowData.checkInDate[0]}- ${rowData.checkInDate[1]}- ${rowData.checkInDate[2]}</td>
                        <td>${rowData.checkOutDate[0]}- ${rowData.checkOutDate[1]}- ${rowData.checkOutDate[2]}</td>
                        <td> ${rowData.roomList.length > 0 ? rowData.roomList.map(room => room.roomNumber).join(', ') : '101'}</td>
                        <td>$ ${rowData.totalAmount}</td>
                        <td>Deependra Karki</td>
                        <td>${rowData.createdDate[0]}- ${rowData.createdDate[1]}- ${rowData.createdDate[2]}</td>
                    `;
                    dataTableBody.appendChild(newRow);
                });

                new simpleDatatables.DataTable(datatablesSimple);

                setTimeout(() => {
                    spinner.style.display = "none";
                    table.style.display = "block"
                }, 200);
            }
        }
    };

}