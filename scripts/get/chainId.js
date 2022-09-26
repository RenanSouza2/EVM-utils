'use strict'

import { ethers } from 'ethers';

const url = 'http://localhost:8545';
const provider = new ethers.providers.JsonRpcProvider(url);

const blokcNumber = await provider.getBlockNumber();
const chainId = await provider.getBlock(blokcNumber);
console.log(chainId);

const txHash = '0xfbf421b2d3bf7d290b0072f0d19aaf181ef0fbcf7f7a39526e55e6355cbae544';
const tx = await provider.getTransaction(txHash);
console.log(tx);