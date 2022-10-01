'use strict'

import { contractAt, uint256 } from "../utils/interaction.js";

export function Fib(address) {
    const contract = contractAt(address);

    return {
        call : async function (num) {
            const bytesIn = uint256.encode(num);
            const bytesOut = await contract.call(bytesIn);
            return uint256.decode(bytesOut);
        },

        gas : async function (num) {
            const bytesIn = uint256.encode(num);
            return contract.gas(bytesIn);
        }
    }
}
