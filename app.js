'use strict';
var timeline = require('./controllers/timeline');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/', timeline.home)); //主页时间轴
app.use(route.get('/timeline', timeline.home)); //主页时间轴
app.use(route.get('/timelineList', timeline.list));
app.use(route.get('/timeline/:id', timeline.fetch)); //详情
app.use(route.post('/timeline', timeline.create)); //添加
app.use(route.post('/timeline/del', timeline.del)); //删除
app.use(route.post('/timeline/edit', timeline.edit)); //编辑
// app.use(route.get('/async', timeline.delay));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
