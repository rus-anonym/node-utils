import { performance } from "perf_hooks";

import UtilsLogical from "../../logical";

type TSortingAlgorithm = InstanceType<
    typeof UtilsArraySort
>["_alghorithms"][number];

interface ISortBenchmarkResponse<T> {
    fastest: {
        algorithm: TSortingAlgorithm;
        rate: number;
    };
    slowest: {
        algorithm: TSortingAlgorithm;
        rate: number;
    };
    summary: Record<TSortingAlgorithm, number>;
    totalTime: number;
    sourceArray: T[];
    sortedArray: T[];
}

export class UtilsArraySort {
    private readonly _alghorithms = [
        "bubble",
        "selection",
        "insertion",
        "Shell",
        "simpleCounting",
        "comb",
        "merge",
        "heap",
        "quick",
        "shaker",
        "gnome",
    ] as const;

    private readonly _logical: UtilsLogical;

    constructor({
        logical = new UtilsLogical(),
    }: { logical?: UtilsLogical } = {}) {
        this._logical = logical;
    }

    /**
     * @description Bubble sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public bubble<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        for (let i = 0, endI = array.length - 1; i < endI; ++i) {
            for (let j = 0, endJ = endI - i; j < endJ; ++j) {
                const compare = compareFn(array[j], array[j + 1]);
                if (compare > 0) {
                    const currentElement = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = currentElement;
                }
            }
        }
        return array;
    }

    /**
     * @description Selection sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public selection<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        const arrayLength = array.length;
        for (let i = 0; i < arrayLength - 1; ++i) {
            let min = i;
            for (let j = i + 1; j < arrayLength; ++j) {
                if (compareFn(array[j], array[min]) < 0) {
                    min = j;
                }
            }
            const t = array[min];
            array[min] = array[i];
            array[i] = t;
        }
        return array;
    }

    /**
     * @description Insertion sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public insertion<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        const n = array.length;
        for (let i = 0; i < n; ++i) {
            const v = array[i];
            let j = i - 1;
            while (j >= 0 && compareFn(array[j], v) > 0) {
                array[j + 1] = array[j];
                --j;
            }
            array[j + 1] = v;
        }
        return array;
    }

    /**
     * @description Shell sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public Shell<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        const n = array.length;
        let i = Math.floor(n / 2);
        while (i > 0) {
            for (let j = 0; j < n; ++j) {
                let k = j;
                const t = array[j];
                while (k >= i && compareFn(array[k - i], t) > 0) {
                    array[k] = array[k - i];
                    k -= i;
                }
                array[k] = t;
            }
            i = i == 2 ? 1 : Math.floor((i * 5) / 11);
        }
        return array;
    }

    /**
     * @description Simple counting sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public simpleCounting<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        const n = array.length;
        const count: number[] = [];
        const outputArray: T[] = [];
        for (let i = 0; i < n; i++) {
            count[i] = 0;
        }
        for (let i = 0; i < n - 1; ++i) {
            for (let j = i + 1; j < n; ++j) {
                if (compareFn(array[i], array[j]) < 0) {
                    ++count[j];
                } else {
                    ++count[i];
                }
            }
        }
        for (let i = 0; i < n; ++i) {
            outputArray[count[i]] = array[i];
        }
        return outputArray;
    }

    /**
     * @description Comb sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public comb<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        const l = array.length;
        const factor = 1.247330950103979;
        let gapFactor = l / factor;
        while (gapFactor > 1) {
            const gap = Math.round(gapFactor);
            for (let i = 0, j = gap; j < l; ++i, ++j) {
                if (compareFn(array[i], array[j]) > 0) {
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
            gapFactor = gapFactor / factor;
        }
        return array;
    }

    /**
     * @description Merge sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public merge<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        const middle = Math.floor(array.length / 2);
        const arrLeft = array.slice(0, middle);
        const arrRight = array.slice(middle);

        // eslint-disable-next-line require-jsdoc
        const mergeArray = (firstArray: T[], secondArray: T[]): T[] => {
            const arrSort: T[] = [];
            let i = 0;
            let j = 0;
            while (i < firstArray.length && j < secondArray.length) {
                if (compareFn(firstArray[i], secondArray[j]) < 0) {
                    arrSort.push(firstArray[i]);
                    ++i;
                } else {
                    arrSort.push(secondArray[j]);
                    ++j;
                }
            }
            return [
                ...arrSort,
                ...firstArray.slice(i),
                ...secondArray.slice(j),
            ];
        };

        return mergeArray(
            this.merge(arrLeft, compareFn),
            this.merge(arrRight, compareFn)
        );
    }

    /**
     * @description Heap sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public heap<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        let l = array.length;

        const heapify = (a: T[], i: number): void => {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            let max = i;
            if (left < l && compareFn(a[left], a[max]) > 0) {
                max = left;
            }
            if (right < l && compareFn(a[right], a[max]) > 0) {
                max = right;
            }
            if (max !== i) {
                [a[max], a[i]] = [a[i], a[max]];
                heapify(a, max);
            }
        };

        for (let i = Math.floor(l / 2); i >= 0; --i) {
            heapify(array, i);
        }
        for (let i = array.length - 1; i > 0; --i) {
            [array[0], array[i]] = [array[i], array[0]];
            --l;
            heapify(array, 0);
        }
        return array;
    }

    /**
     * @description Quick sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public quick<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        const a: T[] = [];
        const b: T[] = [];
        const p = array[0];
        for (let i = 1; i < array.length; ++i) {
            if (compareFn(array[i], p) < 0) {
                a[a.length] = array[i];
            } else {
                b[b.length] = array[i];
            }
        }
        return this.quick(a, compareFn).concat(p, this.quick(b, compareFn));
    }

    /**
     * @description Shaker sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public shaker<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        let i = 0;
        let j = array.length - 1;
        let s = true;
        let t: T;
        while (i < j && s) {
            s = false;
            for (let k = i; k < j; ++k) {
                if (compareFn(array[k], array[k + 1]) > 0) {
                    t = array[k];
                    array[k] = array[k + 1];
                    array[k + 1] = t;
                    s = true;
                }
            }
            --j;
            if (s) {
                s = false;
                for (let k = j; k > i; --k) {
                    if (compareFn(array[k], array[k - 1]) < 0) {
                        t = array[k];
                        array[k] = array[k - 1];
                        array[k - 1] = t;
                        s = true;
                    }
                }
            }
            ++i;
        }
        return array;
    }

    /**
     * @description Gnome sorting
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {Array.<T>} - Sorted array
     */
    public gnome<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): T[] {
        if (array.length <= 1) {
            return array;
        }
        const n = array.length;
        let i = 1;
        let j = 2;
        while (i < n) {
            if (compareFn(array[i - 1], array[i]) < 0) {
                i = j;
                ++j;
            } else {
                const t = array[i - 1];
                array[i - 1] = array[i];
                array[i] = t;
                --i;
                if (i === 0) {
                    i = j;
                    ++j;
                }
            }
        }
        return array;
    }

    /**
     * @description Sorting benchmark
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Array.<T>} compareFn - Compare function
     * @returns {ISortBenchmarkResponse.<T>} - Benchmark result
     */
    public benchmark<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = this._defaultCompare
    ): ISortBenchmarkResponse<T> {
        const response: ISortBenchmarkResponse<T> = {
            fastest: {
                algorithm: "Shell",
                rate: Number.MAX_VALUE,
            },
            slowest: {
                algorithm: "Shell",
                rate: 0,
            },
            summary: {
                bubble: 0,
                selection: 0,
                insertion: 0,
                Shell: 0,
                simpleCounting: 0,
                comb: 0,
                merge: 0,
                heap: 0,
                quick: 0,
                shaker: 0,
                gnome: 0,
            },
            totalTime: 0,
            sourceArray: array,
            sortedArray: [],
        };

        for (const algorithm of this._alghorithms) {
            const sortStart = performance.now();
            response.sortedArray = this[algorithm]([...array], compareFn);
            response.summary[algorithm] = performance.now() - sortStart;
        }

        let tempKey: TSortingAlgorithm;

        for (tempKey in response.summary) {
            if (response.fastest.rate > response.summary[tempKey]) {
                response.fastest.algorithm = tempKey;
                response.fastest.rate = response.summary[tempKey];
            }
            if (response.slowest.rate < response.summary[tempKey]) {
                response.slowest.algorithm = tempKey;
                response.slowest.rate = response.summary[tempKey];
            }
            response.totalTime += response.summary[tempKey];
        }

        return response;
    }

    /**
     * @description Natural string sorter
     * @template T
     * @param {Array.<T>} array - Source array
     * @param {Function} extractor - Function that translates an element into a string
     * @returns {Array.<T>} - Sorted array
     */
    public naturalStringSorter<T>(
        array: T[],
        extractor?: (input: T) => string
    ): T[] {
        const createSplitter = (item: T): Splitter => {
            return new Splitter(item, this._logical);
        };

        class ElementsPart {
            public readonly value: string | number;
            public readonly isNumber: boolean;

            constructor(text: string, isNumber: boolean) {
                this.isNumber = isNumber;
                this.value = isNumber ? Number(text) : text;
            }
        }

        class Splitter {
            public source: T;
            private _key: string;
            private _logical: UtilsLogical;
            private _elements: ElementsPart[] = [];
            private _currentIndex = 0;
            private _fromIndex = 0;
            private _completed = false;

            constructor(item: T, logical: UtilsLogical) {
                this.source = item;
                this._logical = logical;
                this._key =
                    typeof extractor === "function"
                        ? extractor(item)
                        : String(item);
            }

            public get elementsCount(): number {
                return this._elements.length;
            }

            public processElement(elementIndex: number): ElementsPart | null {
                while (
                    this._elements.length <= elementIndex &&
                    !this._completed
                ) {
                    this._parseString();
                }
                return elementIndex < this._elements.length
                    ? this._elements[elementIndex]
                    : null;
            }

            private _isNumber(char: string): boolean {
                const code = char.charCodeAt(0);
                return code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0);
            }

            private _parseString(): void {
                if (this._currentIndex < this._key.length) {
                    while (++this._currentIndex) {
                        const currentIsDigit = this._isNumber(
                            this._key.charAt(this._currentIndex - 1)
                        );
                        const nextChar = this._key.charAt(this._currentIndex);
                        const currentIsLast =
                            this._currentIndex === this._key.length;

                        const isBorder =
                            currentIsLast ||
                            this._logical.XOR(
                                currentIsDigit,
                                this._isNumber(nextChar)
                            );
                        if (isBorder) {
                            const partStr = this._key.slice(
                                this._fromIndex,
                                this._currentIndex
                            );
                            this._elements.push(
                                new ElementsPart(partStr, currentIsDigit)
                            );
                            this._fromIndex = this._currentIndex;
                            break;
                        }
                    }
                } else {
                    this._completed = true;
                }
            }
        }

        const splittersArray = array.map(createSplitter);
        const sortedSplittersArray = splittersArray.sort(
            (sp1: Splitter, sp2: Splitter) => {
                let i = 0;
                do {
                    const first = sp1.processElement(i);
                    const second = sp2.processElement(i);

                    if (null !== first && null !== second) {
                        if (
                            this._logical.XOR(first.isNumber, second.isNumber)
                        ) {
                            return first.isNumber ? -1 : 1;
                        } else {
                            const comp = this._naturalSortingCompare(
                                Number(first.value),
                                Number(second.value)
                            );
                            if (comp != 0) {
                                return comp;
                            }
                        }
                    } else {
                        return this._naturalSortingCompare(
                            sp1.elementsCount,
                            sp2.elementsCount
                        );
                    }
                } while (++i);
                return 0;
            }
        );

        return sortedSplittersArray.map(function (splitterInstance: Splitter) {
            return splitterInstance.source;
        });
    }

    private _naturalSortingCompare(a: number, b: number): 1 | 0 | -1 {
        return a < b ? -1 : a > b ? 1 : 0;
    }

    private _defaultCompare = <T>(x: T, y: T): number => {
        if (x === undefined && y === undefined) {
            return 0;
        }
        if (x === undefined) {
            return 1;
        }
        if (y === undefined) {
            return -1;
        }
        const xString = this._toString(x);
        const yString = this._toString(y);

        if (xString < yString) {
            return -1;
        }
        if (xString > yString) {
            return 1;
        }
        return 0;
    };

    private _toString = <T>(obj: T): string => {
        if (obj === null) {
            return "null";
        }
        if (typeof obj === "boolean" || typeof obj === "number") {
            return obj.toString();
        }
        if (typeof obj === "string") {
            return obj;
        }
        if (typeof obj === "symbol") {
            throw new TypeError();
        }

        return (obj as unknown as object).toString();
    };
}

export default UtilsArraySort;
