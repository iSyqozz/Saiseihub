(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pools = document.querySelectorAll('.pool');
const sol_pool = document.querySelector('.sol-pool');
const usdc_pool = document.querySelector('.usdc-pool');
const bonk_pool = document.querySelector('.bonk-pool');
const green_dot = document.querySelector('.green-dot');
const red_dot = document.querySelector('.red-dot');
//sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    for (var i = 0; i < 3; i++) {
        yield sleep(300);
        const copy = document.createElement('div');
        copy.style.cssText = green_dot.style.cssText;
        copy.className = green_dot.className;
        copy.classList.add('blink');
        green_dot.appendChild(copy);
        const copy2 = document.createElement('div');
        copy2.style.cssText = red_dot.style.cssText;
        copy2.className = red_dot.className;
        copy2.classList.add('blink');
        red_dot.appendChild(copy2);
    }
    setTimeout(() => {
        const children = green_dot.children;
        for (var j = 0; j < children.length; j++) {
            const child = children[j];
            child.remove();
        }
        const children2 = red_dot.children;
        for (var j = 0; j < children2.length; j++) {
            const child = children2[j];
            child.remove();
        }
    }, 1000);
}), 3000);

},{}]},{},[1]);

},{}]},{},[1]);
