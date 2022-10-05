'use strict'

import { Fib } from "../../src/contracts/Fib.js";
import { versions } from './versions.js';

const fib = [];

for(let i=0; i<versions.length; i++) {
    fib.push(await Fib(versions[i]));
}

for(let i=0; i<360; i++) {
    const gas = [];
    for(let j=0; j<fib.length; j++)
        gas.push((await fib[j].gas(i)) - 21000);
    
    const format = gas
        .map(item => [',', item])
        .reduce((a, b) => [...a, ...b]);

    console.log(i, ...format);
}