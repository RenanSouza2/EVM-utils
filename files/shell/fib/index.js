'use strict'

import { Fib } from '../../src/contracts/Fib.js';

const versions = [  'fib/fib1.evm', 'fib/fib2.evm', 'fib/fib3.evm' ];

for(let j=0; j<versions.length; j++) {
    console.log();
    const fib = await Fib(versions[j]);
    
    const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    
    try {
        for(let i=0; i<10; i++) {
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

