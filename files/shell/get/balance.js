'use script'

import { provider } from "../../src/utils/provider.js";

const address = '';
const balance = await provider.getBalance(address);
console.log(balance.toString());