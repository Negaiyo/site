(function () {
    'use strict';

    var button = document.getElementById('noButton');
    if (!button) return;

    var SAFE_DISTANCE = 140;
    var placeholder = null;

    function padding() {
        return window.innerWidth < 600 ? 12 : 18;
    }

    function freezeButton(rect) {
        if (placeholder) return;

        placeholder = document.createElement('span');
        placeholder.className = 'no-placeholder';
        placeholder.style.width = rect.width + 'px';
        placeholder.style.height = rect.height + 'px';
        button.parentNode.insertBefore(placeholder, button);

        button.classList.add('is-running');
        button.style.width = rect.width + 'px';
        button.style.height = rect.height + 'px';
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function moveAway(pointerX, pointerY, force) {
        if (typeof pointerX !== 'number' || typeof pointerY !== 'number') return;

        var rect = button.getBoundingClientRect();
        var currentX = rect.left + rect.width / 2;
        var currentY = rect.top + rect.height / 2;
        var currentDistance = Math.hypot(currentX - pointerX, currentY - pointerY);

        if (!force && currentDistance > SAFE_DISTANCE) return;

        freezeButton(rect);

        var pad = padding();
        var width = button.offsetWidth;
        var height = button.offsetHeight;
        var maxX = Math.max(pad, window.innerWidth - width - pad);
        var maxY = Math.max(pad, window.innerHeight - height - pad);

        var best = null;
        var bestDistance = -1;

        for (var i = 0; i < 60; i += 1) {
            var x = pad + Math.random() * Math.max(0, maxX - pad);
            var y = pad + Math.random() * Math.max(0, maxY - pad);
            var distance = Math.hypot(x + width / 2 - pointerX, y + height / 2 - pointerY);

            if (distance > bestDistance) {
                bestDistance = distance;
                best = { x: x, y: y };
            }
        }

        if (!best || (!force && bestDistance <= currentDistance)) return;

        button.style.left = clamp(best.x, pad, maxX) + 'px';
        button.style.top = clamp(best.y, pad, maxY) + 'px';
    }

    document.addEventListener('pointermove', function (event) {
        if (event.pointerType !== 'touch') {
            moveAway(event.clientX, event.clientY, false);
        }
    }, { passive: true });

    button.addEventListener('mouseenter', function (event) {
        moveAway(event.clientX, event.clientY, false);
    });

    button.addEventListener('pointerdown', function (event) {
        if (event.pointerType === 'touch' || event.pointerType === 'pen') {
            event.preventDefault();
        }
        moveAway(event.clientX, event.clientY, true);
    });

    button.addEventListener('touchstart', function (event) {
        if (window.PointerEvent) return;

        event.preventDefault();
        var touch = event.touches[0];
        if (touch) {
            moveAway(touch.clientX, touch.clientY, true);
        }
    }, { passive: false });

    button.addEventListener('click', function (event) {
        event.preventDefault();
        moveAway(event.clientX, event.clientY, true);
    });

    function keepInsideViewport() {
        if (!button.classList.contains('is-running')) return;

        var rect = button.getBoundingClientRect();
        var pad = padding();
        var maxX = Math.max(pad, window.innerWidth - rect.width - pad);
        var maxY = Math.max(pad, window.innerHeight - rect.height - pad);

        button.style.left = clamp(rect.left, pad, maxX) + 'px';
        button.style.top = clamp(rect.top, pad, maxY) + 'px';
    }

    window.addEventListener('resize', keepInsideViewport);
    window.addEventListener('orientationchange', keepInsideViewport);
})();
