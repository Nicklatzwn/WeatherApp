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

function createPoint(point_coordinate_x, point_coordinate_y, date_point,) {
    console.log("point_coordinate_x =" + point_coordinate_x);
    console.log("point_coordinate_y =" + point_coordinate_y);
    console.log("date_point =" + date_point);
    $.ajax({
        url: '/createPointJSON',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({point_coordinate_x, point_coordinate_y, date_point}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res);
            responseHandlerPoints(res)
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
                $('<td>').append($('<span>').text(response[i].coordinate_x)),
                $('<td>').append($('<span>').text(response[i].coordinate_y)),
                $('<td>').append($('<span>').text(new Date(response[i].reachedAt).getFullYear())),
                $('<td>').append("OK"),
                $('<td>').append("<a href='http://www.google.com'>Delete</a>"),
            ).appendTo('#table_pointing');
            // console.log($tr.wrap('<p>').html());
        });
    });
}