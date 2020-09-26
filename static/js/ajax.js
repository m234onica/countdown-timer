$.get("./marquee.txt", function (data) {
    data = data.split("\n");
    data.forEach(function (line) {
        $("ul.list-inline").append(
            $("<li></li>").html(line)
        )
    })
});

var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

var countDown = new Date('DEC 31, 2021 00:00:00').getTime(),
    x = setInterval(function () {

        var now = new Date().getTime(),
            distance = countDown - now;

        document.getElementById('days').innerText = Math.floor(distance / (day)),
            document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        //if (distance < 0) {
        //  clearInterval(x);
        //  'IT'S MY BIRTHDAY!;
        //}

    }, second)


share_fb = function () {
    url = 'https://www.facebook.com/sharer/sharer.php??display=popup&u=' + window.location.href;
    options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
    window.open(url, 'sharer', options);
}