'use strict'

import { Import } from './import.js';
import { precompile, compile } from './compiler.js';
import { deploy } from './deploy.js';
import { instance } from './instance.js';

export async function  toolchain(file) {
    const asm = await Import(file);
    const precompiled = precompile(asm);
    console.log('mnemonics : ', precompiled);

    const bytecode = compile(precompiled);
    const address = await deploy.function(bytecode);
    return instance(address)
}
