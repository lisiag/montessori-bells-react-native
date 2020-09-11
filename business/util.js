"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
exports.Util = {
    /*
       Get n random numbers between 0 (inclusive) and arrLen (exclusive).
       Intended for use getting n random elements from an array of length arrLen.
     */
    getRandoms: function (arrLen, n) {
        if (n > arrLen)
            throw new RangeError("getRandoms: more elements taken than available");
        var result = new Array(n);
        var workArr = new Array(arrLen);
        for (var i = 0; i < arrLen; ++i) {
            workArr[i] = i;
        }
        for (var i = 0; i < n; ++i) {
            var x = Math.floor(Math.random() * workArr.length);
            result[i] = workArr[x];
            // remove the number from workArr so it can't be selected again
            workArr.splice(x, 1);
        }
        return result;
    },
};
