'use strict'

import { ethers } from 'ethers';
import { provider, signer } from './provider.js';

const abi = ethers.utils.defaultAbiCoder;

export const uint256 = {
    encode : function (number) {
        return abi.encode([ "uint256" ], [ number ]);
    },

    decode : function (bytes) {
        return abi.decode([ "uint256" ], bytes);
    }
};

export function contractAt(address) {
    return {
        call : async function (bytes) {
            const tx = {
                to: address,
                data: bytes
            }

            return await signer.call(tx);
        },

        gas : async function (bytes) {
            const tx = {
                to: address,
                data: bytes
            }

            console.log();
            const { hash: txHash} = await signer.sendTransaction(tx);
            const receipt = await provider.getTransactionReceipt(txHash);
            return receipt.gasUsed.toNumber();
        }
    }
}