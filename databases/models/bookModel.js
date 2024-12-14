"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var model = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        publishedDate: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => !isNaN(Date.parse(value)),
                message: 'Invalid date format',
            },
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value > 0,
                message: 'Price must be a positive number',
            },
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true });
module.exports = mongoose.model("book", model);