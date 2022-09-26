'use strict'

import { mnemonics } from './mnemonics.js';

export function compile(mnemonic) {
    const tokens = mnemonic.split(' ');
    const compiled = tokens.map(token => {
        if(token[0] == '0') return token.substring(2);
        const opcode = mnemonics[token];
        if(opcode == undefined) throw new Error(`Uknown opcode: ${token}`);
        return opcode;    
    });
    return '0x'.concat(compiled.reduce((a, b) => a+b));
}


export function precompile(mnemonic) {
    const tokens = mnemonic.split(' ');
    
    const labels = tokens
        .map((token, index, arr) => {
            const offset = arr
                .slice(0, index)
                .filter(token => token[0] == '<')
                .length;
            return {
                token,
                offset: index + offset
            }
        })
        .filter(({ token }) => token[0] == '>')
        .map(({ token, offset }) => {
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
