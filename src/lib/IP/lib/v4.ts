import UtilsRegular from "../../regular";

class UtilsIPv4 {
    private readonly _regular: UtilsRegular;

    constructor(regular: UtilsRegular) {
        this._regular = regular;
    }

    private _toBinary(ip: string): string[] {
        const splittedIP = ip.split(".");
        const binaryIP = [];
        for (let i = 0; i < splittedIP.length; ++i) {
            const binaryNo = parseInt(splittedIP[i]).toString(2);
            if (binaryNo.length === 8) {
                binaryIP.push(binaryNo);
            } else {
                const diffNo = 8 - binaryNo.length;
                let createBinary = "";
                for (let j = 0; j < diffNo; ++j) {
                    createBinary += "0";
                }
                createBinary += binaryNo;
                binaryIP.push(createBinary);
            }
        }
        return binaryIP;
    }

    private _toIP(ip: string[]): number[] {
        const broadcastIP = [];
        for (let i = 0; i < ip.length; ++i) {
            broadcastIP.push(parseInt(parseInt(ip[i]).toString(), 2));
        }
        return broadcastIP;
    }

    private _bitwise(
        firstBinary: string,
        secondBinary: string,
        operator: "AND" | "OR"
    ): string {
        const firstArr = firstBinary.split("");
        const secondArr = secondBinary.split("");
        let newAdded = "";
        for (let i = 0; i < firstArr.length; ++i) {
            if (firstArr[i] + "+" + secondArr[i] === "1+0") {
                newAdded += operator === "AND" ? "0" : "1";
            } else if (firstArr[i] + "+" + secondArr[i] === "0+1") {
                newAdded += operator === "AND" ? "0" : "1";
            } else if (firstArr[i] + "+" + secondArr[i] === "1+1") {
                newAdded += "1";
            } else if (firstArr[i] + "+" + secondArr[i] === "0+0") {
                newAdded += "0";
            }
        }
        return newAdded;
    }

    private _invertedBinary(number: string): string {
        const noArr = number.toString().split("");
        let newNo = "";
        for (let i = 0; i < noArr.length; ++i) {
            if (noArr[i] === "0") {
                newNo += "1";
            } else {
                newNo += "0";
            }
        }
        return newNo;
    }

    /**
     * Checking if the passed string is an IPv4 address
     *
     * @param {string} ip IP address
     * @returns {boolean} Whether the IP address transmitted is IPv4
     * @example
     * // Return true
     * IP.is("192.168.0.1");
     * @example
     * // Return false
     * IP.is("test");
     */
    public is(ip: string): boolean {
        return this._regular.isIPv4(ip);
    }

    /**
     * Returns the network address
     *
     * @param {string} ip IP адрес
     * @param {string} maskIP Subnet mask
     * @returns {string} Network IP
     * @example
     * // Return 192.168.1.0
     * IP.v4.calculateNetworkIP("192.168.1.1", "255.255.255.0")
     */
    public calculateNetworkIP(ip: string, maskIP: string): string {
        const binaryIP = this._toBinary(ip);
        const maskBinaryIP = this._toBinary(maskIP);

        const binaryNetwork = [];
        for (let j = 0; j < maskBinaryIP.length; ++j) {
            binaryNetwork.push(
                this._bitwise(binaryIP[j], maskBinaryIP[j], "AND")
            );
        }

        const NetworkIPArr = this._toIP(binaryNetwork);

        let networkIPstr = "";
        for (let k = 0; k < NetworkIPArr.length; ++k) {
            networkIPstr += NetworkIPArr[k].toString() + ".";
        }
        return networkIPstr.slice(0, -1);
    }

    /**
     * Get broadcast IP address
     *
     * @param {string} ip IP address
     * @param {string} maskIP Subnet mask
     * @returns {string} Broadcast IP
     * @example
     * // Return 192.168.1.255
     * IP.v4.calculateNetworkIP("192.168.1.1", "255.255.255.0")
     */
    public calculateBroadcastIP(ip: string, maskIP: string): string {
        const binaryIP = this._toBinary(ip);
        const maskBinaryIP = this._toBinary(maskIP);
        const invertedMark = [];
        for (let i = 0; i < maskBinaryIP.length; ++i) {
            invertedMark.push(this._invertedBinary(maskBinaryIP[i]));
        }

        const binaryBroadcast = [];
        for (let j = 0; j < maskBinaryIP.length; ++j) {
            binaryBroadcast.push(
                this._bitwise(binaryIP[j], invertedMark[j], "OR")
            );
        }

        const broadcastIPArr = this._toIP(binaryBroadcast);

        let broadcastIPStr = "";
        for (let k = 0; k < broadcastIPArr.length; ++k) {
            broadcastIPStr += broadcastIPArr[k].toString() + ".";
        }
        return broadcastIPStr.slice(0, -1);
    }
}

export default UtilsIPv4;
