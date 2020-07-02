const Web3 = require('web3');
// const contractJson = require('./setget.json');
// const contractJson = require('./ecrecover.json');
// const contractJson = require('./SMecrecover.json');
// const contractJson = require('./onlySMecrecover.json');
// const contractJson = require('./bsm.json');
// const contractJson = require('./f_add_bytes32.json');
// const contractJson = require('./f_mul.json');
// const contractJson = require('./f_add_strimgM.json');
// const contractJson = require('./float.json');
// const contractJson = require('./time.json');
const plContractJson = require('./ProjectList.json');
const abfContractJson = require('./AssetBookerFactory.json');
const abContractJson = require('./AssetBooker.json');

const ccContractJson = require('./ContractsCalls/main.json');
const aContractJson = require('./ContractsCalls/a.json');
const bContractJson = require('./ContractsCalls/b.json');

const web3 = new Web3('http://localhost:1723');
// const _from = '0x7eff122b94897ea5b0e2a9abf47b86337fafebdc'; // secp256k1
// const _pass = "1234";
// const _from = '6EB0CD3B7046B6712E55309FA1D0A5B5A9883687'; // sm2p256v1
// const _pass = "12345";
const _from = '0x5bE6Bbe4428B6fE3d2F2c0f3984BC41Ad94f4E8d';
const _pass = '';
const _to = '';
const _gas = 999999999999999;
const _gasPrice = 20000000000;

async function unlock() {
    await web3.eth.personal.unlockAccount(_from, _pass, 999999999)
}

