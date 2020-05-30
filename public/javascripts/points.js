function deletePoint(pointId) {
    $.ajax({
        url: '/route/' + pointId + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({pointId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res);
            $("#"+pointId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

function createPoint(name, temperature, humidity) {
    console.log("name =" + name);
    console.log("temperature =" + temperature);
    console.log("humidity =" + humidity);
    $.ajax({
        url: '/createPointJSON',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({name, temperature, humidity}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res);
            responseHandlerPoints(res)
            //$("#"+leadId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

function responseHandlerPoints(response) {
    $(function () {
        $.each(response, function (i, item) {
            var $tr = $('<tr>').append(
                $('<td>').append($('<span>').text(response[i].name)),
                $('<td>').append($('<span>').text(response[i].temperature)),
                $('<td>').append($('<span>').text(response[i].humidity)),
                $('<td>').append("<a href='http://www.google.com'>Details</a>"),
                $('<td>').append("<a href='http://www.google.com'>View</a>"),
                $('<td>').append("<a href='http://www.google.com'>Delete</a>"),
                $('<td>').append("<a href='http://www.google.com'>OK</a>"),
            ).appendTo('#table_routing');
            // console.log($tr.wrap('<p>').html());
        });
    });
}