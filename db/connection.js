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
	  user: "mainxrvagicdjk",
	  password: "be532104f74aeb0bd3c6cc45967dbb9b9758885964c21630637dffc68e3cea53",
	  database: "d563360k197bvb",
	  port: 5432,
	  host: "ec2-54-163-245-44.compute-1.amazonaws.com",
	  ssl: true
	};
	db = pgp(cn); 
    return db;
}

function getdb() {
    return db;
}

exports.getdb = getdb;
exports.getConnection = getConnection;