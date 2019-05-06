function getHost(): string {
  return 'http://localhost:3010'
}

const HOST: string = getHost();

function getPath (path: string): string {
  return HOST + path;
}

export default {
  api: {
    host: HOST,
    getPath: getPath,
    SUCCESS_STATUS: [200, 201],
  }
}