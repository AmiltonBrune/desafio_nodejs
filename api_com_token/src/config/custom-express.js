const express = require('express');
const consign = require('consign');

module.exports = () => {
    var app = express();
    
    consign()
        .include('../app/controller')
        .into(app);

    return app;
}