async function deploy(contractJson) {
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

async function call(contractAddr, contractJson, methodName, ...params) {
    var contractInst = new web3.eth.Contract(contractJson.abi, contractAddr);
    var contractInstMethod = !!params?contractInst.methods[methodName](...params):contractInst.methods[methodName]();
    var result = await contractInstMethod.call({
        from: _from,
        gas: _gas,
        gasPrice: _gasPrice
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

async function send(contractAddr, contractJson, methodName, ...params) {
    var contractInst = new web3.eth.Contract(contractJson.abi, contractAddr);
    var contractInstMethod = !!params?contractInst.methods[methodName](...params):contractInst.methods[methodName]();
    var receipt = await contractInstMethod.send({
        from: _from,
        gas: _gas,
        gasPrice: _gasPrice
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

unlock().then(()=> {
/******************************************↓↓↓测试区域↓↓↓*****************************************************/
// 这是setget测试
// deploy();
// send('0x9Ac6dBfCFbeC90C44c0634b4E5dcE20b5C62D57f', 'set', '666');
// call('0x9Ac6dBfCFbeC90C44c0634b4E5dcE20b5C62D57f', 'get');

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
// Benchmark()

// 测试bsm合约 涨：call => 1, 跌：put => 2 
// deploy()
// call('0x75bcEFB2D6E4e5F864eF1220e7679612C5E9D9aC', 'bs', '2020-05-22', '2020-05-22', '2020-07-21', '1000.00', '1000.00', '0.04000', '0.30000', 1)
// call('0x75bcEFB2D6E4e5F864eF1220e7679612C5E9D9aC', 'bs', '2020-05-22', '2020-05-22', '2020-06-21', '1.00', '1.00', '0.02000', '0.20000', 2)
// call('0x75bcEFB2D6E4e5F864eF1220e7679612C5E9D9aC', 'bs', '2020-05-22', '2020-05-22', '2020-06-21', '1.00', '1.00', '0.02000', '0.20000', 1)
// call('0x75bcEFB2D6E4e5F864eF1220e7679612C5E9D9aC', 'bs', '2020-05-22', '2020-05-22', '2020-07-21', '1.00', '1.00', '0.02000', '0.20000', 1)
// call('0xBEd272E0eee0F8DA9397A71237e5535F24FB4F87', 'Test', '123.45', '6.789') // 返回bytes32
// call('0xA6751036a19Cb5d3D1F91b9acfD2cCC2F003466F', 'Test', '123.45', '6.789') // 返回string memory
// call('0x2cE224CaD729c63C5cDF9CE8F2E8B5B8f81eC7B4', 'Test', '123.45', '6.789', '1.23456') // 返回bytes32 多参数计算
// console.log('res --- ', web3.utils.hexToAscii('0x312e30303030303030303030303030303032452b363400000000000000000000'))
// console.log('1.0000000000000002E+64'.length)

// 测试float预编译合约
// deploy()
// call('0xdf96F6A967B31B8755631C459e6c5393Af4068e8', 'Test', '99999999999999999999999999999999', '99999999999999999999999999999999') // 国密乘法
// call('0x53B5EeA006A9BAF9741094FB8C31B29A3fC6A865', 'Test', '99999999999999999999999999999999', '99999999999999999999999999999999') // 国密加法
// call('0x95F8e668E6a6067F5CB8B873AC43CC95Dbe4486f', 'Test1', '123.45', '6.789') // false
// call('0x95F8e668E6a6067F5CB8B873AC43CC95Dbe4486f', 'Test2', '123.45', '6.789') // true
// call('0x95F8e668E6a6067F5CB8B873AC43CC95Dbe4486f', 'Test2', '12.345', '67.89') // false
// call('0x95F8e668E6a6067F5CB8B873AC43CC95Dbe4486f', 'Test3', '123.45', '6.789') // false
// call('0x95F8e668E6a6067F5CB8B873AC43CC95Dbe4486f', 'Test3', '12.345', '67.89') // true

// 测试time预编译合约
// deploy()
// call('0x2479fE5Dc873a07F42caCF214802f704d30C3259', 'Test1', '2020-05-01', '2020-05-02') // true
// call('0x2479fE5Dc873a07F42caCF214802f704d30C3259', 'Test2', '2020-05-01', '2020-05-02') // false
// call('0x2479fE5Dc873a07F42caCF214802f704d30C3259', 'Test3', '2020-05-03', '2020-05-01') // 1
// console.log('res --- ', web3.utils.hexToAscii('0x3200000000000000000000000000000000000000000000000000000000000000'))

// 测试大型oz项目的TreeBox
// TreeBoxTest()

// 测试大型oz项目的TreeBox
ContractsCallsTest()
/******************************************↑↑↑测试区域↑↑↑*****************************************************/
})

/*******************************************
 * 测试方法
 * *****************************************
 */
async function Benchmark() {
    let loop = 10
    /*secp256k1*/ //19s260ms 27ms
    let startTime = new Date();
    for (let i = 0; i < loop; i++) {
        await web3.eth.personal.sign('你好 sintan1071 ！' + i, _from, _pass).then(sig=>{console.log('/*secp256k1*/ sign: ', sig)})
        // await web3.eth.personal.ecRecover('0x1147174232333666114717423233366611471742323336661147174232333666', '0x8b9012ff364438c8fc750608e0968ed47f844f3a378aab089e758d59149e33b861208eba2d374a3df544c376b8131e675c98f2d4237e2cba50a7c767a6892d131b').then(addr=>{console.log('/*secp256k1*/ ecrecover: ', addr)}) // secp256k1
    }
    let stopTime = new Date();
    console.log('/*secp256k1*/签名'+ loop +'次时间: ', formatSeconds(stopTime - startTime))
    /*sm2p256v1*/ //1s836ms 17ms
    // let startTime = new Date();
    // for (let i = 0; i < loop; i++) {
    //     // await web3.eth.personal.sign('你好 sintan1071 ！' + i, _from, _pass).then(sig=>{console.log('/*sm2p256v1*/ sign: ', sig)})
    //     await web3.eth.personal.ecRecover('0x1147174232333666114717423233366611471742323336661147174232333666', '0x960f20a9b6c98a9dee9092cffe942b6cb917dcb6707b3109603f247c5cf8716218ee59bc97e8029f321a5f3210fd1993b4ba9c22e6d706eb105e212c476505441bee4d1aa9d7279b5bf86c9ce829360bf9f13ed4140f7a3969f382e4ed339e9f76').then(addr=>{console.log('/*sm2p256v1*/ ecrecover: ', addr)}) // sm2p256v1
    // }
    // let stopTime = new Date();
    // console.log('/*sm2p256v1*/'+ loop +'次时间: ', formatSeconds(stopTime - startTime))
}

async function TreeBoxTest() {
    // 先部署projectList
    let plAddr = await deploy(plContractJson);
    console.log('pl addr --- ', plAddr);
    await send(plAddr, plContractJson, 'initialize');
    // 部署AssetBookerFactory
    let abfAddr = await deploy(abfContractJson);
    console.log('abf addr --- ', abfAddr);
    await send(abfAddr, abfContractJson, 'initialize', web3.utils.utf8ToHex('1'), plAddr);
    // 在projectList里面注册项目的工厂合约，即AssetBookerFactory
    // await send(plAddr, plContractJson, 'registProject', web3.utils.utf8ToHex('1'), 'AssetBookerFactory', abfAddr, JSON.stringify(abfContractJson));
    await send(plAddr, plContractJson, 'registProject', web3.utils.utf8ToHex('1'), 'AssetBookerFactory', abfAddr);
    // 调用生成AssetBooker
    let abRes = await send(abfAddr, abfContractJson, 'create', '0x148D910aB6e59998553F3298f0c442e1d7632118');
    let abAddr = abRes.events.ContractInstantiation.returnValues.instantiation;
    console.log('ab addr --- ', abAddr);

    //!!! 查看两个合约的owner都是谁
    let o1 = await call(abfAddr, abfContractJson, 'owner'); // 应该是调用的账户
    let o2 = await call(abAddr, abContractJson, 'owner'); // 应该是工厂合约
    console.log('owners --- ', o1, o2);

    //!!! 查看projectList合约的信息是否通过合约之间的调用成功更新
    let r1 = await call(plAddr, plContractJson, 'getProjectInterfaceByID', web3.utils.utf8ToHex('1'));
    let r2 = await call(plAddr, plContractJson, 'getProjectInfoByID', web3.utils.utf8ToHex('1'));
    console.log('results --- ', r1, r2);
}

async function ContractsCallsTest() {
    let aAddr = await deploy(aContractJson);
    let bAddr = await deploy(bContractJson);
    // console.log('a b Addr --- ', aAddr, bAddr);

    let ccAddr = await deploy(ccContractJson);
    // console.log('cc Addr --- ', ccAddr);
    // // 测试部署打断是否是原子性的
    // await send(ccAddr, ccContractJson, 'deploy');
    // await call(ccAddr, ccContractJson, 'Aaddr');
    // 测试sendtx打断是否是原子性的
    await send(ccAddr, ccContractJson, 'set', aAddr, '23333', bAddr, 666);
    await call(aAddr, aContractJson, 'get');   
    await call(bAddr, bContractJson, 'get');   
}

/*******************************************
 * 工具方法
 *******************************************
 */
function formatSeconds (value) {
    let sec = Math.floor(value / 1000)
    let msec = value % 1000
    return sec + 's' + msec + 'ms'
}
