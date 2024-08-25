import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import download from 'download-git-repo';
import { githubAddress } from '../../const/template.js';

export default function () {
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
      // 从github template分支拉react模版
      download(
        githubAddress['react-monorepo'],
        'test/tmp',
        // { headers: { 'PRIVATE-TOKEN': '1234' } }, // 如果是ssh就需要哈
        function (err) {
          console.log(err, githubAddress['react-monorepo']);
          console.log(chalk.green(`Hey there, ${answers}!`));
          spinner.succeed(chalk.green('Done!'));
        }
      );
    });
}
