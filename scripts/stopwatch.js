class Stopwatch {
    constructor(elem) {
        let time = 0;
        let offset;
        let interval;

        function update() {
            if (this.isOn) {
                time += delta();
            }

            elem.textContent = timeFormatter(time);
        }

        function show(time) {
            const km = document.getElementById('kilometer');
            const m = document.getElementById('mile');
            km.textContent = ((time / 1000) / 3).toFixed(2).toString() + ' km';
            m.textContent = ((time / 1000) / 5).toFixed(2).toString() + ' miles';
        }

        function clear() {
            const km = document.getElementById('kilometer');
            const m = document.getElementById('mile');
            km.textContent = '0 km'
            m.textContent = '0 miles'
        }

        function delta() {
            let now = Date.now();
            let timePassed = now - offset;

            offset = now;

            return timePassed;
        }

        function timeFormatter(time) {
            time = new Date(time);

            let minutes = time.getMinutes().toString();
            let seconds = time.getSeconds().toString();
            let milliseconds = time.getMilliseconds().toString();

            if (minutes.length < 2) {
                minutes = '0' + minutes;
            }

            if (seconds.length < 2) {
                seconds = '0' + seconds;
            }

            while (milliseconds.length < 3) {
                milliseconds = '0' + milliseconds;
            }

            return minutes + ' : ' + seconds + ' . ' + milliseconds;
        }

        this.start = function () {
            clear()
            time = 0;
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
            update();
        };

        this.stop = function () {
            show(time);
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        };

        this.isOn = false;
    }
}

