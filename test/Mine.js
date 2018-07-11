import assert from "assert";
import {Apis, Manager} from "../lib";

var coreAsset;
var default_api = "ws://39.106.32.161:8090";
// var default_api = "wss://bit.btsabc.org/ws";
var api_list = [
    // "ws://127.0.0.1:9999"
    // "wss://bitshares.dacplay.org/ws",
    "ws://39.106.32.161:8090",
    // "wss://bit.btsabc.org/ws"
]
describe("Connection reset", () => {
    afterEach(function() {
        return new Promise(function(res) {
            Apis.close().then(res);
        })
    });

    // it("common connect", function() {

    //     let man = new Manager({
    //             url: default_api, 
    //             urls: api_list
    //         });

    //     return new Promise( function(resolve, reject) {
    //         man.connect().then(res => {
    //             console.log(res);
    //         })
    //         // Apis.instance(default_api, true, undefined, {}, null).init_promise.then(function (result) {
    //         //     coreAsset = result[0].network.core_asset;
    //         //     Apis.instance().db_api().exec('lookup_accounts', [null, 100]).then(res => {
    //         //         console.log(res);
    //         //         resolve();
    //         //     });
    //         // });

    //         // Apis.instance(default_api, true).init_promise.then(function (result) {
    //         //     coreAsset = result[0].network.core_asset;
    //         //     Apis.instance().db_api().exec('lookup_accounts', [null, 100]).then(res => {
    //         //         console.log(res);
    //         //         resolve();
    //         //     });
    //         // });
    //     });
    // });

    // it("测试连接速度", function(){
    //     return new Promise((resolve, reject) => {

    //         let man = new Manager({
    //             url: default_api, 
    //             urls: api_list
    //         });

    //         man.checkConnections().then(latencies => {
    //             console.log('latencies ',latencies);
    //             resolve();
    //         }).catch(err => {
    //             console.log('测速失败');
    //         });

            
    //     })
    // })

    it("测试连接有效性", function(){
        return new Promise((resolve, reject) => {
            let urlChangeCallback = function(url){
                console.log('change url ', url);
            }

            let closeCb = function(){
                console.log('close cb');
            }

            let man = new Manager({
                url: default_api, 
                urls: api_list,
                closeCb,
                urlChangeCallback,
                optionalApis: { enableOrders: true }
            });

            man.connectWithFallback().then(res => {
                console.log('连接成功 ');
                resolve();
            }).catch(err => {
                reject(err);
            });
        })
    })
});
