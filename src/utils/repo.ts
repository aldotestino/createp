import axios from 'axios';

interface CreateRepoArgs {
  projectName: string
  token: string
}

interface CreateRepoResponse {
  gitUrl: string | null
  err: string | null
}

const url = 'https://api.github.com';

export async function createRepo({ projectName, token }: CreateRepoArgs): Promise<CreateRepoResponse> {
  try {
    const res = await axios.post(`${url}/user/repos`, { name: projectName }, 
      { 
        headers: {
          Authorization: `token ${token}`,
          'content-type': 'application/json'
        }
      }
    );
    return {
      gitUrl: res.data.clone_url,
      err: null
    };
  }catch(e) {
    if(e.response.status === 422) {
      return {
        gitUrl: null,
        err: `Project "${projectName}" already exists on your GitHub.`
      };
    }
    return {
      gitUrl: null,
      err: 'Something went wrong, control your GitHub access token.'
    };
  }
}
