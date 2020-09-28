// marquee
$.get("./marquee.txt", function (data) {
    data = data.split("\n");
    data.forEach(function (line) {
        $("ul.list-inline").append(
            $("<li></li>").html(line)
        )
    })
});

// countdown timer
var timer;
var countDown = new Date('SEP 31, 2020 23:59:59');

timer = setInterval(function () {
    timeBetweenDates(countDown);
}, 1000);

function timeBetweenDates(toDate) {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    
    if (difference <= 0) {
        
        // Timer done
        clearInterval(timer);
        $(".txt").text("進入");
        $("#title-img").attr("src", "./static/image/timeout/title2xxxhdpi.png");
    } else {
        
        var seconds = Math.floor(difference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
        
        $(".days").text(days);
        $(".hours").text(hours);
        $(".minutes").text(minutes);
        $(".seconds").text(seconds);
        $(".txt").text("距離");
    }
}

// share link
$(function () {
    $(".share-btn").snsShare("", window.location.href);
})