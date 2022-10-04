'use strict'

import { opcodes } from './opcodes.js';

function computeStrings(input) {
    return input.split('[')
        .map((snippet, index) => {
            if(index == 0) return snippet;

            const [ string, snippet_next ] = snippet.split(']');

            const len = string.length;
            const len_hex = len.toString(16).padStart(2, '0');
            const string_hex = string
                .split('')
                .map(
                    char => char
                        .charCodeAt(0)
                        .toString(16)
                        .padStart(2, '0')
                ).reduce((a, b) => a + b);

            return '0x' + len_hex + ' 0x' + string_hex + snippet_next
        })
        .reduce((a, b) => a + b);
}

function computeLabels(tokens) {
    const sizes = tokens.map(token => {
        switch(token[0]) {
            case '<': return 2;
            case '|': return 0;
            case '0': return token.length/2 - 1;
            default : return 1;
        }
    });
    
    return tokens
        .map((token, index) => {return { token, index }})
        .filter(({ token }) => token[0] == '>' || token[0] == '|')
        .map(({ token, index }) => {
            const offsetNum = sizes
                .slice(0, index)
                .reduce((a, b) => a + b);
            
            const obj = {};
            obj[token.substring(1)] = '0x'.concat(offsetNum.toString(16).padStart(4, '0'));
            return obj;
        })
        .reduce((a, b) => {return {...a, ...b}});
}

function replaceReferences(tokens, labels) {
    return tokens
        .map(token => {
            switch(token[0]) {
                case '<':
                const ref = token.substring(1);
                const label = labels[ref];
                if(label == undefined) throw new Error(`Unknown label : ${ref}`);
                return label;

                case '|': return '';
                case '>': return 'JUMPDEST';
                case '0': return '0x' + token.substring(2).toUpperCase();
                default : return token.toUpperCase();
            }
        })
        .filter(token => token.length > 0)
        .reduce((a, b) => a + ' ' + b);
}

function computeAddresses(code) {
    const tokens = code.split(' ');
    const labels = computeLabels(tokens);
    return replaceReferences(tokens, labels);
}



export function compile(mnemonics) {
    const tokens = mnemonics.split(' ');
    const compiled = tokens.map(token => {
        if(token[0] == '0') return token.substring(2);

        const opcode = opcodes[token];
        if(opcode == undefined) throw new Error(`Uknown opcode: ${token}`);
        return opcode;    
    });
    return '0x'.concat(compiled.reduce((a, b) => a + b));
}

export function precompile(asm) {
    
    const code = computeStrings(asm);
    return computeAddresses(code); 
}
