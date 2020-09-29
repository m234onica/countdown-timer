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
var countDown = new Date('SEP 01, 2020 00:00:00');

timer = setInterval(function () {
    timeBetweenDates(countDown);
}, 1000);

function timeBetweenDates(toDate) {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    
    if (difference <= 0) {
        
        // Timer done
        $(".txt").text("進入");
        $(".timer-txt").text("已經");
        $("#title-img").attr("src", "./static/image/timeout/title2xxxhdpi.png");
        $("meta[property=og\\:title]").attr("content", "進入瘦肉精豬肉元年已經"+ Math.abs(days) + "天" + Math.abs(hours) + "時" + Math.abs(minutes) + "分" + Math.abs(seconds) +"秒");
        $("meta[name=twitter\\:title]").attr("content", "進入瘦肉精豬肉元年已經x天x時x秒");

        $(".days").text(Math.abs(days));
        $(".hours").text(Math.abs(hours));
        $(".minutes").text(Math.abs(minutes));
        $(".seconds").text(Math.abs(seconds));
    } else {
        $("meta[property=og\\:title]").attr("content", "進入瘦肉精豬肉元年已經" + days + "天" + hours + "時" + minutes + "分" + seconds + "秒");
        $("meta[name=twitter\\:title]").attr("content", "進入瘦肉精豬肉元年已經x天x時x秒");
        $(".days").text(days);
        $(".hours").text(hours);
        $(".minutes").text(minutes);
        $(".seconds").text(seconds);
    }
}

// share link
$(function () {
    $(".share-btn").snsShare("", window.location.href);
})