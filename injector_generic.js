'use strict';

const path = require('path');

module.exports = class Injector {
    constructor(config) {
        this.config = config;
        this.module = {};
        this.components = {};
    }
    resolve(component) {
        let dependencies = this.config.components[component].dependencies;
        let args = [];
        let option = this.config.components[component].options;
        for(let index = 0; index < dependencies.length;index++) {
            if(this.components[dependencies[index]]) {
                args.push(this.components[dependencies[index]]);
            }
        }
        if(option) {
            return Reflect.construct(this.module[component], [option].concat(args));
        }
        else {
            return Reflect.construct(this.module[component], args);
        }
    }

    start() {
        let configComponents = this.config.components;
        let module = this.module;
        let listComponents = [];
        Object.keys(configComponents).forEach(function (e) {
            let file = configComponents[e].file;
            module[e] = require("./" + path.dirname(file) + "/" + path.basename(file, '.js'));
            listComponents.push(e);
        });

        this.module = module;
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