import { Command } from "commander";
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0');
program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information');
program.parse();