import UtilsRegular from "../regular";
import UtilsIPv4 from "./lib/v4";
import UtilsIPv6 from "./lib/v6";

class UtilsIP {
    private readonly _regular: UtilsRegular;

    /**
     * @description Section for working with IPv4 addresses
     * @type {IPv4}
     */
    public readonly v4: UtilsIPv4;

    /**
     * @description Section for working with IPv6 addresses
     * @type {IPv6}
     */
    public readonly v6: UtilsIPv6;

    constructor({
        regular = new UtilsRegular(),
        v4,
        v6,
    }: {
        regular?: UtilsRegular;
        v4?: UtilsIPv4;
        v6?: UtilsIPv6;
    }) {
        this._regular = regular;
        this.v4 = v4 || new UtilsIPv4(this._regular);
        this.v6 = v6 || new UtilsIPv6(this._regular);
    }

    /**
     * @description Checking whether the string passed in is an IP address
     * @param {string} IP IP address
     * @returns {boolean} If the IP address transmitted is valid
     * @example
     * // Return true
     * IP.is("192.168.0.1");
     * @example
     * // Return true
     * IP.v6.is("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
     * @example
     * // Return false
     * IP.is("test");
     */
    public is(ip: string): boolean {
        return this._regular.isIP(ip);
    }
}

export { UtilsIPv4, UtilsIPv6 };

export default UtilsIP;
