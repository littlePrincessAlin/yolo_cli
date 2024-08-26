#!/usr/bin/env node --experimental-modules
import { program } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import reactCli from './src/react/index.js';
import vueCli from './src/vue/index.js';
// 引入json, 有实验的语法
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const log = console.log;
// 映射关系
const CreateCli = {
  react: reactCli,
  vue: vueCli,
};

// 设置usage、设置版本
program.usage('<command> [option]').version(pkg.version);

// 设置options
program
  .option('-f, --first', '第一个')
  .option('-d, --debug', '开启调试模式', false)
  .option('-e, --envName <envName>', '获取环境变量名称');

// create命令
const create = program.command('create <type>');
// create子命令
create
  .option('-m, --monorepo', '创建一个monorepo脚手架')
  .option('-s, --simple', '创建一个单项目脚手架');

create.description('创建脚手架').action(type => {
  // 你可以使用process.argv匹配命令，也可以直接用type
  // const str = process.argv.toString() || '';
  // const args = (str.split(',') || []).slice(3);

  // 匹配模版执行相应的js
  log(
    chalk.yellow(
      figlet.textSync(`My ${type} CLI`, {
        horizontalLayout: 'full',
      })
    )
  );
  CreateCli[type](create);
});

// 命令匹配，用于兜底
program
  .arguments('<cmd> [options]')
  .description('test command', {
    cmd: 'command to run',
    options: 'options for command',
  })
  .action((cmd, env) => {
    console.log(cmd, env);
  });

program.parse(process.argv); // 解析所有参数, 注意这里的调用位置
