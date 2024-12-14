"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var model = new Schema(
    {
        email: {
            type: String,
            required: "email is required",
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            default: 'user',
            // 1 = user, 2 = admin
        },
    },
    { timestamps: true });
model.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("user", model);