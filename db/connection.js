"use strict";

const promise = require('bluebird'); // or any other Promise/A+ compatible library;

const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);
const monitor = require('pg-monitor');

monitor.attach(initOptions); // attach to all query events;

monitor.setTheme('matrix'); // change the default theme;

monitor.setLog((msg, info) => {
});
var db;
function getConnection() {
    const cn = {
	  user: "bssuser",
	  password: "bssuser@2019",
	  database: "BSS",
	  port: 5432,
	  host: "132.148.140.42",
	  ssl: false
	};
	db = pgp(cn); 
    return db;
}

function getdb() {
    return db;
}

exports.getdb = getdb;
exports.getConnection = getConnection;