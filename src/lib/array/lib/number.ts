class UtilsArrayNumber {
    /**
     * @description Output the minimum value in the array
     * @param {Array.<number>} array Array with numbers
     * @returns {number} Minimum value
     * @example
     * // Return -50
     * array.number.min([1, 2, 3, 4, 5, 6, -50, 100]);
     */
    public min(array: number[]): number {
        return Math.min.apply(null, array);
    }

    /**
     * @description Output the maximum value in the array
     * @param {Array.<number>} array Array with numbers
     * @returns {number} Maximum value
     * @example
     * // Return 6
     * array.number.min([1, 2, 3, 4, 5, 6, -50]);
     */
    public max(array: number[]): number {
        return Math.max.apply(null, array);
    }

    /**
     * @description Output the average value in the array
     * @param {Array.<number>} input Array with numbers
     * @returns {number} Average value
     * @example
     * // Return 3
     * array.number.average([1, 2, 3, 4, 5]);
     */
    public average(input: number[]): number {
        return input.reduce((a, b) => a + b) / input.length;
    }

    /**
     * @description Calculating the sum of an array
     * @param {Array.<number>} array Array with numbers
     * @returns {number} Array sum
     * @example
     * // Return 15
     * array.number.total([1, 2, 3, 4, 5]);
     */
    public total(array: number[]): number {
        return array.reduce((total, temp) => total + temp, 0);
    }
}

export default UtilsArrayNumber;
