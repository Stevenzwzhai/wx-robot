const superagent = require('superagent');
const path = require('path');
const fs = require('fs');

module.exports = (content, deal)=>{
    console.log(content);
    superagent
        .post('http://openapi.tuling123.com/openapi/api/v2')
            .set('Content-Type', 'application/json')
            .send({
                "perception": {
                    "inputText": {
                        "text": content
                    },
                    "selfInfo": {
                        "location": {
                            "city": "深圳",
                            "latitude": "22.533455",
                            "longitude":"113.955338",
                            "nearest_poi_name": "金蝶软件园",
                            "province": "广东",
                            "street": "沙河西路"
                        },
                    }
                },
                "userInfo": {
                    "apiKey": "2d4763ac1b344e458949bdd047f78c84",
                    "userId": 333
                }
            })
            .end(function(err, res){
                if(err) throw err;
                if (res.ok) {
                    console.log(res.text)
                    // console.log(JSON.stringify(res));
                    let info = JSON.parse(res.text);
                    if(info.results){
                        // console.log(info.results[0].values.text);
                        let replyInfo = "";
                        info.results.forEach((item) => {
                            switch(item.resultType){
                                case 'url':
                                    deal.reply(item.values.url);
                                    break;
                                case 'news':
                                    dealNews(item.values.news, deal);
                                case 'text':
                                    if(info.results.length<2){
                                        deal.reply(item.values.text);
                                    }
                                    break;
                            }
                        })
                        // callback(replyInfo);
                    }
                    fs.writeFile(path.join(__dirname, 'robotlogmessage.js'), JSON.stringify(res), () => {
                        
                    })
                    return "";
                } else {
                    console.log('Oh no! error ' + res.text);
                    return "";
                }
            });
}

function dealNews(news, deal){
    let allNews = [];
    if(news.length>8){
        let start =Math.floor(Math.random()*(news.length - 8));
        news = news.slice(start, start+8);
        console.log(start);
    }
   
    news.forEach((item) => {
        allNews.push({
            'title': item.name,
            'description': item.info,
            'picurl': item.icon,
            'url': item.detailurl
        })
    })
    // console.log(allNews);
    deal.reply(allNews);
}