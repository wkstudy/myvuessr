const express = require('express');
const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');

const app = express();
const renderer = createBundleRenderer(require('../static/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8'),
  clientManifest: require('../static/vue-ssr-client-manifest.json'),
});
// app.use(express.static('static'));
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.all('/', (req, res) => {
  const context = { url: req.url };
  console.log(context, 'context');
  renderer.renderToString(context, (err, html) => {
    console.log(err);
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }
    console.log(html);
    res.end(html);
  });
});
app.get('/api/getItem', (req, res) => {
  console.log(2);
  res.json({
    a: '14',
    name: 'joke',
  });
});
app.get('/api/getname', (req, res) => {
  res.json({
    name: 'joke',
  });
});

app.listen(3000);
