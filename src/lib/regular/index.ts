import templates from "./templates";

const list = {
    /**
     * E-Mail template
     */
    email: templates.email,
    /**
     * IPv4 template
     */
    IPv4: templates.IPv4,
    /**
     * IPv6 template
     */
    IPv6: templates.IPv6,
    /**
     * IP template
     */
    ip: templates.ip,
    /**
     * URL template
     */
    url: templates.url,
    /**
     * Phone template
     */
    number: templates.phone,
} as const;

class UtilsRegular {
    /**
     * @description Templates for creating your own regular expressions using the RegExp constructor
     * @example
     * // => RegExp
     * new RegExp(utils.regular.list.email, "g");
     */
    public readonly list;

    constructor() {
        this.list = list;
    }

    /**
     * @description Checking if the passed string is an E-Mail address
     * @param {string} email E-Mail address
     * @returns {boolean} Whether the string passed is an E-Mail address
     * @example
     * regular.isEmail("alexandrsemin2033@gmail.com"); // => true
     */
    public isEmail(email: string): boolean {
        return new RegExp(templates.email, "").test(email);
    }

    /**
     * @description Checking if the passed string is an IPv4 address
     * @param {string} address IPv4 address
     * @returns {boolean} Whether the string passed in is an IPv4 address
     * @example
     * regular.isIPv4("192.168.0.1"); // => true
     * regular.isIPv4("test"); // => false
     */
    public isIPv4(address: string): boolean {
        return new RegExp(templates.IPv4, "").test(address);
    }

    /**
     * @description Checking if the passed string is an IPv6 address
     * @param {string} address IPv6 address
     * @returns {boolean} Whether the string passed in is an IPv6 address
     * @example
     * regular.isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // => true
     * regular.isIPv6("test"); // => false
     */
    public isIPv6(address: string): boolean {
        return new RegExp(templates.IPv6, "").test(address);
    }

    /**
     * @description Checking whether the string passed in is an IP address
     * @param {string} address IP address
     * @returns {boolean} Whether the string passed in is an IP address
     * @example
     * regular.isIP("192.168.0.1"); // => true
     * regular.isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // => true
     * regular.isIP("test"); // => false
     */
    public isIP(address: string): boolean {
        return new RegExp(templates.ip, "").test(address);
    }

    /**
     * @description Checking if the passed string is a reference
     * @param {string} url URL
     * @returns {boolean} Whether the string passed in is a reference
     * @example
     * regular.isURL("google.com"); // => true
     * regular.isURL("http://google.com"); // => true
     * regular.isURL("https://google.com"); // => true
     * regular.isURL("https://google.com/test"); // => true
     * regular.isURL("https://google.com/test?act=tost"); // => true
     * regular.isURL("test"); // => false
     */
    public isURL(url: string): boolean {
        return new RegExp(templates.url, "").test(url);
    }

    /**
     * @description Check if the passed string is a number
     * @param {number} number Phone number
     * @returns {boolean} Whether the transmitted string is a number
     */
    public isPhoneNumber(number: string): boolean {
        return new RegExp(templates.number, "i").test(number);
    }

    /**
     * @description Shields special characters for use in regular expressions
     * @param {string} text - Text
     * @returns {string} Shielded text
     * @example
     * regular.escapeRegExp("[Hello]") // => "\\[Hello\\]"
     */
    public escapeRegExp(text: string): string {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
}

export default UtilsRegular;
