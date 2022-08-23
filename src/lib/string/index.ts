class UtilsString {
    /**
     * @description Method for finding the difference between 2 lines
     * @param {string} firstString - First string
     * @param {string} secondString - Second string
     * @param {Object} costs - Params
     * @param {number} costs.replace - Replace cost
     * @param {number} costs.replaceCase - Replace case cost
     * @param {number} costs.insert - Insert cost
     * @param {number} costs.remove - Remove const
     * @returns {number} - The difference between the strings
     * @example
     * string.levenshtein("test", "test1"); // => 1
     * string.levenshtein("test", "test123"); // => 3
     */
    public levenshtein(
        firstString: string,
        secondString: string,
        costs: {
            replace?: number;
            replaceCase?: number;
            insert?: number;
            remove?: number;
        } = {
            replace: 1,
            replaceCase: 1,
            insert: 1,
            remove: 1,
        }
    ): number {
        let flip: number;
        let ch: string;
        let chl: string;
        let ii: number;
        let ii2: number;
        let cost: number;
        const firstStringLength = firstString.length;
        const secondStringLength = secondString.length;

        costs.replace === undefined ? (costs.replace = 1) : null;
        costs.replaceCase === undefined ? (costs.replaceCase = 1) : null;
        costs.insert === undefined ? (costs.insert = 1) : null;
        costs.remove === undefined ? (costs.remove = 1) : null;

        const cutHalf = (flip = Math.max(
            firstStringLength,
            secondStringLength
        ));

        const minCost = Math.min(costs.remove, costs.insert, costs.replace);
        const minD = Math.max(
            minCost,
            (firstStringLength - secondStringLength) * costs.remove
        );
        const minI = Math.max(
            minCost,
            (secondStringLength - firstStringLength) * costs.insert
        );
        const buf: number[] = new Array(cutHalf * 2 - 1) as number[];

        for (let i = 0; i <= secondStringLength; ++i) {
            buf[i] = i * minD;
        }

        for (let i = 0; i < firstStringLength; ++i, flip = cutHalf - flip) {
            ch = firstString[i];
            chl = ch.toLowerCase();

            buf[flip] = (i + 1) * minI;

            ii = flip;
            ii2 = cutHalf - flip;

            for (let j = 0; j < secondStringLength; ++j, ++ii, ++ii2) {
                if (ch === secondString[j]) {
                    cost = 0;
                } else if (chl === secondString[j].toLowerCase()) {
                    cost = costs.replaceCase;
                } else {
                    cost = costs.replace;
                }

                buf[ii + 1] = Math.min(
                    buf[ii2 + 1] + costs.remove,
                    buf[ii] + costs.insert,
                    buf[ii2] + cost
                );
            }
        }
        return buf[secondStringLength + cutHalf - flip];
    }

    /**
     * Function for correct number declination
     *
     * @param {number} inputNumber Number
     * @param {string[]} titlesArray Strings for declination
     * @returns {string} Correct string
     * @example
     * // => помидора
     * string.declOfNum(3, ["помидор", "помидора", "помидоров"]);
     */
    public declOfNum(
        inputNumber: number,
        titlesArray: [string, string, string]
    ): string {
        let index: number;

        if (inputNumber % 10 === 1 && inputNumber % 100 !== 11) {
            index = 0;
        } else if (
            inputNumber % 10 >= 2 &&
            inputNumber % 10 <= 4 &&
            (inputNumber % 100 < 10 || inputNumber % 100 >= 20)
        ) {
            index = 1;
        } else {
            index = 2;
        }

        return titlesArray[index];
    }

    /**
     * @description Returns a string without Zalgo
     * @param {string} string String from which you want to remove Zalgo
     * @returns {string} - Clear string
     */
    public removeZalgo(string: string): string {
        return string.replace(
            /(̖|̗|̘|̙|̜|̝|̞|̟|̠|̤|̥|̦|̩|̪|̫|̬|̭|̮|̯|̰|̱|̲|̳|̹|̺|̻|̼|ͅ|͇|͈|͉|͍|͎|͓|͔|͕|͖|͙|͚|̣|̕|̛|̀|́|͘|̡|̢|̧|̨|̴|̵|̶|͏|͜|͝|͞|͟|͠|͢|̸|̷|͡|҉|̍|̎|̄|̅|̿|̑|̆|̐|͒|͗|͑|̇|̈|̊|͂|̓|̈́|͊|͋|͌|̃|̂|̌|͐|̀|́|̋|̏|̒|̓|̔|̽|̉|ͣ|ͤ|ͥ|ͦ|ͧ|ͨ|ͩ|ͪ|ͫ|ͬ|ͭ|ͮ|ͯ|̾|͛|͆|̚)/gi,
            ""
        );
    }
}

export default UtilsString;
