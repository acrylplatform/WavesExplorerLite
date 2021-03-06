(function () {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'http://18.203.15.139:6869',
        dataServiceBaseUrl: 'https://api.wavesplatform.com/v0',
        title: 'Waves Devnet Explorer',
        blockchainName: 'Devnet',
        nodes: [
            {url: 'http://18.203.15.139:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://34.237.49.199:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://35.157.212.173:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://52.28.115.7:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://13.228.127.88:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://52.192.190.54:6869', maintainer: 'Waves', showAsLink: true}
        ],
        peerExplorer: {
            url: 'http://devnet.wavesexplorer.com',
            title: 'Devnet Explorer'
        },
        wallet: {
            url: 'https://testnet.wavesplatform.com',
            title: 'Wallet'
        }
    });


    angular.module('web').constant('constants.network', {
        NETWORK_NAME: 'devnet', // 'devnet', 'testnet', 'mainnet'
        ADDRESS_VERSION: 1,
        NETWORK_CODE: 'D',
        INITIAL_NONCE: 0
    });
})();
