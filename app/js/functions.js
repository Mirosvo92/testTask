(function () {

    function counter(string, x, y) {
        var rez = {};
        var argumentsLen = arguments.length - 1;

        for(var i = 0; i <= argumentsLen; i++) {
            if (arguments[i] !== string) {
                rez[arguments[i].toUpperCase()] = 0;
            }
        }

        string.toUpperCase().split('').forEach( function (letter) {
            if (Object.keys(rez).indexOf(letter) !== -1) {
                rez[letter] += 1;
            }
        });

        return JSON.parse(JSON.stringify(rez).toLowerCase());

    }

    // console.log(counter('hhyyffllxxxllxxyyhhhhhx', 'x', 'y', 'h'));
    console.log(counter('XyxyXYxyXXyy', 'X', 'y'));

}());