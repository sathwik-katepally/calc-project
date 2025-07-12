"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = hello;
const world = "world";
function hello(word = world) {
    return `Hello ${word}!`;
}
