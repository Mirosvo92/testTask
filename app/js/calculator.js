(function () {

    // @settings {
    // input: string
    // sqr: string
    // sqrt: string
    // in: string}
    function Calculator(settings) {
        this.createControl(settings);
        this.setActions();
    }

    Calculator.prototype.createControl = function(settings) {
        this.calculatorInput = document.querySelector(settings.input);
        this.sqrButton = document.querySelector(settings.sqr);
        this.sqrtButton = document.querySelector(settings.sqrt);
        this.inButton = document.querySelector(settings.in);
    };

    Calculator.prototype.setActions = function () {
        this.calculatorInput.addEventListener("keypress", this.keypressData.bind(this));
        this.calculatorInput.addEventListener("input", this.inputData.bind(this));
        this.sqrButton.addEventListener("click", this.sqr.bind(this));
        this.sqrtButton.addEventListener("click", this.sqrt.bind(this));
        this.inButton.addEventListener("click", this.in.bind(this));
    };

    Calculator.prototype.sqr = function () {
        var value = this.calculatorInput.value;
        if (validateData(value)) {
            var rez = Math.pow(value, value);
            if (rez === Infinity) {
                alert('Infiniti');
            } else {
                this.calculatorInput.value = rez.toLocaleString('fullwide', {useGrouping:false});
            }
        }
    };

    Calculator.prototype.sqrt = function () {
        this.calculatorInput.value = Math.sqrt(this.calculatorInput.value);
    };

    Calculator.prototype.in = function () {
        if (validateData(this.calculatorInput.value)) {
            this.calculatorInput.value = Math.log(this.calculatorInput.value);
        }
    };

    Calculator.prototype.keypressData = function (event) {
        var pattern = /^\d+$/;
        if (!pattern.test(event.key)) {
            event.preventDefault();
        }
    };

    Calculator.prototype.inputData = function () {
        var calculatorInputLen = this.calculatorInput.value.length;
        var pattern = /^[^1-9]/;

        if (!calculatorInputLen || pattern.test(+this.calculatorInput.value)) {
            toggleDisabledButton.call(this, true);
        } else {
            toggleDisabledButton.call(this, false);
        }

        function toggleDisabledButton(state) {
            this.sqrButton.disabled = state;
            this.sqrtButton.disabled = state;
            this.inButton.disabled = state;
        }
    };

    function validateData(value) {
        if (value <= 0) {
            alert('invalid input data');
            return false;
        }
        return true;
    }

    var data = {
        input: '.js-input',
        sqr: '.js-sqr',
        sqrt: '.js-sqrt',
        in: '.js-in'
    };

    var calculator = new Calculator(data)

}());