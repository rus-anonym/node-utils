import UtilsLogical from "../logical";
import NumberUtils from "../number";
import UtilsArrayClone from "./lib/clone";
import UtilsArrayNumber from "./lib/number";
import UtilsArraySort from "./lib/sort";

class UtilsArray {
    private readonly _number: NumberUtils;

    public readonly number: UtilsArrayNumber;
    public readonly clone: UtilsArrayClone;
    public readonly sort: UtilsArraySort;

    constructor({
        numberArray = new UtilsArrayNumber(),
        number = new NumberUtils(),
        clone = new UtilsArrayClone(),
        logical = new UtilsLogical(),
    }: {
        logical?: UtilsLogical;
        number?: NumberUtils;
        clone?: UtilsArrayClone;
        sort?: UtilsArraySort;
        numberArray?: UtilsArrayNumber;
    } = {}) {
        this.number = numberArray;
        this._number = number;
        this.clone = clone;
        this.sort = new UtilsArraySort({
            logical: logical,
        });
    }

    /**
     * @description Random element from array
     * @param {Array} array - array
     * @returns {any} Random element from array
     * @example
     * // Return 2
     * array.random([1, 2, 3, 4]);
     */
    public random<T>(array: T[]): T {
        return array[this._number.getRandomIntInclusive(0, array.length - 1)];
    }

    /**
     * @description Split array on chunks
     * @param {Array} array array
     * @param {number} chunks total chunk count
     * @returns {Array.<Array>} result array
     * @example
     * // Return [[1, 2], [3]]
     * array.splitOn([1, 2, 3], 2);
     */
    public splitOn<T>(array: T[], chunks: number): T[][] {
        const response: T[][] = [];
        const maxIteration = Math.floor(array.length / chunks) * chunks;
        for (let i = 0; i < maxIteration; i += chunks) {
            response.push(array.slice(i, i + chunks));
        }
        if (array[maxIteration]) {
            response.push(array.slice(maxIteration));
        }
        return response;
    }

    /**
     * @description Split array to elements in chunk
     * @param {Array} array array
     * @param {number} elementsInChunk elements count in chunk
     * @returns {Array.<Array>} result array
     * @example
     * // Return [[1], [2], [3]]
     * array.splitTo([1, 2, 3], 1);
     */
    public splitTo<T>(array: T[], elementsInChunk: number): T[][] {
        const response: T[][] = [];

        for (let i = 0; i < array.length; i += elementsInChunk) {
            response.push(array.slice(i, i + elementsInChunk));
        }

        return response;
    }

    /**
     * @description Shuffle array
     * @param {Array} array array
     * @returns {Array} Shuffled array
     * @example
     * // Return [5, 1, 4, 2, 3]
     * array.shuffle([1, 2, 3, 4, 5]);
     */
    public shuffle<T>(array: T[]): T[] {
        const response = array.concat();
        for (let i = response.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [response[i], response[j]] = [response[j], response[i]];
        }
        return response;
    }

    /**
     * @description Insert element into array
     * @param {Array} array array
     * @param {number} index New element index
     * @param {any} element New element
     * @returns {Array} result array
     * @example
     * // Return [1, 2, 3, 4, 5]
     * array.insert([1, 2, 4, 5], 2, 3);
     */
    public insert<T>(array: T[], index: number, element: T): T[] {
        array.splice(index, 0, element);
        return array;
    }

    /**
     * @description Removes non-unique values from the array (works only with primitives)
     * @param {Array} array an array that needs to be unique
     * @returns {Array} result array
     * @example
     * // Return [1, 2]
     * array.makeUnique([1, 2, 1, 1, 2]);
     */
    public makeUnique<T>(array: T[]): T[] {
        return Array.from(new Set(array));
    }

    /**
     * @description Get last element of array
     * @param {Array} array - Source array
     * @returns {any} Last element of array
     * @example
     * // Return 2
     * array.last([1, 2]);
     */
    public last<T>(array: T[]): T {
        return array[array.length - 1];
    }

    /**
     * @description Removes false values from the array (0, "", false, null, undefined, NaN)
     * @param {Array} array Source array
     * @returns {Array} Result array
     * @example
     * // Return ["test"]
     * array.removeFalseValues([0, NaN, false, null, undefined, "", "test"])
     */
    public removeFalseValues<T>(array: T[]): Exclude<T, 0 | false | null | undefined | "">[] {
        return array.filter(Boolean) as Exclude<T, 0 | false | null | undefined | "">[];
    }

    /**
     * @description generates an array filled with elements
     * @param {number} length - Output array length
     * @param {number} elemFn - Element or element generator function
     * @returns {Array.<number>} - array
     * @example
     * // Return [5, 5, 5, 5, 5]
     * array.generate(5, 5);
     * @example
     * // Return [1, 2, 3, 4, 5]
     * let i = 1;
     * array.generate(5, () => ++i);
     */
    public generate<T>(length: number, elemFn: () => T): T[] {
        return Array.from({ length: length }, elemFn);
    }
}

export { UtilsArrayClone, UtilsArrayNumber, UtilsArraySort };

export default UtilsArray;
