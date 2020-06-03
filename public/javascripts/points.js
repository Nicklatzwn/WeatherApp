function deletePoint(pointId, pointStatus, routeId) {
    $.ajax({
        url: '/point/' + pointId + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({pointId, pointStatus, routeId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res);
            location.reload();
           // $("#"+pointId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

function createPoint(point_coordinate_x, point_coordinate_y,clock_time, date_point,route_id,route_temperature,route_humidity) {

    $.ajax({
        url: '/createPointJSON',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: JSON.stringify({point_coordinate_x, point_coordinate_y, clock_time,date_point, route_id, route_temperature, route_humidity}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result by me: ", res);
            if(res.status === 'OK') {
                console.log(res.msg);
            }
            else {
                alert(res.msg);
            }
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

// function responseHandlerPoints(response) {
//     $(function () {
//         $.each(response, function (i, item) {
//             var $tr = $('<tr>').append(
//                 $('<td>').append($('<span>').text(response[i].coordinate_x)),
//                 $('<td>').append($('<span>').text(response[i].coordinate_y)),
//                 $('<td>').append($('<span>').text(new Date(response[i].reachedAt.val).getFullYear())),
//                 $('<td>').append("OK"),
//                 $('<td>').append("<a href='http://www.google.com'>Delete</a>"),
//             ).appendTo('#table_pointing');
//             // console.log($tr.wrap('<p>').html());
//         });
//     });
// }