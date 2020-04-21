"use strict";

const promise = require("bluebird"); // or any other Promise/A+ compatible library;

const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require("pg-promise")(initOptions); // connect db
const monitor = require("pg-monitor");

monitor.attach(initOptions); // attach to all query events;

monitor.setTheme("matrix"); // change the default theme;

monitor.setLog((msg, info) => {});
var db;
function getConnection() {
  const cn = {
    user: "rgrsempisxrbqu",
    password: "c536c891f3beac96c241c0646919a0d4284ec99633f460e104a5b90d043a4bd4",
    database: "dcas8tnojgluv5",
    port: 5432,
    host: "ec2-107-21-233-72.compute-1.amazonaws.com",
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
