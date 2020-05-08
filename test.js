const Web3 = require('web3');
// const contractJson = require('./setget.json');
const contractJson = require('./ecrecover.json');

const web3 = new Web3('http://localhost:8545');
const _from = '0x7eff122b94897ea5b0e2a9abf47b86337fafebdc'; // secp256k1
const _pass = "1234";
// const _from = '0x1309a99c2fef7eca44f48009935dfda559771694'; // sm2p256v1
// const _pass = "12345";
const _to = '';
const _gas = 1500000;
const _gasPrice = '30000000000000';

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

// 这是setget测试
// deploy();
// send('0x2832dD7f707Cddc71A7C2F3a4D3FF39135db0567', 'set', '阿萨德法师打发23333 sintan1071 666');
// call('0x2832dD7f707Cddc71A7C2F3a4D3FF39135db0567', 'get');

// 这是ecrecover测试
// deploy();
// call('0xB6b29Ef90120BEC597939e0Eda6b8a9164F75deb', 'recoverSignerTest', web3.utils.keccak256("\x19Ethereum Signed Message:\n"+web3.utils.hexToBytes('0x1147174232333666114717423233366611471742323336661147174232333666').length+web3.utils.hexToUtf8('0x1147174232333666114717423233366611471742323336661147174232333666')), '0x8b9012ff364438c8fc750608e0968ed47f844f3a378aab089e758d59149e33b861208eba2d374a3df544c376b8131e675c98f2d4237e2cba50a7c767a6892d131b'); // secp256k1
// call('0x4782545970DEcA2AdaBF0680d871BE6B7a228E02', 'recoverSignerTest', '0x1234', '0x404362e50e182de7d576ecf2c6aa4964df509c05e9fecb259dd980cdeb3e52006860110b58936c4a7b759e2fdf92d3ca566c585939775b62bf7b0e9f4d72b6c61bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76'); // sm2p256v1
// call('0xB6b29Ef90120BEC597939e0Eda6b8a9164F75deb', 'keccak256Test', '0x1'); // secp256k1
// call('0x4782545970DEcA2AdaBF0680d871BE6B7a228E02', 'keccak256Test', '0x1'); // sm2p256v1

// console.log('sintan1071 dev --- web3 utils sha3', web3.utils.sha3('0x1'))
// console.log('sintan1071 dev --- web3 utils keccak256', web3.utils.keccak256('0x1'))

// web3.eth.personal.sign('0x1147174232333666114717423233366611471742323336661147174232333666', _from, _pass).then(sig=>{console.log('sintan1071 dev --- web3 sign: ', sig)})
// web3.eth.personal.ecRecover('0x1147174232333666114717423233366611471742323336661147174232333666', '0x8b9012ff364438c8fc750608e0968ed47f844f3a378aab089e758d59149e33b861208eba2d374a3df544c376b8131e675c98f2d4237e2cba50a7c767a6892d131b').then(addr=>{console.log('sintan1071 dev --- web3 ecrecover: ', addr)})

// 使用明文测试ecrecover
// web3.eth.personal.sign('你好 sintan1071 ！', _from, _pass).then(sig=>{console.log('sintan1071 dev --- web3 sign: ', sig)})
call('0xB6b29Ef90120BEC597939e0Eda6b8a9164F75deb', 'recoverSignerTest', web3.utils.keccak256("\x19Ethereum Signed Message:\n"+web3.utils.hexToBytes(web3.utils.utf8ToHex('你好 sintan1071 ！')).length+'你好 sintan1071 ！'), '0x607659d3f8b2ec9ee6e763fef0ecbb5f44bf9ebdfccfc7ea59538ee383c91cbc155652b27eb9032433d2d4b9ab40bbabd056b77624654871ec57d06fb1327cf81c'); // secp256k1
