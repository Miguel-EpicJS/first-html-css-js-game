const timer = document.getElementById('time')
let sec = 60;
let counter = setInterval(function () {
    if (sec >= 60) {
        timer.innerHTML = sec % 60 < 10 ? `0${Math.floor(sec/60)}:0${sec % 60}` : `${Math.floor(sec/60)}:${sec % 60}`;
    }else{
        timer.innerHTML = sec % 60 < 10 ? '00:' + '0' + sec : '00:' + sec;
    }
    sec--;
    if (sec < 0) {
        clearInterval(counter);
        alert("O tempo acabou")
        location.reload()
    }
}, 1000);