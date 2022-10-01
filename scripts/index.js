'use strict'

import { Import } from "../src/utils/import.js";

const code = await Import('codes/fib1.evm');
console.log(code);