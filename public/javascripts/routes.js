function deleteRoute(routeId) {
    $.ajax({
        url: '/route/' + routeId + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({routeId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res);
            $("#"+routeId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

function createRoute(name, temperature, humidity) {
    console.log("name =" + name);
    console.log("temperature =" + temperature);
    console.log("humidity =" + humidity);
    $.ajax({
        url: '/createRouteJSON',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({name, temperature, humidity}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res);
            responseHandlerRoutes(res);
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

function responseHandlerRoutes(response) {
    $(function () {
        $.each(response, function (i, item) {
            var $tr = $('<tr>').append(
                $('<td>').append($('<span>').text(response[i].name)),
                $('<td>').append($('<span>').text(response[i].temperature)),
                $('<td>').append($('<span>').text(response[i].humidity)),
                $('<td>').append("<a href='http://www.google.com'>Details</a>"),
                $('<td>').append("<a href='http://www.google.com'>View</a>"),
                $('<td>').append("<a href='http://www.google.com'>Delete</a>"),
                $('<td>').append("OK"),
            ).appendTo('#table_routing');
           // console.log($tr.wrap('<p>').html());
        });
    });
}