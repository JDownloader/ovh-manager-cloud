(() => {
    "use strict";

    class FormatSi {
        constructor () {
            this.prefixes = {
                24: "Y",
                21: "Z",
                18: "E",
                15: "P",
                12: "T",
                9: "G",
                6: "M",
                3: "k",
                0: "",
                "-3": "m",
                "-6": "µ",
                "-9": "n",
                "-12": "p",
                "-15": "f",
                "-18": "a",
                "-21": "z",
                "-24": "y"
            };

            return num => this.format(num);
        }

        format (num) {
            if (num === 0) {
                return "0";
            }
            let sig = Math.abs(num); // significand
            let exponent = 0;
            while (sig >= 1000 && exponent < 24) {
                sig /= 1000;
                exponent += 3;
            }
            while (sig < 1 && exponent > -24) {
                sig *= 1000;
                exponent -= 3;
            }

            const signPrefix = num < 0 ? "-" : "";
            if (sig > 1000) {
                return signPrefix + sig.toFixed(0) + this.prefixes[exponent];
            }
            return signPrefix + parseFloat(sig.toPrecision(3)) + this.prefixes[exponent];
        }

        static filter () {
            FormatSi.instance = new FormatSi();
            return FormatSi.instance;
        }
    }

    angular.module("managerApp").filter("formatSi", FormatSi.filter);
})();
