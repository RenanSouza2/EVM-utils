'use strict'

import { ethers } from 'ethers';

const url = 'http://localhost:8545';
export const provider = new ethers.providers.JsonRpcProvider(url);

const privateKey = '0xd16734cc1ee9cb70ec7ba7bf06b6a723785edc89c656653041fd9c1679504d7b';
export const signer = new ethers.Wallet(privateKey, provider);