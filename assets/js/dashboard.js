

let xmlhttp;

var baseUrl = "http://localhost:8088/api/"

var queryList = [];
var datatablesSimple;
var roomLabels;
var roomData;
var revenueLabels;
var revenueData;
var revenueMax;

window.addEventListener('DOMContentLoaded', event => {

    xmlhttp = new XMLHttpRequest();
    getOverallReport();
    getQueryList();

    datatablesSimple = document.getElementById('datatablesSimple');
});


function getQueryList() {
    var url = baseUrl + "query";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        var response = xhr.response;
        let responseObj = JSON.parse(response);
        queryList = responseObj.detail;


        if (xhr.readyState === 4) {
            if (datatablesSimple) {
                const dataTableBody = document.getElementById('dataTableBody');
                queryList.forEach(rowData => {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${rowData.fullname}</td>
                        <td>${rowData.email}</td>
                        <td>${rowData.phoneNo}</td>
                        <td>${rowData.message}</td>
                        <td>${rowData.createdDate[0]}- ${rowData.createdDate[1]}- ${rowData.createdDate[2]}</td>
                    `;
                    dataTableBody.appendChild(newRow);
                });

                new simpleDatatables.DataTable(datatablesSimple);
            }
        }

    };

}

function getOverallReport() {
    var url = baseUrl + "report";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        var response = xhr.response;
        let responseObj = JSON.parse(response);


        if (xhr.readyState === 4) {

            // For Revenue Report
            revenueLabels = Object.keys(responseObj.detail.revenueResponse)
            revenueData = Object.values(responseObj.detail.revenueResponse)


            let revenueMax = -Infinity;

            for (const key in revenueLabels) {
                if (responseObj.detail.revenueResponse.hasOwnProperty(key)) {
                    const value = responseObj.detail.revenueResponse[key];
                    if (value > revenueMax) {
                        revenueMax = value;
                    }
                }
            }

            // For Room Report
            roomLabels = ['Occupied', 'Available', 'Unavailable']
            // roomData = [100-responseObj.detail.roomOccupancy,  responseObj.detail.roomOccupancy,0]
            roomData = [
                (100 - responseObj.detail.roomOccupancy).toFixed(2),
                responseObj.detail.roomOccupancy.toFixed(2),
                (0).toFixed(2)
            ];

            //Other stats
            var employee = document.getElementById("employeeTotal");
            employee.textContent = responseObj.detail.totalEmployee

            var guest = document.getElementById("guestTotal");
            guest.textContent = responseObj.detail.totalGuests

            var booking = document.getElementById("bookingTotal");
            booking.textContent = responseObj.detail.totalBookings

            getRevenueReport();
            getRoomReport();
        }

    };

}


function getRoomReport() {
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {

            labels: roomLabels,
            datasets: [{
                data: roomData,
                backgroundColor: ['#dc3545', '#28a745', '#ffc107', '#28a745'],
            }],
        },
    });

}

function getRevenueReport() {
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    // Bar Chart Example
    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            // labels: ["2023-09-17", "2023-09-18", "2023-09-18", "April", "May", "June"],
            labels: revenueLabels,
            datasets: [{
                label: "Revenue",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,117,216,1)",
                data: revenueData,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: revenueMax,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        display: true
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });


}