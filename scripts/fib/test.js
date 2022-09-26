'use strict'

import { fibAt } from '../../src/contracts/Fib.js';
import { toolchain } from '../../src/utils/compiler.js';
import { deployFunction } from '../../src/utils/deploy.js';
import { versions } from './codes.js';

for(let j=0; j<versions.length; j++) {
    console.log();
    const address = await toolchain(versions[j]);
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
}

