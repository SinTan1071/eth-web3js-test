const Web3 = require('web3');
// const contractJson = require('./setget.json');
// const contractJson = require('./ecrecover.json');
// const contractJson = require('./SMecrecover.json');
const contractJson = require('./onlySMecrecover.json');

const web3 = new Web3('http://localhost:8545');
const _from = '0x7eff122b94897ea5b0e2a9abf47b86337fafebdc'; // secp256k1
const _pass = "1234";
// const _from = '0x1309a99c2fef7eca44f48009935dfda559771694'; // sm2p256v1
// const _pass = "12345";
const _to = '';
const _gas = 1500000;
const _gasPrice = '30000000000000';

async function unlock() {
    await web3.eth.personal.unlockAccount(_from, _pass, 999999999)
}

async function deploy() {
    var contractInst = new web3.eth.Contract(contractJson.abi);
    var address = await contractInst.deploy({
        data: '0x' + contractJson.bin
    })
    .send({
        from: _from,
        gas: _gas,
        gasPrice: _gasPrice
    })
    .then(newContractInst => {
        return newContractInst.options.address;
    })
    .catch(e => {
        console.error(e);
    });
    console.log("deploy address: ", address);
    return address;
}

async function call(contractAddr, methodName, ...params) {
    var contractInst = new web3.eth.Contract(contractJson.abi, contractAddr);
    var contractInstMethod = !!params?contractInst.methods[methodName](...params):contractInst.methods[methodName]();
    var result = await contractInstMethod.call({
        from: _from
    })
    .then((result) => {
        return result;
    })
    .catch(e => {
        console.error(e);
    });
    console.log("call result: ", result);
    return result;
}

async function send(contractAddr, methodName, ...params) {
    var contractInst = new web3.eth.Contract(contractJson.abi, contractAddr);
    var contractInstMethod = !!params?contractInst.methods[methodName](...params):contractInst.methods[methodName]();
    var receipt = await contractInstMethod.send({
        from: _from
    })
    .then((receipt) => {
        return receipt;
    })
    .catch(e => {
        console.error(e);
    });
    console.log("send receipt: ", receipt);
    return receipt;
}

async function Benchmark() {
    // let loop = 10
    /*secp256k1*/ //19s260ms 27ms
    // let startTime = new Date();
    // for (let i = 0; i < loop; i++) {
    //     // await web3.eth.personal.sign('你好 sintan1071 ！' + i, _from, _pass).then(sig=>{console.log('/*secp256k1*/ sign: ', sig)})
    //     await web3.eth.personal.ecRecover('0x1147174232333666114717423233366611471742323336661147174232333666', '0x8b9012ff364438c8fc750608e0968ed47f844f3a378aab089e758d59149e33b861208eba2d374a3df544c376b8131e675c98f2d4237e2cba50a7c767a6892d131b').then(addr=>{console.log('/*secp256k1*/ ecrecover: ', addr)}) // secp256k1
    // }
    // let stopTime = new Date();
    // console.log('/*secp256k1*/签名'+ loop +'次时间: ', formatSeconds(stopTime - startTime))
    /*sm2p256v1*/ //1s836ms 17ms
    // let startTime = new Date();
    // for (let i = 0; i < loop; i++) {
    //     // await web3.eth.personal.sign('你好 sintan1071 ！' + i, _from, _pass).then(sig=>{console.log('/*sm2p256v1*/ sign: ', sig)})
    //     await web3.eth.personal.ecRecover('0x1147174232333666114717423233366611471742323336661147174232333666', '0x960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76').then(addr=>{console.log('/*sm2p256v1*/ ecrecover: ', addr)}) // sm2p256v1
    // }
    // let stopTime = new Date();
    // console.log('/*sm2p256v1*/'+ loop +'次时间: ', formatSeconds(stopTime - startTime))
}

