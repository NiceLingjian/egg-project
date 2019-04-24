'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.UserLoginTransfer = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    };
    this.UserCreateTransfer = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
    };
  }

  // 用户登录
  async login() {
    const { ctx, service } = this;
    try {
      ctx.validate(this.UserLoginTransfer);
      const payload = ctx.request.body || {};
      // 调用 Service 进行业务处理
      const res = await service.user.login(payload);
      ctx.helper.success({ ctx, res });
    } catch (error) {
      ctx.helper.fail({ ctx, msg: error.message, code: -200 });
    }
  }
  // 用户登出
  async logout() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.user.logout();
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 创建用户
  async register() {
    const { ctx, service } = this;
    try {
      ctx.validate(this.UserCreateTransfer);
      const payload = ctx.request.body || {};
      // 调用 Service 进行业务处理
      const res = await service.user.register(payload);
      // 设置响应内容和响应状态码
      ctx.helper.success({ ctx, res });
    } catch (error) {
      ctx.helper.fail({ ctx, msg: error.message, code: -200 });
    }
  }
  // 用户信息
  async info() {
    const { ctx } = this;
    const user = ctx.request.user;
    const { username, avatar } = user;
    const res = {
      username,
      avatar,
    };
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
