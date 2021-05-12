import { writeFileSync } from 'fs';

interface CreateReadMeArgs {
  projectPath: string
  projectName: string
  author: string
}

export function createReadMe({ projectPath, projectName, author }: CreateReadMeArgs): void {
  const file = `# ${projectName} by ${author}\n\nProject scaffold by [create](https://github.com/aldotestino/rcreate)`;
  writeFileSync(`${projectPath}/README.md`, file);
}