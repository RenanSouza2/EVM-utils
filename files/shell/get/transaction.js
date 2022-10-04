'use strict'

import { ethers } from 'ethers';

const url = 'http://localhost:8545';
const provider = new ethers.providers.JsonRpcProvider(url);

const txHash = '0xf5f37b73b45e984de65366d438b7c3508d39403799672b862cfabb031dcceff0';
const tx = await provider.getTransaction(txHash);
console.log(tx.gasLimit.toString());