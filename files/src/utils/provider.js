'use strict'

import { ethers } from 'ethers';

const url = 'http://localhost:8545';
export const provider = new ethers.providers.JsonRpcProvider(url);

const privateKey = '0xe4133b52ce7472e55fd95e1b211f50a4a27b874c46339e88b5a0c396406dd19b';
export const signer = new ethers.Wallet(privateKey, provider);