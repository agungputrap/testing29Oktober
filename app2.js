let Injector = require('./injector');
let config = require('./configuration.json');
let injector = new Injector(config);
injector.start();