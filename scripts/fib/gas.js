'use strict'

import { fibAt } from "../../src/contracts/Fib.js";
import { toolchain } from "../../src/utils/compiler.js"
import { versions } from "./codes.js"

const address_1 = await toolchain(versions[0]);
const fib_1 =  fibAt(address_1);

const address_2 = await toolchain(versions[1]);
const fib_2=  fibAt(address_2);

for(let i=0; i<257; i+=1) {
    const gas1 = await fib_1.gas(i) - 21000;
    const gas2 = await fib_2.gas(i) - 21000;

    const res_1 = await fib_1.call(i);
    const res_2 = await fib_2.call(i);
    if(!res_1.eq(res_2)) throw new Error('Wrong response');

    const speedup = 1 - (gas2 / gas1);

    console.log(i, ',', gas1, ',', gas2, ',', speedup);
}
