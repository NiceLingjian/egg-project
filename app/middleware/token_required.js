'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let token = '';
    if (
      ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = ctx.headers.authorization.split(' ')[1];
    } else if (ctx.query.accesstoken) {
      token = ctx.query.accesstoken;
    } else if (ctx.request.body.accesstoken) {
      token = ctx.request.body.accesstoken;
    }
    let decoded;
    try {
      decoded = await ctx.service.actionToken.verifyToken(token);
      console.log(decoded);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        ctx.helper.fail({ ctx, msg: 'token失效', code: '-1999' });
      } else {
        ctx.helper.fail({ ctx, msg: '没有token', code: '-1999' });
      }
      return;
    }
    try {
      const user = await ctx.service.user.find(decoded.data._id);
      if (!user) {
        ctx.helper.fail({ ctx, msg: '用户不存在', code: '-1999' });
        return;
      }
      ctx.request.user = user;
    } catch (e) {
      ctx.helper.fail({ ctx, msg: '用户不存在', code: '-1999' });
    }
    await next();
  };
};
