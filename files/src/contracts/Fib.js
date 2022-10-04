'use strict'

import { uint256 } from '../utils/encoder.js';
import { instance } from '../utils/instance.js';
import { toolchain } from "../utils/toolchain.js"


export async function Fib(code) {
    const contract = await toolchain(code);

    return {
        call : async function (num) {
            const bytesIn = uint256.encode(num);
            const bytesOut = await contract.call(bytesIn);
            return uint256.decode(bytesOut);
        },

        gas : async function (num) {
            const bytesIn = uint256.encode(num);
            return contract.gas(bytesIn);
        },

        address: contract.address
    }
}
