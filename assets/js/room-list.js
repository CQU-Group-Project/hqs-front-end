let xmlhttp;

var baseUrl = "http://localhost:8088/api/"

var employeeList = [];
var datatablesSimple;

var spinner = document.getElementById("spinner");
var table = document.getElementById("table");
spinner.style.display = "block";
table.style.display = "none"




window.addEventListener('DOMContentLoaded', event => {

    xmlhttp = new XMLHttpRequest();
    getRoomList();
    datatablesSimple = document.getElementById('datatablesSimple');

    // Check if the URL parameters contain a "deleted" parameter
    const urlParams = new URLSearchParams(window.location.search);
    const deletedParam = urlParams.get('deleteId');

    if (deletedParam) {
        deleteRoom(deletedParam)

        const urlWithoutParams = window.location.href.split('?')[0];
        // Use the modified URL to reload the page
        window.location.href = urlWithoutParams;

    }
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
                        <td> 
                            <a href="/admin/room/room-list.html?deleteId= ${rowData.id}">Delete</a>
                            <a href="/admin/room/room-edit.html?roomId= ${rowData.id}">Edit</a>
                        </td>
                    `;

                    // Attach a click event listener to the "Delete" link
                    // const deleteLink = newRow.querySelector('.delete-room');



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

function deleteRoom(id) {
    var deleteUrl = baseUrl + "room/" + id;
    var deleteXhr = new XMLHttpRequest();
    deleteXhr.open('DELETE', deleteUrl, true);
    deleteXhr.send();

    deleteXhr.onreadystatechange = function () {
        if (deleteXhr.readyState === 4) {
            if (deleteXhr.status === 204) {
                // Employee deletion was successful
                // Get the current URL without the query parameters
                const urlWithoutParams = window.location.href.split('?')[0];

                // Use the modified URL to reload the page
                window.location.href = urlWithoutParams;
            } else {
                // Handle the HTTP error for the delete request
                console.error('Failed to delete room:', deleteXhr.status);
            }
        }
    };
}