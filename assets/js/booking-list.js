let xmlhttp;

var baseUrl = "http://localhost:8088/api/"

var bookingList = [];
var datatablesSimple;

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
                        <td>${rowData.totalAmount}</td>
                        <td>Deependra Karki</td>
                        
                    `;
                    dataTableBody.appendChild(newRow);
                });

                new simpleDatatables.DataTable(datatablesSimple);
            }
        }
    };

}