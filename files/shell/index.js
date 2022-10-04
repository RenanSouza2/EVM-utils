'use strict'

import { toolchain } from "../src/utils/toolchain.js";

const contract = await toolchain('complete.evm');

const calldata = ['0x3fa4f245', '0xc15bae84', ''];

for(let i=0; i<calldata.length; i++) {
    const _calldata = calldata[i];

    console.log();
    const res = await contract.call(_calldata);
    
    console.log('[', _calldata, ']');
    console.log(res);
}
