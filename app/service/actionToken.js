'use strict';

const Service = require('egg').Service;

class ActionTokenService extends Service {
  // 生成token
  async apply(_id) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.secret);
  }
  // 验证token合法
  async verifyToken(token) {
    const { ctx } = this;
    return ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
  }
}

module.exports = ActionTokenService;
