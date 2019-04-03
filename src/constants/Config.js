function getHost() {
  return 'http://localhost:3010'
}

const HOST = getHost();

function getPath (path) {
  return HOST + path;
}

export default {
  api: {
    host: HOST,
    getPath: getPath,
    SUCCESS_STATUS: [200, 201],
  }
}