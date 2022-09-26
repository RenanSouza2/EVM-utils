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
            const offset = sizes
                .slice(0, index)
                .reduce((a, b) => a + b);

            return {
                token: token.substring(1),
                offset: '0x'.concat(offset.toString(16).padStart(4, '0'))
            }
        });
        
    const res = tokens
        .map(token => {
            switch(token[0]) {
                case '<':
                const ref = token.substring(1);
                const label = labels.filter(({ token }) => token == ref);
                if(label.length == 0) throw new Error(`Label ${label} not found`);
                if(label.length  > 1) throw new Error(`Label ${label} not unique`);
                return label[0].offset;

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