unlock().then(()=> {
// 这是setget测试
// deploy();
// send('0x2832dD7f707Cddc71A7C2F3a4D3FF39135db0567', 'set', '阿萨德法师打发23333 sintan1071 666');
// call('0x2832dD7f707Cddc71A7C2F3a4D3FF39135db0567', 'get');

// 这是ecrecover测试
// deploy();
// call('0xB6b29Ef90120BEC597939e0Eda6b8a9164F75deb', 'recoverSignerTest', web3.utils.keccak256("\x19Ethereum Signed Message:\n"+web3.utils.hexToBytes('0x1147174232333666114717423233366611471742323336661147174232333666').length+web3.utils.hexToUtf8('0x1147174232333666114717423233366611471742323336661147174232333666')), '0x8b9012ff364438c8fc750608e0968ed47f844f3a378aab089e758d59149e33b861208eba2d374a3df544c376b8131e675c98f2d4237e2cba50a7c767a6892d131b'); // secp256k1
// call('0xB6b29Ef90120BEC597939e0Eda6b8a9164F75deb', 'keccak256Test', '0x1');

// call('0x4782545970DEcA2AdaBF0680d871BE6B7a228E02', 'keccak256Test', '0x1'); // 测试国密sm3下的keccak256算法
// console.log('sintan1071 dev --- web3 utils sha3', web3.utils.sha3('0x1'))
// console.log('sintan1071 dev --- web3 utils keccak256', web3.utils.keccak256('0x1'))

// web3.eth.personal.sign('0x1147174232333666114717423233366611471742323336661147174232333666', _from, _pass).then(sig=>{console.log('sintan1071 dev --- web3 sign: ', sig)})
// web3.eth.personal.ecRecover('0x1147174232333666114717423233366611471742323336661147174232333666', '0x8b9012ff364438c8fc750608e0968ed47f844f3a378aab089e758d59149e33b861208eba2d374a3df544c376b8131e675c98f2d4237e2cba50a7c767a6892d131b').then(addr=>{console.log('sintan1071 dev --- web3 ecrecover: ', addr)}) // secp256k1
// web3.eth.personal.ecRecover('0x1147174232333666114717423233366611471742323336661147174232333666', '0x960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76').then(addr=>{console.log('sintan1071 dev --- web3 ecrecover: ', addr)}) // sm2p256v1

// 使用明文测试ecrecover
// web3.eth.personal.sign('你好 sintan1071 ！', _from, _pass).then(sig=>{console.log('sintan1071 dev --- web3 sign: ', sig)})
// call('0xB6b29Ef90120BEC597939e0Eda6b8a9164F75deb', 'recoverSignerTest', web3.utils.keccak256("\x19Ethereum Signed Message:\n"+web3.utils.hexToBytes(web3.utils.utf8ToHex('你好 sintan1071 ！')).length+'你好 sintan1071 ！'), '0x607659d3f8b2ec9ee6e763fef0ecbb5f44bf9ebdfccfc7ea59538ee383c91cbc155652b27eb9032433d2d4b9ab40bbabd056b77624654871ec57d06fb1327cf81c'); // secp256k1

// 这是SMecrecover测试
// deploy();
// call('0x5020fbc2D1B1f6f843676060dEe645e81dA72C48', 'View_splitSignature_SM', '0x960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76'); // sm2p256v1
// call('0x1271c8f6a4Ec234Efb387AEE454e2509A65A7Dd0', 'recoverSignerTest_SM',
// web3.utils.keccak256("\x19Ethereum Signed Message:\n"+web3.utils.hexToBytes('0x1147174232333666114717423233366611471742323336661147174232333666').length+web3.utils.hexToUtf8('0x1147174232333666114717423233366611471742323336661147174232333666')),
// '0x960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76'); // sm2p256v1

// 这是OnlySMecrecover测试
// deploy();
// let r = '0x' + '960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76'.substr(0, 64)
// let s = '0x' + '960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76'.substr(64, 64)
// let v = '0x' + '960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76'.substr(128, 66)
// call('0xb3B10FD5E0222987eD309901F65974251B1016C3', 'Test', v, r, s, web3.utils.keccak256("\x19Ethereum Signed Message:\n"+web3.utils.hexToBytes('0x1147174232333666114717423233366611471742323336661147174232333666').length+web3.utils.hexToUtf8('0x1147174232333666114717423233366611471742323336661147174232333666'))); // sm2p256v1
/*secp256k1*/
// call('0xB6b29Ef90120BEC597939e0Eda6b8a9164F75deb', 'Test',
// '0x8b9012ff364438c8fc750608e0968ed47f844f3a378aab089e758d59149e33b861208eba2d374a3df544c376b8131e675c98f2d4237e2cba50a7c767a6892d131b',
// web3.utils.keccak256("\x19Ethereum Signed Message:\n"+web3.utils.hexToBytes('0x1147174232333666114717423233366611471742323336661147174232333666').length+web3.utils.hexToUtf8('0x1147174232333666114717423233366611471742323336661147174232333666'))); // sm2p256v1
/*sm2p256v1*/
// call('0x4782545970DEcA2AdaBF0680d871BE6B7a228E02', 'Test',
// '0x960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76',
// web3.utils.keccak256("\x19Ethereum Signed Message:\n"+web3.utils.hexToBytes('0x1147174232333666114717423233366611471742323336661147174232333666').length+web3.utils.hexToUtf8('0x1147174232333666114717423233366611471742323336661147174232333666'))); // sm2p256v1

// 性能测试
Benchmark()
})

function formatSeconds (value) {
    let sec = Math.floor(value / 1000)
    let msec = value % 1000
    return sec + 's' + msec + 'ms'
}
