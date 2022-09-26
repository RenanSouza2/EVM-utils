'use strict'

import { ethers } from 'ethers';

const url = 'http://localhost:8545';
export const provider = new ethers.providers.JsonRpcProvider(url);

const privateKey = '0xfb80fb23292e53cd22d8206439eb8757c7b53ac379619173afde037508853f8e';
export const signer = new ethers.Wallet(privateKey, provider);