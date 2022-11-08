const express = require('express');
const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');

const app = express();
const renderer = createBundleRenderer(require('../dist-server/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8'),
  clientManifest: require('../dist-client/vue-ssr-client-manifest.json'),
});
app.use(express.static(path.resolve(__dirname, '../dist-client'), { index: false }));

app.get('/', (req, res) => {
  const context = { url: req.url };
  console.log(context, 'context');
  renderer.renderToString(context, (err, html) => {
    console.log(err);
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }
    res.end(html);
  });
});
app.get('/about', (req, res) => {
  const context = { url: req.url };
  console.log(context, 'context');
  renderer.renderToString(context, (err, html) => {
    console.log(err);
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }
    res.end(html);
  });
});
app.get('/api/getItem', (req, res) => {
  res.json({
    a: '14' + Math.random(),
    name: 'carry',
  });
});
app.get('/api/getName', (req, res) => {
  res.json({
    name: 'peter' + Math.random(),
  });
});
app.get('/api/getLevel', (req, res) => {
  res.json([
    {
      value: 0,
      name: '青铜',
    },
    {
      value: 1,
      name: '白银',
    },
    {
      value: 2,
      name: '黄金',
    },
    {
      value: 3,
      name: '钻石',
    },
    {
      value: 4,
      name: '大师',
    },
    {
      value: 5,
      name: '王者',
    },
  ]);
});

app.listen(3000);
