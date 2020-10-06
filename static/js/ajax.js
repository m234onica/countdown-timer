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
var countDown = new Date('JAN 01, 2021 00:00:00');

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
        $("#pig-img").attr("src", "./static/image/timeout/pig2xxxhdpi.png");

        $(".days").text(Math.abs(days));
        $(".hours").text(Math.abs(hours));
        $(".minutes").text(Math.abs(minutes));
        $(".seconds").text(Math.abs(seconds));
    } else {

        $(".days").text(days);
        $(".hours").text(hours);
        $(".minutes").text(minutes);
        $(".seconds").text(seconds);
    }
}

// share link
$(function () {
    $(".share-btn").snsShare("", window.location.href);

    var btn = document.getElementById("share-link");

    var shareData = {
        url: window.location.href,
        title: "瘦肉精豬肉進口倒數計時器",
        text: "萊豬不要來，力挺台灣豬！瘦肉精豬肉，我吞不下去！"
    };

    btn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share(shareData);

        } else {
            var input = document.createElement('input');
            input.value = window.location.href;

            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');

            alert("複製成功！\n");
            document.body.removeChild(input);
        }

        gtag('event', 'Share', {
            'event_category': 'UIEvent',
            'event_label': 'Native'
        });
    });

    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });

    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
    });
})