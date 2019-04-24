'use strict';
const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  console.log(res);
  ctx.body = {
    success: true,
    code: 200,
    data: res,
    msg,
  };
  ctx.status = 200;
};

exports.fail = ({ ctx, msg = '请求失败', code = 300 }) => {
  ctx.body = {
    success: false,
    code,
    data: '',
    msg,
  };
  ctx.status = 200;
};
