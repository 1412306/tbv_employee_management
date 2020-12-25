let chalk = require('chalk');
const mongoose = require('mongoose');
(function () {
    if (global.db_mg) {
        return global.db_pg;
    } else {
        //mongo config connection
        let mongoDB = global.config.mongo_config.connect_string ? global.config.mongo_config.connect_string : global.config.db_mg_connect_string;

        mongoose.connect(mongoDB, {
            poolSize: global.config.mongo_config.poolSize,
            keepAlive: global.config.mongo_config.keepAlive,
            //autoReconnect: global.config.mongo_config.autoReconnect,
            user: global.config.mongo_config.db_mg_user,
            pass: global.config.mongo_config.db_mg_pass,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function () {
            mongoose.set('debug', false);
        });

        mongoose.Promise = global.Promise;
        mongoose.set('useCreateIndex', true);
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.on('open', () => {
            console.log(chalk.blue('Connect Mongo success'));
            global.db_mg = db;
            return global.db_pg;
        })
    }
})();
