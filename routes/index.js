/*
 * @Author: YaoFeiliang
 * @Github: https://github.com/yaofeiliang
 * @Blog: http://www.yaofeiliang.com
 * @Date: 2019-06-16 15:58:17
 * @LastEditors: YaoFeiliang
 * @LastEditTime: 2019-06-16 21:41:25
 * @Description: file content
 */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.dir(123);
  res.render('index', {title: 'Express'});
});
router.get('/yaoCanvas', function(req, res, next) {
  res.render('yaoCanvas', {title: 'yaoCanvas'});
});

module.exports = router;
