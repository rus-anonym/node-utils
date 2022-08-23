import crypto from "node:crypto";

class UtilsNumber {
    /**
     * @description Get a pseudo-random floating point number
     * @param {number} min Minimum value
     * @param {number} max Maximum value
     * @returns {number} Returns a random number in a given interval. The return value is not less than (and may be equal to) min and not more than (and not equal to) max.
     * @example
     * number.getRandomArbitrary(1, 5); // => 2.8043424354010273
     */
    public getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * @description  Obtaining a pseudorandom integer in a given interval
     * @param {number} min Minimum value
     * @param {number} max Maximum value
     * @returns {number} Returns a random integer in the specified interval. The return value is at least min (or the next integer greater than min if min is not an integer) and at most (but not equal to) max.
     */
    public getRandomInt(min: number, max: number): number;
    /**
     * @description  Obtaining a pseudorandom integer in a given interval with seed
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @param {string} [seed] - Seed
     * @returns {number} Returns a random integer in the specified interval. The return value is at least min (or the next integer greater than min if min is not an integer) and at most (but not equal to) max.
     */
    public getRandomInt(min: number, max: number, seed: string): number;
    public getRandomInt(min: number, max: number, seed?: string): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        if (seed) {
            const hash = crypto.createHash("sha256");
            hash.update(seed);
            const digest = hash.digest();
            return (
                (parseInt(digest.toString("hex"), 16) % (max - min + 1)) + min
            );
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * @description Obtaining a pseudorandom integer within a given interval, inclusive
     * @param {number} min Minimum value
     * @param {number} max Maximum value
     * @returns {number} Returns a random integer in the specified interval. The return value is at least min (or the next integer greater than min if min is not an integer) and at most (but not equal to) max inclusive
     * @example
     * number.getRandomIntInclusive(1, 5); // => 1
     */
    public getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @description Checks if the number is an integer
     * @param {number} number Number
     * @returns {boolean} Returns true if the number is an integer, and false if it is not an integer
     * @example
     * number.isInteger(1); // => true
     * number.isInteger(1.5); // => false
     */
    public isInteger(number: number): boolean {
        return (number ^ 0) === number;
    }

    /**
     * @description Return string-value of number
     * @param {number} number Number
     * @param {string} separator Separator
     * @param {string} [dotSymbol] Separator between the integer part and the fractional part of a number
     * @returns {string} Result string
     * @example
     * number.separator(100000, "."); // => 100.000
     * number.separator(100000.50, ".", ","); // => 100.000,50
     */
    public toString(
        number: number,
        separator: string | undefined = ",",
        dotSymbol: string | undefined = "."
    ): string {
        const splittedNumber = Math.abs(number).toString().split(".");
        const [integer] = splittedNumber;
        let response: string | string[] = integer;
        response = integer.split("");
        response.reverse();
        response = response.map((value, index, arr) =>
            index > 0 && index < arr.length && index % 3 == 0
                ? value + separator
                : value
        );
        response.reverse();
        splittedNumber[0] = response.join("");
        return (
            (Math.sign(number) < 0 ? "-" : "") + splittedNumber.join(dotSymbol)
        );
    }
}

export default UtilsNumber;
