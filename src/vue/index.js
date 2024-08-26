import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import download from 'download-git-repo';
import { githubAddress } from '../../const/template.js';

export default function (create) {
  let optionType = 'vue-monorepo';
  const argv = process.argv;
  if (argv.includes('-s') || argv.includes('--simple')) {
    optionType = 'vue';
  }
  /**
   * 匹配子命令
   */

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'projectName',
        message: "What's your project name?",
      },
      {
        type: 'input',
        name: 'description',
        message: "What's your description?",
      },
    ])
    .then(answers => {
      const spinner = ora(`loding cli...`).start(); // 启动旋转器动画
      console.log(chalk.green(`Hey there, ${JSON.stringify(answers)}!`));
      const { projectName, description } = answers || {};
      // 从github template分支拉react模版
      download(
        githubAddress[optionType],
        projectName, // 目录
        { clone: true }, // 需要
        // { headers: { 'PRIVATE-TOKEN': '1234' } }, // 如果是ssh就需要哈
        function (err) {
          spinner.succeed(chalk.green('Done!'));
        }
      );
    });
}
