'use strict'

import * as fs from 'fs';
import * as readline from 'node:readline';

export async function Import(file) {
    const fileStream = fs.createReadStream(file);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    const lines = [];
    for await (const line of rl)
        lines.push(line);
    
    return lines
        .map(line => line.split('#')[0])
        .reduce((a, b) => a + ' ' + b)
        .split(' ')
        .filter(token => token.length > 0)
        .reduce((a, b) => a + ' ' + b)
}
