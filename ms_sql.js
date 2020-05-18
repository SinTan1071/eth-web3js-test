// 帮助三井从链上恢复数据用
// 1.分析三井messenger日志
const fs = require('fs');
const logFile = './log.log';
// const logAnalyzeJsonFile = './logAnalyze.json';
// const logAnalyzeJsonFile = './logAnalyzeNoTime.json';
const logAnalyzeJsonFile = './logAnalyzeNoTimeNoKey.json';
// const logAnalyzeJsonFile = './logAnalyzeNoTimeGetMsg.json';
// const logAnalyzeJsonFile = './logAnalyzeNoTimeSendMsg.json';

function analyzeLog() {
    let data = fs.readFileSync(logFile);
    let arrData = data.toString().split("\n");
    const result = [];
    console.log("可用数据："+ arrData.length +"条");
    for (let i = 0; i < arrData.length; i++) {
        let obj = {};
        let key = arrData[i].substr(0, 23);
        let value = {};
        let eleGetMsg = {};
        let valueArr = arrData[i].substr(101).split(" :"); // 101是数出来的，因为这个log的前缀是固定长度的，要么是101，要么是102
        // if (valueArr.length === 2){
        if (valueArr.length === 2 /*后面增加了特殊的筛选条件 不要 send tx*/ && (valueArr[0].trim() === 'Send message' || valueArr[0].trim() === 'Get message ID') ){
        // if (valueArr.length === 2 /*get message*/ && valueArr[0].trim() === 'Get message ID'){
        // if (valueArr.length === 2 /*send message*/ && valueArr[0].trim() === 'Send message'){
            valueArr[0].trim() === 'Get message ID' ? eleGetMsg['getMsgId'] = valueArr[1].trim() : null;
            value[valueArr[0].trim()] = valueArr[0].trim() !== 'Get message ID' ? JSON.parse(valueArr[1].trim()) : valueArr[1].trim();
        } else {
            continue;
        }
        // 不带任何key
        // console.log(value[valueArr[0].trim()], eleGetMsg);
        result.push(valueArr[0].trim() === 'Get message ID' ? eleGetMsg : value[valueArr[0].trim()]);
        // 带get还是send key
        // console.log(value);
        // result.push(value);
        // 带时间key
        // obj[key] = value;
        // result.push(obj);
    }
    console.log("处理后数据："+ result.length +"条");

    console.log("准备写入文件...");
    fs.writeFile(logAnalyzeJsonFile, JSON.stringify(result),  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
    });
}

analyzeLog();
