'use strict'

import { BigNumber, ethers } from 'ethers';
const abi = ethers.utils.defaultAbiCoder;

export const uint256 = {
    encode : function (number) {
        return abi.encode([ "uint256" ], [ number ]);
    },

    decode : function (bytes) {
        const res = abi.decode([ "uint256" ], bytes).toString();
        return BigNumber.from(res);
    }
};

export const string = {
    decode: function (str) {
        return str
            .substring(4)
            .match(/.{1,2}/g)
            .map(ascii => {
                const number = Number("0x".concat(ascii));
                return String.fromCharCode(number);
            })
            .reduce((a, b) => a + b);
    }
}