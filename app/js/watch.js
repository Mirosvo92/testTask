(function () {

    // @setting: {
    // id: string(id of element)}
    function Watch(settings) {
        this.init(settings);
        setInterval(this.drawWatchFace.bind(this), 1000);
    }

    Watch.prototype.init = function(setting) {
        this.watchWrapper = document.getElementById(setting.id);
        this.watchContext = this.watchWrapper.getContext("2d");
        this.watchRadius = this.watchWrapper.height / 2;
        this.watchContext.translate(this.watchRadius, this.watchRadius);
        this.watchRadius =  this.watchRadius * 0.80;
    };

    Watch.prototype.drawWatchFace = function () {
        this.watchContext.beginPath();
        this.watchContext.arc(0, 0, this.watchRadius, 0, 2 * Math.PI);
        this.watchContext.fillStyle = 'white';
        this.watchContext.fill();
        this.watchContext.lineWidth = this.watchRadius * 0.1;
        this.watchContext.stroke();
        // point
        this.watchContext.beginPath();
        this.watchContext.arc(0, 0, this.watchRadius * 0.1, 0, 2 * Math.PI);
        this.watchContext.fillStyle = 'black';
        this.watchContext.fill();
        this.drawNumbers();
    };

    Watch.prototype.drawNumbers = function() {
        var angle;
        this.watchContext.font = this.watchRadius * 0.15 + "px arial";
        this.watchContext.textBaseline = "middle";
        this.watchContext.textAlign = "center";

        for(var numbers = 1; numbers < 13; numbers++){
            angle = numbers * Math.PI / 6;
            this.watchContext.rotate(angle);
            this.watchContext.translate(0, -this.watchRadius * 0.85);
            this.watchContext.rotate(-angle);
            this.watchContext.fillText(numbers.toString(), 0, 0);
            this.watchContext.rotate(angle);
            this.watchContext.translate(0, this.watchRadius * 0.85);
            this.watchContext.rotate(-angle);
        }
        this.setTime();
    };

    Watch.prototype.setTime = function() {
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        //hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) +
               (minute * Math.PI / (6 * 60)) +
               (second * Math.PI / (360 * 60));
        // hours
        this.drawArrows( hour, this.watchRadius * 0.5, this.watchRadius * 0.07);
        //minutes
        minute=(minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        this.drawArrows(minute, this.watchRadius * 0.8, this.watchRadius * 0.07);
    };

    Watch.prototype.drawArrows = function(pos, length, width) {
        this.watchContext.beginPath();
        this.watchContext.lineWidth = width;
        this.watchContext.lineCap = "round";
        this.watchContext.moveTo(0,0);
        this.watchContext.rotate(pos);
        this.watchContext.lineTo(0, -length);
        this.watchContext.stroke();
        this.watchContext.rotate(-pos);
    };

    var watch = new Watch({id: 'js-watch'});

}());