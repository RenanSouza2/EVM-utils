'use strict'

import { ethers } from 'ethers';

const url = 'http://localhost:8545';
export const provider = new ethers.providers.JsonRpcProvider(url);

const privateKey = '0x1690550de60b15e4f8fd7c61286d6edb71fb0f2b976814f45c1ad9656e35faf8';
export const signer = new ethers.Wallet(privateKey, provider);