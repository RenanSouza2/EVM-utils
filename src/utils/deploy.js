'use strict'

import { signer, provider } from "./provider.js";

export async function deployBytecode(bytecode) {
    console.log();
    
    const tx = { data: bytecode }
    const { hash: txHash } = await signer.sendTransaction(tx);
    const { contractAddress: contract } = await provider.getTransactionReceipt(txHash);
    console.log('Contract address : ', contract);

    const code = await provider.getCode(contract);
    console.log('deployed code    : ', code);

    return contract;
}

export function deployFunction(functionBytecode) {
    const code = functionBytecode.substring(2);

    const len = code.length / 2;
    const lenStr = len.toString(16).padStart(4, '0');

    const bytecode = '0x61' + lenStr + '80600C6000396000F3' + code;
    return deployBytecode(bytecode);
}