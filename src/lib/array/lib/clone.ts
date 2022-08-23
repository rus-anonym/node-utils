type TCloneMethod = InstanceType<typeof UtilsArrayClone>["_methods"][number];

interface ICloneBenchmarkResponse<T> {
    fastest: {
        method: TCloneMethod;
        rate: number;
    };
    slowest: {
        method: TCloneMethod;
        rate: number;
    };
    summary: Record<TCloneMethod, number>;
    totalTime: number;
    sourceArray: T[];
    copiedArray: T[];
}

class UtilsArrayClone {
    private readonly _methods = [
        "slice",
        "concat",
        "unshift",
        "push",
        "index",
        "apply",
        "map",
        "json",
        "spread",
        "from",
        "recursionDeep",
    ] as const;

    /**
     * Cloning an array with slice
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public slice<T>(array: T[]): T[] {
        return array.slice();
    }

    /**
     * Cloning an array with concat
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public concat<T>(array: T[]): T[] {
        return ([] as T[]).concat(array);
    }

    /**
     * Cloning an array with unshift
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public unshift<T>(array: T[]): T[] {
        const response: T[] = [];
        for (let i = array.length; i--; ) {
            response.unshift(array[i]);
        }
        return response;
    }

    /**
     * Cloning an array with push
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public push<T>(array: T[]): T[] {
        const response: T[] = [];
        for (let i = 0, l = array.length; i < l; ++i) {
            response.push(array[i]);
        }
        return response;
    }

    /**
     * Cloning an array with index
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public index<T>(array: T[]): T[] {
        const response: T[] = new Array(array.length) as T[];
        for (let i = 0, l = array.length; i < l; ++i) {
            response[i] = array[i];
        }
        return response;
    }

    /**
     * Cloning an array with apply
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public apply<T>(array: T[]): T[] {
        // eslint-disable-next-line prefer-spread
        return Array.apply(undefined, array) as T[];
    }

    /**
     * Cloning an array with map
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public map<T>(array: T[]): T[] {
        return array.map(function (element) {
            return element;
        });
    }

    /**
     * Cloning an array with JSON
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public json<T>(array: T[]): T[] {
        return JSON.parse(JSON.stringify(array)) as T[];
    }

    /**
     * Cloning an array with spread
     *
     * @param {Array} array - array
     * @returns {Array} new array
     */
    public spread<T>(array: T[]): T[] {
        return [...array];
    }

    /**
     * Cloning an array with Array.from
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public from<T>(array: T[]): T[] {
        return Array.from(array);
    }

    /**
     * Recursive deep copying array (копирует subarray)
     *
     * @param {Array} array {Array} - array
     * @returns {Array} new array
     */
    public recursionDeep<T>(array: T[]): T[] {
        const response = array.map((element: T | T[]) => {
            return this._recursionDeepCopy(element);
        });
        return response as T[];
    }

    private _recursionDeepCopy<T>(array: T | T[]): T | T[] {
        return Array.isArray(array) ? this._recursionDeepCopy(array) : array;
    }

    /**
     * Compares all copying methods
     *
     * @param {Array} input Source array
     * @returns {Object} benchmark - Object with completed tests
     */
    public benchmark<T>(input: T[]): ICloneBenchmarkResponse<T> {
        const response: ICloneBenchmarkResponse<T> = {
            fastest: {
                method: "slice",
                rate: Number.MAX_VALUE,
            },
            slowest: {
                method: "slice",
                rate: 0,
            },
            summary: {
                slice: 0,
                concat: 0,
                unshift: 0,
                push: 0,
                index: 0,
                apply: 0,
                map: 0,
                json: 0,
                spread: 0,
                from: 0,
                recursionDeep: 0,
            },
            totalTime: 0,
            sourceArray: input,
            copiedArray: [],
        };

        for (const method of this._methods) {
            const sortStart = performance.now();

            response.copiedArray = this[method](input);
            response.summary[method] = performance.now() - sortStart;
        }

        let tempKey: TCloneMethod;

        for (tempKey in response.summary) {
            if (response.fastest.rate > response.summary[tempKey]) {
                response.fastest.method = tempKey;
                response.fastest.rate = response.summary[tempKey];
            }
            if (response.slowest.rate < response.summary[tempKey]) {
                response.slowest.method = tempKey;
                response.slowest.rate = response.summary[tempKey];
            }
            response.totalTime += response.summary[tempKey];
        }

        return response;
    }
}

export { TCloneMethod, ICloneBenchmarkResponse };

export default UtilsArrayClone;
