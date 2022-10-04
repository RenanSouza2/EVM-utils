'use strict'

import { ethers } from 'ethers';

const url = 'http://localhost:8545';
export const provider = new ethers.providers.JsonRpcProvider(url);

const privateKey = '0x5fbcf7b75eca6ed885c326755b506a4172ed292a93d601ade5da7cef36d89a24';
export const signer = new ethers.Wallet(privateKey, provider);