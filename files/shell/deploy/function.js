'use strict'

import { deployFunction } from "../../src/utils/deploy.js";

const bytecode = '0x61ABCD60005260206000F3';
deployFunction(bytecode);