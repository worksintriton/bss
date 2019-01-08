"use strict";

module.exports = {
    "200": {
        status: "Success",
        code: 200
    },
    "401a": {
        message: "Authentication failed",
        status: "Failure",
        code: 401
    },
    "404": {
        message: "Resource not available",
        status: "Failure",
        code: 404
    },
    "409": {
        message: "Conflict",
        status: "Failure",
        code: 409
    },
    "412": {
        message: "Pre Condition Failed",
        status: "Failure",
        code: 412
    },
    "422": {
        message: "Duplicate entry",
        status: "Failure",
        code: 422
    },
    "500": {
        message: "Internal server error",
        status: "Failure",
        code: 500
    },
    "401": {
        message: "Account already Exists",
        status: "Failure",
        code: 401
    },
    "402": {
        message: "No Data Found",
        status: "Failure",
        code: 402
    },
    "403": {
        message: "Invalid Account",
        status: "Failure",
        code: 403
    }
};