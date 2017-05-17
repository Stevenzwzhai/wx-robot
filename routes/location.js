const superagent = require('superagent');
const fs = require('fs');
const path = require('path');

module.exports = (lat, callback) => {
    console.log(lat)
    superagent.get('http://apis.map.qq.com/jsapi')
        .query({
            qt:'pos',
            tp:'lonlat',
            wd:lat,
            output:'json',
            pf:'jsapi',
            ref:'jsapi',
            cb:'qq.maps._svcb3.city_service_0'
        })
        .end(function(err, res){
            if(err) throw err;
            let resInfo = "位置信息有误";
            if(res.status == 200 && res.text){
                let content = JSON.parse(res.text);

                if(content.detail){
                    resInfo = Object.values(content.detail.path).join();
                     resInfo = "你的所在地：";
                    content.detail.path.reverse().forEach((name) => {  
                        resInfo+=name.cname;
                    })
                }
                
            }
            callback(resInfo);
            fs.writeFile(path.join(__dirname, 'b.js'), JSON.stringify(res), () => {

                    })
        })
}