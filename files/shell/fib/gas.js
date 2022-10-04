'use strict'

import { Fib } from "../../src/contracts/Fib.js";

const versions = [ 'fib/fib1.evm', 'fib/fib2.evm', 'fib/fib3.evm' ];

const fib = [];

for(let i=0; i<versions.length; i++) {
    fib.push(await Fib(versions[i]));
}

for(let i=0; i<257; i++) {
    const gas = [];
    for(let j=0; j<fib.length; j++)
        gas.push((await fib[j].gas(i)) - 21000);
    
    console.log(i, ...gas.map(item => ',' + item));
}