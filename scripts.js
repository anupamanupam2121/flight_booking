// Add your API endpoint here
var API_ENDPOINT = "https://6lfxnusmp7.execute-api.us-east-1.amazonaws.com/prod";

// AJAX POST request to save flight data
document.getElementById("saveflight").onclick = function(){
    var inputData = {
        "flightid": $('#flightid').val(),
        "d_l": $('#d_l').val(),
        "a_l": $('#a_l').val(),
        "d_t": $('#d_t').val(),
		"np": $('#np').val()
    };
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data:  JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("flightSaved").innerHTML = "flight booked succesfully";
        },
        error: function () {
            alert("Error while booking.");
        }
    });
}

// AJAX GET request to retrieve all flight
document.getElementById("getflight").onclick = function(){  
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#flightTable tr').slice(1).remove();
            jQuery.each(response, function(i, data) {          
                $("#flightTable").append("<tr> \
                    <td>" + data['flightid'] + "</td> \
                    <td>" + data['d_l'] + "</td> \
                    <td>" + data['a_l'] + "</td> \
                    <td>" + data['d_t'] + "</td> \
					<td>" + data['np'] + "</td> \
					<td>" + data['status'] + "</td> \
                    </tr>");
            });
        },
        error: function () {
            alert("Error retrieving flight data.");
        }
    });
}
