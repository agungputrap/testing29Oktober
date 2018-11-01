const path = require('path');

module.exports = class Injector {
    constructor(config) {
        this.config = config;
        this.objectRequire = {};
        this.components = {};
    }
    resolve(component) {
        let dependencies = this.config.components[component].dependencies;
        let args = [];
        for(let index = 0; index < dependencies.length;index++) {
            if(this.components[dependencies[index]]) {
                args.push(this.components[dependencies[index]]);
            }
        }
        return Reflect.construct(this.objectRequire[component], args);
    }

    start() {
        let configComponents = this.config.components;
        let objectRequire = this.objectRequire;
        let listComponents = [];
        Object.keys(configComponents).forEach(function (e) {
            let file = configComponents[e].file;
            objectRequire[e] = require("./" + path.dirname(file) + "/" + path.basename(file, '.js'));
            listComponents.push(e);
        });

        this.objectRequire = objectRequire;
        for(let index = 0; index < listComponents.length;index++) {
            if(!this.components[listComponents[index]]) {
                this.components[listComponents[index]] = this.resolve(listComponents[index]);
            }
        }
        let main = this.config.main;
        let server = this.components[main.component];
        server[main.method].apply(server, main.args);
    }
};