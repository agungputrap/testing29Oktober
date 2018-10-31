let Injector = require('./injector_generic');
let config = require('./configuration_generic.json');
let injector = new Injector(config);
injector.start();