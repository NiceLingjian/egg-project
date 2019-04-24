'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: { type: String, default: 'https://miz-test.oss-cn-hangzhou.aliyuncs.com/88861247-4014-4537-a4db-06749ce42043.png' },
  }, {
    versionKey: false, // 去掉版本锁 _v
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'modifyTime',
    }, // 自动管理修改时间
  });
  return mongoose.model('User', UserSchema, 'UserInfo');
};
