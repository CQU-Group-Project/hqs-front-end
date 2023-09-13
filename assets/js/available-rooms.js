var availableRooms = localStorage.getItem('roomAvailability');
var roomObj = JSON.parse(availableRooms);


var requestObject = localStorage.getItem('searchRequest');
var requestObj = JSON.parse(requestObject);

var userObject = localStorage.getItem('userResponse');
var userObj = JSON.parse(userObject);

var period = document.getElementById('period');


console.log(roomObj);
console.log(requestObj);


function getPeriod() {
    return period.textContent = "for " + getTotalDays(requestObj) + " nights, " + requestObj.totalNoOfRooms + " rooms";
}

function getTotalDays(requestObj) {
    // Ensure date strings are in 'YYYY-MM-DD' format
    const checkInDateParts = requestObj.checkInDate.split('-');
    const checkOutDateParts = requestObj.checkOutDate.split('-');

    if (checkInDateParts.length !== 3 || checkOutDateParts.length !== 3) {
        throw new Error('Invalid date format. Use YYYY-MM-DD.');
    }

    const checkInDate = new Date(checkInDateParts[0], checkInDateParts[1] - 1, checkInDateParts[2]);
    const checkOutDate = new Date(checkOutDateParts[0], checkOutDateParts[1] - 1, checkOutDateParts[2]);

    // Calculate the time difference in milliseconds
    const timeDifference = checkOutDate - checkInDate;

    // Calculate the number of days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}


var pricingCard = document.getElementById("pricing-container");

var content = '';

for (let i = 0; i < roomObj.length; i++) {
    content += '<div class="col-lg-4 col-sm-12 col-12 pb-4"> <div class=" pricing-detail py-5 text-center"> <div class="row"> <div class="col-md-12"> <section id="carousel"> <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel"> <div class="carousel-inner"> <div class="carousel-item active"> <img src="assets/images/hotel-queensland-4.jpg" class="d-block carousel-img-r w-100" alt="..."> </div> <div class="carousel-item"> <img src="assets/images/hotel-queensland-2.jpg" class="d-block carousel-img-r w-100" alt="..."> </div> <div class="carousel-item"> <img src="assets/images/hotel-queensland-3.jpg" class="d-block carousel-img-r w-100" alt="..."> </div> </div> <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="visually-hidden">Previous</span> </button> <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="visually-hidden">Next</span> </button> </div> </section> </div>';

    for (let j = 0; j < roomObj[i].rooms.length; j++) {
        content += '<div class="content monthly pt-2 text-center"> <p class="fw-6 mb-1">' + roomObj[i].rooms[j].roomType.name + '- (' + roomObj[i].rooms[j].roomNumber + ')' + ' <span style="font-weight:300">  @ $' + roomObj[i].rooms[j].price + '/night </span> </p> </div> <div class="content yearly pt-2"> </div>  <div class="content yearly pt-2"> <p> ' + getAmenitites(roomObj[i].rooms[j].roomType.amentities) + ' </p> </div>'

    }
    content += '<div class=" "> <p class="mb-0 fw-6" id="totalPrice">Total AUD $ ' + getPrice(roomObj[i].totalPrice, getTotalDays(requestObj)) + '</p> <p class="mb-0" id="period">' + getPeriod() + '</p> <p class="mb-0">includes tax & fees</p> </div>'

    content += '</div> <div class="pricing-button mt-2"> <button class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button"  id="book-now-' + i + '">Book Now</button> </div> </div> </div>';

}

if (roomObj.length == 0) {
    content += ' <p class="text-center">No Rooms Available</p>'
}

pricingCard.innerHTML = content;

function getAmenitites(amenities) {

    var context = '';

    if (amenities.includes("Pool")) {
        context += '<span class="me-2"><i class="fas fa-swimmer"></i> Pool</span>'
    }
    if (amenities.includes("Tub")) {
        context += '<span class="me-2"><i class="fas fa-hot-tub"></i> Hot Tub</span>'
    }
    if (amenities.includes('Kitchen')) {
        context += '<span class="me-2"><i class="fas fa-sink"></i> Kitchen</span>'
    }
    if (amenities.includes('Wifi')) {
        context += '<span class="me-2"><i class="fas fa-wifi"></i> Wifi</span>'
    }

    return context;

}

function getPrice(unitPrice, totalDays) {
    return unitPrice * totalDays;
}


var selectedRoomObj;
document.addEventListener("DOMContentLoaded", function () {
    // Added a click event listener to each "Book Now" button
    for (let i = 0; i < roomObj.length; i++) {
        const button = document.getElementById(`book-now-${i}`);

        if (!userObj) {
            console.log('YESSSSSSSSSS')
            button.setAttribute('disabled', 'true');
        } else if (userObj.role != 'GUEST') {
            button.setAttribute('disabled', 'true');
        }
        else {
            button.removeAttribute('disabled')
        }

        if (button) {
            button.addEventListener('click', event => {
                event.preventDefault();
                selectedRoomObj = roomObj[i];
                // console.log("Selected Room Obj: ", selectedRoomObj);

                var bookingDetail = document.getElementById('booking-detail');

                bookingDetailcontent = '';

                for (let j = 0; j < roomObj[i].rooms.length; j++) {
                    bookingDetailcontent += '<div class="content monthly pt-2 "> <p class="fw-6 mb-0">' + roomObj[i].rooms[j].roomType.name + '- (' + roomObj[i].rooms[j].roomNumber + ')' + ' <span style="font-weight:300">  @ $' + roomObj[i].rooms[j].price + '/night </span> </p> </div> <div class="content yearly pt-2"> </div>  <div class="content yearly pt-2"> <p> ' + getAmenitites(roomObj[i].rooms[j].roomType.amentities) + ' </p> </div>'
                    bookingDetailcontent += '  <div class=" "> <p class="mb-0 "><span> ' + roomObj[i].rooms[j].description + '</p> </div> <hr>'
                }

                bookingDetailcontent += '<div class="content yearly pt-2"> <p> <span class="me-2"> <span class="fw-6">Check In/Out Date:</span> ' + requestObj.checkInDate + ' to ' + requestObj.checkOutDate + ' </span> </p> <p> <span class="me-2"><span class="fw-6">Total Guests:</span> ' + requestObj.guest + ' </span> </p> <p> <span class="me-2"><span class="fw-6">Total Rooms:</span> ' + requestObj.totalNoOfRooms + ' </span> </p> </div>'
                bookingDetailcontent += ' <hr> <div class=" "> <p class="mb-0 "><span class="fw-6">Total Amount:</span> $ ' + getPrice(roomObj[i].totalPrice, getTotalDays(requestObj)) + '</p> </div>'
                bookingDetail.innerHTML = bookingDetailcontent;

                // Now you can use the index as needed
            });
        }
    }


    let confirmBookingBtn = document.getElementById('confirm-booking');
    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener('click', event => {
            event.preventDefault();
            confirmBooking(selectedRoomObj)
        });

    }

    let closeBtn = document.getElementById('close');
    if (closeBtn) {
        closeBtn.addEventListener('click', event => {
            event.preventDefault();
            window.open("index.html", "_self");
        });

    }

})


