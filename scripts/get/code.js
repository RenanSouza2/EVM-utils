'use strict'

import { ethers } from 'ethers';

const url = 'http://localhost:8545';
const provider = new ethers.providers.JsonRpcProvider(url);

const address = '0x723579527271f0bb22fa21e1c125179aacf7ba7d';
const code = await provider.getCode(address);
console.log(code);
