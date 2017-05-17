const wechat = require('wechat');
const config = require('../config');
const robot = require('./robot');
const location = require('./location');
const BusLine = require('./BusLine');

exports.getInfoList = wechat(config.infoList, wechat.text((message, req, res) => {
   
   if(message.Content=="公交查询"){
       res.reply('请按如下格式输入（注意标点符号均为英文）：\nbl:城市,XXX到XXX');
       return;
   }
   let result = message.Content.split(':');
   if(result.length>1&&result[0]=='bl'){
       BusLine(result[1], res);
       return;
   }
    robot(message.Content, res);
    // res.reply('hahha')
    // res.reply(resInfo.toSting());
//    res.reply('hello world');
    // res.reply({
    //     title: "来段音乐吧",
    //     description: "一无所有",
    //     musicUrl: "http://mp3.com/xx.mp3",
    //     hqMusicUrl: "http://mp3.com/xx.mp3",
    //     thumbMediaId: "thisThumbMediaId"
    // });
}).image(function (message, req, res, next) {
    res.reply([{
        'title':"hello",
        'description':"welcome to here",
        'picurl':"http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg",
        'url':"https://Stevenzwzhai.github.io/"
    },{
        'title':"hello",
        'description':"welcome to here",
        'picurl':"http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg",
        'url':"https://Stevenzwzhai.github.io/"
    }])
    // res.reply({
    //     type: "voice",
    //     content: {
    //         mediaId: 'mediaId'
    //     }
    // });
    // res.reply({
    //     type: 'hardware',
    //     HardWare:{
    //         MessageView: 'myrank',
    //         MessageAction: 'ranklist'
    //     }
    // });
}).voice(function (message, req, res, next) {
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
  console.log(message.Location_X,message.Location_Y);
  if(message.Location_X && message.Location_Y){
        location(message.Location_Y + ',' + message.Location_X, (location) => {
            res.reply(location);
        })
        return;
  }
  res.reply('位置信息有误');
}).link(function (message, req, res, next) {
  // TODO
}).event(function (message, req, res, next) {
  // TODO
}).device_text(function (message, req, res, next) {
  // TODO
}).device_event(function (message, req, res, next) {
  // TODO
}).middlewarify());