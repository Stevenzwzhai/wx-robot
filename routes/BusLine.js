const superagent = require('superagent');


module.exports = (message, deal) => {
    let city, info;
    [city, info] = message.split(',');

    superagent.post('http://www.tuling123.com/openapi/api')
        .send({
            "key":"2d4763ac1b344e458949bdd047f78c84",
            "info":info,
            "loc":city, 
            "userid":"123456789"
        })
        .end((err, res) => {
            if(err) throw err;
            console.log(city, info);
            console.log(res.text);
            deal.reply(JSON.parse(res.text).text)
        })
}