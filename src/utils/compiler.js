'use strict'

import { deployFunction } from './deploy.js';
import { opcodes } from './opcodes.js';

export function compile(mnemonics) {
    const tokens = mnemonics.split(' ');
    const compiled = tokens.map(token => {
        if(token[0] == '0') return token.substring(2);
        const opcode = opcodes[token];
        if(opcode == undefined) throw new Error(`Uknown opcode: ${token}`);
        return opcode;    
    });
    return '0x'.concat(compiled.reduce((a, b) => a+b));
}


export function precompile(asm) {
    const tokens = asm.split(' ');

    const sizes = tokens.map(token => {
        switch(token[0]) {
            case '<': return 2;
            case '0': return token.length/2 - 1;
            default : return 1;
        }
    });
    
    const labels = tokens
        .map((token, index) => {return { token, index }})
        .filter(({ token }) => token[0] == '>')
        .map(({ token, index }) => {
            const offsetNum = sizes
                .slice(0, index)
                .reduce((a, b) => a + b);
            
            const obj = {};
            obj[token.substring(1)] = '0x'.concat(offsetNum.toString(16).padStart(4, '0'));
            return obj;
        })
        .reduce((a, b) => {return {...a, ...b}});
    
    const res = tokens
        .map(token => {
            switch(token[0]) {
                case '<':
                const ref = token.substring(1);
                const label = labels[ref];
                if(label == undefined) throw new Error('Unknown label : ', label);
                return label;

                case '>': return 'JUMPDEST'
                default : return token;
            }
        });

    return res.reduce((a, b) => a + ' ' + b);
}

export function toolchain(asm) {
    const precompiled = precompile(asm);
    console.log('mnemonics : ', precompiled);

    const bytecode = compile(precompiled);
    return deployFunction(bytecode);
}