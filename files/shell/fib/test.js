'use strict'

import { Fib } from '../../src/contracts/Fib.js';
import { versions } from './versions.js';

for(let j=0; j<versions.length; j++) {
    console.log();
    const fib = await Fib(versions[j]);
    
    const expected = [
        1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610
    ];
    
    try {
        for(let i=0; i<expected.length; i++) {
            console.log('Testing : ', i);
            const res = await fib.call(i);
            const number = res.toNumber();

            if(number != expected[i])
                throw new Error(`Failled test: ${i}, ${number}, ${expected[i]}`);
        }
        
        console.log('Test successful');
    } catch(err) {
        console.log();
        console.log('-----------');
        console.log(err);
    }
}

