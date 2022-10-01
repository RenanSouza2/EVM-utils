'use strict'

import { string } from './coder.js';
import { provider, signer } from './provider.js';

export function Contract(address) {
    return {
        call : async function (bytes) {
            const tx = {
                to: address,
                data: bytes
            }

            try {
                return await signer.call(tx);
            } catch(err) {
                const response = err.error.error.data;
                console.log('ERROR:', string.decode(response));
                return "ERROR";
            }
        },

        gas : async function (bytes) {
            const tx = {
                to: address,
                data: bytes
            }

            const { hash: txHash } = await signer.sendTransaction(tx);
            const receipt = await provider.getTransactionReceipt(txHash);
            return receipt.gasUsed.toNumber();
        },

        send : function (bytes) {
            const tx = {
                to: address,
                data: bytes
            }

            return signer.sendTransaction(tx);
        }
    }
}