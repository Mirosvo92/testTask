(function () {

    function counter(string) {
        var stringArray = string.toUpperCase().match(/([a-zA-Z])\1*/g)||[];
        var rez = {};
        var argumentsLen = arguments.length - 1;

        for(var i = 0; i <= argumentsLen; i++) {
            if (arguments[i] !== string) {
                rez[arguments[i].toUpperCase()] = 0;
            }
        }

        stringArray.forEach( function (letter) {
            if (Object.keys(rez).indexOf(letter[0]) !== -1 && letter.length > 1) {
                rez[letter[0]] += letter.length;
            }
        });

        return rez;
    }

    console.log(counter('hhyyffllxxxllxxyyhhhhhx', 'x', 'y', 'h'));
    console.log(counter('xxxdxyyyYyyxxyx', 'x', 'y'));

}());