import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import { createReadMe } from './utils/createReadMe';
import { createRepo } from './utils/repo';
import cli from 'cli-ux';
import { getToken, saveToken } from './utils/token';

class Createp extends Command {
  static description = 'Simple CLI to create a new repo on github';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    force: flags.boolean({ char: 'f', description: 'force the creation of the project' }),
    token: flags.string({ char: 't', description: 'set your GitHub Authorization Token' }),
    save: flags.boolean({ char: 's', description: 'use the token as default' })
  };

  static args = [{ name: 'projectName' }];

  async run(): Promise<void> {
    const { args, flags } = this.parse(Createp);
    
    let GITHUB_TOKEN: string;

    if(!flags.token) {
      const token = getToken();
      if(!token) {
        this.error('A GitHub access token is needed to create a repository.');
      }else {
        GITHUB_TOKEN = token;
      }
    } else {
      GITHUB_TOKEN = flags.token;
    }

    if(flags.save) {
      saveToken(GITHUB_TOKEN!);
      this.log('GitHub Authorization Token succesfully saved.');
    }

    if(!args.projectName) {
      this.exit();
    }

    const githubUsername = execSync('git config user.name', { encoding: 'utf-8' }).toString().trim();
    const projectPath = path.join(process.cwd(), args.projectName);

    const folderExists = existsSync(projectPath);
    if(folderExists && !flags.force) {
      this.error(`The project "${args.projectName}" already exists in this folder.`);
    }

    if(folderExists && flags.force) {
      execSync(`rm -rf ${projectPath}`);
    }

    mkdirSync(projectPath);
    createReadMe({ projectPath, projectName: args.projectName, author: githubUsername });

    cli.action.start('Creating GitHub repo');
    const { gitUrl, err } = await createRepo({ projectName: args.projectName, token: GITHUB_TOKEN! });
    cli.action.stop();

    if(err) {
      this.error(err);
    }

    cli.action.start('Initializing local repo');
    execSync(`git init && git add . && git commit -m "first commit" && git branch -M main && git remote add origin ${gitUrl} && git push -u origin main`, { stdio: 'ignore', cwd: projectPath });
    cli.action.stop();

    this.log(`🚀 Your project has been uploaded to GitHub at ${gitUrl?.slice(0, gitUrl.length-4)}\n$ cd ${args.projectName}\n$ code .`);
  }
}

export = Createp;
