'use strict';

module.exports = Object.freeze({
    mongo_config: {
        connect_string: 'mongodb://localhost:27017/employee_management',
        db_mg_user: '',
        db_mg_pass: '',
        prefix: 'tbv_',
        poolSize: 10,
        keepAlive: 1,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    },
    prefix_module: {
        admin: 'api/'
    },
    accessTokenSecret: 'tY=Te#4Gvw@n&_Z6=N?UMBXd#V?6@xqf',
    accessTokenLife: '1h',
    refreshTokenSecret: 'tY=Te#4Gvw@n&_Z6=N?UMBXd#V?6@AAA',
    refreshTokenLife: '356d'
});
