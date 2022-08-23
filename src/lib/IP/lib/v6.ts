import UtilsRegular from "../../regular";

class UtilsIPv6 {
    private readonly _regular: UtilsRegular;

    constructor(regular: UtilsRegular) {
        this._regular = regular;
    }

    /**
     * Checking if the passed string is an IPv6 address
     *
     * @param {string} ip IP address
     * @returns {boolean} Whether the transmitted IP address is IPv6
     * @example
     * // Return true
     * IP.v6.is("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
     * @example
     * // Return false
     * IP.v6.is("192.168.0.1");
     * @example
     * // Return false
     * IP.v6.is("test");
     */
    public is(ip: string): boolean {
        return this._regular.isIPv6(ip);
    }
}

export default UtilsIPv6;
