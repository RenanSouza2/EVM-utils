'use strict'

import { fibAt } from '../src/contracts/Fib.js';
import { toolchain } from '../src/utils/compiler.js';
import { deployFunction } from '../src/utils/deploy.js';


const linear = 'PUSH1 0x00 CALLDATALOAD PUSH1 0x01 PUSH1 0x01 >loop DUP3 PUSH1 0x02 GT PUSH2 <end_loop JUMPI DUP1 SWAP2 ADD PUSH1 0x01 DUP4 SUB SWAP3 POP PUSH2 <loop JUMP >end_loop PUSH1 0x00 MSTORE PUSH1 0x20 PUSH1 0x00 RETURN';

const log = 'PUSH1 0x00 CALLDATALOAD PUSH1 0x01 >loop_1 DUP1 DUP3 LT PUSH2 <out_loop_1 JUMPI PUSH1 0x01 SHL PUSH2 <loop_1 JUMP >out_loop_1 PUSH1 0x01 SHR PUSH1 0x01 PUSH1 0x00 PUSH1 0x01 >loop_2 DUP4 ISZERO PUSH2 <out_loop_2 JUMPI DUP3 DUP1 MUL DUP3 DUP1 MUL ADD DUP4 DUP4 MUL DUP4 DUP4 MUL ADD DUP4 DUP1 MUL DUP4 DUP1 MUL ADD SWAP3 POP SWAP3 POP SWAP3 POP DUP5 DUP5 AND ISZERO PUSH2 <prep_iteration JUMPI DUP2 SWAP3 POP SWAP1 DUP2 ADD >prep_iteration DUP4 PUSH1 0x01 SHR SWAP4 POP PUSH2 <loop_2 JUMP >out_loop_2 PUSH1 0x00 MSTORE PUSH1 0x20 PUSH1 0x00 RETURN';

const address = await toolchain(log);
const fib = fibAt(address);

const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

try {
    for(let i=1; i<10; i++) {
        console.log();
        console.log('Testing : ', i);
        const res = await fib.call(i);
        console.log('fibb    : ', res.toString());
        if(!res == expected[i]) throw new Error(`Failled test: ${i}`);
    }
    
    console.log('Test successful');
} catch(err) {
    console.log();
    console.log('-----------');
    console.log(err);
}
