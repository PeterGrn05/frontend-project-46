#!/usr/bin/env node

import { Command } from "commander";
import genDiff from '../src/index.js';
import { getPath, getData } from '../src/parseJson.js';
const program = new Command();

program
    .name('gendiff')
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepat1>', 'path to file1')
    .argument('<filepath2>', 'path to file2')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2, format) => {
        console.log(genDiff(filepath1, filepath2)); 
    })

// program.help();

// program.action();