function confirmBooking(selectedRoomObj) {
    console.log(selectedRoomObj)
    var url = baseurl + "booking/confirm";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // const formtosubmit = document.getElementById('registerForm');
    const formData = new FormData();
    const formJSON = Object.fromEntries(formData.entries());
    formJSON.guestId = userObj.guest.id;
    formJSON.checkInDate = requestObj.checkInDate;
    formJSON.checkOutDate = requestObj.checkOutDate;
    formJSON.roomId = getBookedRoomIds(selectedRoomObj)
    formJSON.totalAmount = getPrice(selectedRoomObj.totalPrice, getTotalDays(requestObj))
    var jsonString = JSON.stringify(formJSON, null, 2);
    console.log(jsonString);
    xhr.send(jsonString);

    xhr.onreadystatechange = function () {
        var response = xhr.responseText;
        var responseObj = JSON.parse(response);
        if (xhr.readyState === 4) {

            console.log(responseObj);

            var confirmation = document.getElementById('booking-success');
            var confirmationContent = '';
            if (responseObj.message == 'Successful') {
                confirmationContent += '<p>Booking Successful !</p> <p class="text-justify"> We are excited to confirm your reservation at Hotel Queensland. </p> <p class="text-justify">We look forward to providing you with a memorable and comfortable stay. If you have any questions, require further assistance, or need to make any changes to your reservation, please do not hesitate to contact us at 045 185 691 or booking@hotelqueensland.com.au</p> <p class="text-justfy">Thank you for choosing Hotel Queensland. We cannot wait to welcome you!</p>'

            }
            else {
                confirmationContent += '<p style="color:red">Booking Unsuccessful !</p> <p class="text-justify">' + responseObj.message + ' </p>'
            }
            confirmation.innerHTML = confirmationContent;

        }
    };

}

function getBookedRoomIds(obj) {
    let ids = [];
    obj.rooms.forEach((room) => {
        ids.push(room.id)
    })
    return ids;
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
            window.open("login.html", "_self");
        }
    }, 1000);
}

