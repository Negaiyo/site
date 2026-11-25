(function () {
    'use strict';

    var heartsLayer = document.getElementById('hearts');
    var messagesLayer = document.getElementById('messages');
    if (!heartsLayer || !messagesLayer) return;

    var symbols = ['❤', '💖', '💕', '💗', '💘', '💝'];
    var phrase = 'Ура! Напиши когда тебя встретить';

    function random(min, max) {
        return min + Math.random() * (max - min);
    }

    function spawnHeart() {
        var heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = random(2, 96) + 'vw';
        heart.style.fontSize = random(18, 46) + 'px';
        heart.style.setProperty('--rot', random(-25, 25) + 'deg');
        heart.style.setProperty('--drift', random(-90, 90) + 'px');
        heart.style.animationDuration = random(3.8, 7) + 's';
        heartsLayer.appendChild(heart);

        heart.addEventListener('animationend', function () {
            heart.remove();
        });
    }

    function spawnMessage() {
        var message = document.createElement('span');
        message.className = 'message';
        message.textContent = phrase;
        message.style.left = random(10, 90) + 'vw';
        message.style.top = random(12, 85) + 'vh';
        message.style.animationDuration = random(3.8, 5.5) + 's';
        messagesLayer.appendChild(message);

        message.addEventListener('animationend', function () {
            message.remove();
        });
    }

    for (var i = 0; i < 22; i += 1) {
        window.setTimeout(spawnHeart, i * 130);
    }

    for (var j = 0; j < 4; j += 1) {
        window.setTimeout(spawnMessage, j * 500);
    }

    window.setInterval(spawnHeart, 380);
    window.setInterval(spawnMessage, 1200);
})();
