const fastifyPlugin = require('fastify-plugin');
const http = require('http');
const { execSync } = require('child_process');
const { existsSync } = require('fs');

function profilerPlugin(fastify, options, done) {
  const port = options.port || 3001;
  const server = http.createServer((req, res) => {
    if (req.url === '/profile') {
      const logPath = 'isolate-log.log';
      const appName = 'your-app.js';  // replace with your app's entry file

      if (existsSync(logPath)) execSync('rm isolate-log.log');
      execSync(`node --prof ${appName}`);
      execSync('node --prof-process --preprocess -j isolate-0x*-v8.log > cpu-profile.json');

      res.end('Profile generated');
    } else {
      res.end('Not Found');
    }
  });

  server.listen(port, () => {
    console.log(`Profiling server running on port ${port}`);
  });

  done();
}

module.exports = fastifyPlugin(profilerPlugin);
