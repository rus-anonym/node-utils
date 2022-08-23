import UtilsNumber from "./lib/number";
import UtilsRegular from "./lib/regular";
import UtilsIP, { UtilsIPv4, UtilsIPv6 } from "./lib/IP";
import UtilsArray, {
    UtilsArrayClone,
    UtilsArrayNumber,
    UtilsArraySort,
} from "./lib/array";
import UtilsLogical from "./lib/logical";
import UtilsString from "./lib/string";
import UtilsVK, { UtilsVKAPI, UtilsVKGroup } from "./lib/VK";

const types = [
    "undefined",
    "boolean",
    "number",
    "string",
    "bigint",
    "symbol",
    "null",
    "object",
    "array",
    "function",
    "asyncFunction",
    "generatorFunction",
    "generatorAsyncFunction",
    "promise",
] as const;

class Utils {
    private readonly _signatures = {
        asyncFunction: (async (): Promise<void> => {
            //
        }).constructor,
        generatorFunction: function* (): Generator<never, void, unknown> {
            //
        }.constructor,
        asyncGeneratorFunction: async function* (): AsyncGenerator<
            never,
            void,
            unknown
            // eslint-disable-next-line indent
        > {
            //
        }.constructor,
    } as const;

    public readonly number: UtilsNumber;
    public readonly array: UtilsArray;
    public readonly regular: UtilsRegular;
    public readonly IP: UtilsIP;
    public readonly logical: UtilsLogical;
    public readonly string: UtilsString;
    public readonly vk: UtilsVK;

    constructor({
        string = new UtilsString(),
        number = new UtilsNumber(),
        regular = new UtilsRegular(),
        logical = new UtilsLogical(),
        array,
        IP: ip,
        vk,
    }: Partial<{
        string: UtilsString;
        number: UtilsNumber;
        regular: UtilsRegular;
        logical: UtilsLogical;
        array: UtilsArray;
        IP: UtilsIP;
        vk: UtilsVK;
    }> = {}) {
        this.string = string;
        this.number = number;
        this.regular = regular;
        this.logical = logical;

        this.array =
            array ||
            new UtilsArray({ number: this.number, logical: this.logical });
        this.IP = ip || new UtilsIP({ regular: this.regular });
        this.vk = vk || new UtilsVK({ regular: this.regular });
    }

    /**
     * @description Defining a variable type
     * @template T
     * @param {T} variable Variable
     * @example
     * import utils from "rus-anonym-utils";
     * await utils.typeof(1000); // number
     * @returns {TTypeOfResponse} Variable type
     */
    public typeof<T>(variable: T): typeof types[number] {
        switch (typeof variable) {
            case "undefined":
                return "undefined";
            case "boolean":
                return "boolean";
            case "number":
                return "number";
            case "string":
                return "string";
            case "bigint":
                return "bigint";
            case "symbol":
                return "symbol";
            case "object": {
                if (variable === null) {
                    return "null";
                }
                if (Array.isArray(variable)) {
                    return "array";
                }
                if (variable instanceof Promise) {
                    return "promise";
                }
                return "object";
            }
            case "function": {
                if (variable instanceof this._signatures.asyncFunction) {
                    return "asyncFunction";
                }
                if (variable instanceof this._signatures.generatorFunction) {
                    return "generatorFunction";
                }
                if (
                    variable instanceof this._signatures.asyncGeneratorFunction
                ) {
                    return "generatorAsyncFunction";
                }
                return "function";
            }
            default:
                throw new TypeError(`Type ${typeof variable} is not supported`);
        }
    }

    /**
     * @description Synchronously pauses the process
     * @template T
     * @param {number} ms Number of milliseconds to wait
     * @example
     * import utils from "rus-anonym-utils";
     * utils.wait(1000); // void
     * @returns {void} void
     */
    public wait(ms: number): void {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
        return;
    }

    /**
     * @description Asynchronously pauses the process
     * @template T
     * @param {number} ms Number of milliseconds to wait
     * @example
     * import utils from "rus-anonym-utils";
     * await utils.sleep(1000); // Promise<void>
     * @returns {Promise.<void>} Promise<void>
     */
    public sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}

const utils = new Utils();

export {
    Utils,
    UtilsNumber,
    UtilsString,
    UtilsRegular,
    UtilsIP,
    UtilsLogical,
    UtilsArray,
};

export { UtilsIPv4, UtilsIPv6 };

export { UtilsArrayClone, UtilsArrayNumber, UtilsArraySort };

export { UtilsVK, UtilsVKAPI, UtilsVKGroup };

export default utils;
