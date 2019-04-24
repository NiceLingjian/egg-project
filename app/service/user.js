'use strict';
const Service = require('egg').Service;

class UserService extends Service {

  async login(payload) {
    const { ctx, service } = this;
    const { username } = payload;
    const user = await this.findByUser(username);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    const verifyPsw = await ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      ctx.throw(404, '用户密码错误');
    }
    const token = await service.actionToken.apply(user._id);
    ctx.cookies.set(
      'token',
      token,
      { httpOnly: false }
    );
    return { token };
  }

  async logout() {
    const { ctx } = this;
    ctx.cookies.set(
      'token',
      '',
      { httpOnly: false, maxAge: 0 }
    );
    return true;
  }

  async register(payload) {
    const { ctx } = this;
    const { username } = payload;
    const user = await this.findByUser(username);
    if (user) {
      ctx.throw(404, '用户已存在');
      return;
    }
    payload.password = await this.ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }

  // COMMON

  async find(id) {
    return this.ctx.model.User.findById(id).exec();
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values);
  }

  async findByUser(username) {
    return this.ctx.model.User.findOne({ username });
  }

  /*
   * 根据 token 查找用户
   * @param {String} token
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByToken(accessToken) {
    const query = { accessToken };
    return this.ctx.model.User.findOne(query).exec();
  }
}


module.exports = UserService;
