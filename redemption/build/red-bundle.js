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
Object.defineProperty(exports, "__esModule", { value: true });
const snackbar_1 = require("./snackbar");
const pools = document.querySelectorAll('.pool');
const sol_pool = document.querySelector('.sol-pool');
const usdc_pool = document.querySelector('.usdc-pool');
const bonk_pool = document.querySelector('.bonk-pool');
const green_dot = document.querySelector('.green-dot');
const red_dot = document.querySelector('.red-dot');
const pool_buttons = document.querySelectorAll('.pool-button');
const button1 = document.querySelector('.button1');
//sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//status indicator dot blinking
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
//adding event listeners for inactive pool_buttons
const blocked_click = () => {
    (0, snackbar_1.showAlert)('Wallet not connected', false, button1);
};
console.log(pool_buttons);
for (var i = 0; i < pool_buttons.length; i++) {
    const pool_button = pool_buttons[i];
    pool_button.addEventListener('click', blocked_click);
}

},{"./snackbar":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAlert = exports.Snackbar = void 0;
class Snackbar {
    constructor() {
        this.active = null;
        this.progress = -1;
        this.queue = [];
        this.timer = -1;
        // Durations (ms).
        // Should equal the CSS opacity transition.
        this.cssAnimationDelay = 500;
        // Should be 100x the CSS progress transition.
        this.visibilityDuration = 3000;
        // Create the DOM container.
        // This could be moved to a private function.
        const unid = "snackbar" + +new Date();
        const domElement = document.createElement('div');
        domElement.className = "snackbar";
        domElement.id = unid;
        document.body.appendChild(domElement);
        this.domElement = document.getElementById(unid);
        // This is the snackbar DOM element.
        this.snackElement = null;
        // This is the progress bar DOM element.
        this.progressElement = null;
        // Function bindings.
        this.hide = this.hide.bind(this);
    }
    hide(msg, is_good) {
        this.active = null;
        window.clearInterval(this.timer);
        // I'm making a bad assumption that this.snackElement
        // will always exist at this point.
        try {
            this.snackElement.classList.remove('active');
        }
        catch (e) {
            console.log(e);
        }
        // This timer ensures no snacks appear simultaneously
        // whilst allowing the element to transition (CSS).
        window.setTimeout(() => {
            // Remove the snack element completely.
            try {
                this.domElement.removeChild(this.snackElement);
            }
            catch (e) {
                console.log(e);
            }
            // Reset the progress.
            this.progress = -1;
            // If the queue isn't empty, show the next snack.
            if (this.queue.length)
                this.show(this.queue[0], true, msg, is_good);
        }, 500);
    }
    show(config, important, msg, is_good) {
        if (!config)
            return false;
        // Assign the config a UNID.
        if (!config._sbid)
            config._sbid = +new Date(); // Bad.
        const queuePopulated = this.queue.length;
        // If it's unimportant, add it to the queue.
        if (this.active && !important)
            return this.queue.push(config);
        // Otherwise, show it immediately.
        // If it's from the queue, remove it.
        if (queuePopulated && config._sbid === this.queue[0]._sbid)
            this.queue.shift();
        // If one is already active, place it back at the
        // start of the queue, ready to be displayed next.
        if (this.active) {
            this.queue.unshift(this.active);
            // Place this one at the front of the queue.
            this.queue.unshift(config);
            // Hide the current one.
            // This function will then grab the next one from
            // the queue, so we return.
            return this.hide(msg, is_good);
        }
        // Make it active.
        this.active = config;
        // Create the snack element. This would be a
        // private method in an actual implementation.
        const snackElement = document.createElement('div');
        snackElement.className = "snack";
        const snackMessage = document.createElement('span');
        snackMessage.innerText = msg;
        snackElement.appendChild(snackMessage);
        // Add the ✘ if it's dismissible.
        if (config.dismissible) {
            const dismissControl = document.createElement('button');
            dismissControl.type = 'button';
            dismissControl.innerText = '✘';
            dismissControl.onclick = this.hide;
            snackElement.appendChild(dismissControl);
            snackElement.classList.add('dismissible');
            if (is_good != true) {
                dismissControl.style.background = 'red';
            }
            else {
                dismissControl.style.background = 'rgb(2, 197, 197)';
            }
        }
        // Add in the progress bar.
        const progressBar = document.createElement('div');
        progressBar.className = 'progress';
        if (is_good != true) {
            progressBar.style.background = 'red';
        }
        else {
            progressBar.style.background = 'rgb(2, 197, 197)';
        }
        snackElement.appendChild(progressBar);
        this.progressElement = progressBar;
        this.snackElement = snackElement;
        this.domElement.appendChild(snackElement);
        // Start the progress counter.
        this.timer = window.setInterval(() => {
            this.progress++;
            // If it's the first iteration, add the active
            // class to the element. Shh, this is a hack.
            if (this.progress === 0)
                this.snackElement.classList.add('active');
            // Increment the progress bar.
            const snackWidth = this.snackElement.clientWidth;
            this.progressElement.style.width = (this.progress / 100) * snackWidth + 'px';
            // If the progress is at 100, it's time to go.
            if (this.progress === 100)
                this.hide(msg, is_good);
        }, Math.round(this.visibilityDuration / 100));
    }
}
exports.Snackbar = Snackbar;
function showAlert(msg, is_good, ele) {
    const prevs = document.getElementsByClassName('snackbar');
    for (var i = 0; i < prevs.length; i++) {
        const element = prevs[i];
        element.classList.add('hide');
    }
    const alert = new Snackbar();
    alert.show(ele.dataset, false, msg, is_good);
}
exports.showAlert = showAlert;

},{}]},{},[1]);

},{"./snackbar":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAlert = exports.Snackbar = void 0;
class Snackbar {
    constructor() {
        this.active = null;
        this.progress = -1;
        this.queue = [];
        this.timer = -1;
        // Durations (ms).
        // Should equal the CSS opacity transition.
        this.cssAnimationDelay = 500;
        // Should be 100x the CSS progress transition.
        this.visibilityDuration = 3000;
        // Create the DOM container.
        // This could be moved to a private function.
        const unid = "snackbar" + +new Date();
        const domElement = document.createElement('div');
        domElement.className = "snackbar";
        domElement.id = unid;
        document.body.appendChild(domElement);
        this.domElement = document.getElementById(unid);
        // This is the snackbar DOM element.
        this.snackElement = null;
        // This is the progress bar DOM element.
        this.progressElement = null;
        // Function bindings.
        this.hide = this.hide.bind(this);
    }
    hide(msg, is_good) {
        this.active = null;
        window.clearInterval(this.timer);
        // I'm making a bad assumption that this.snackElement
        // will always exist at this point.
        try {
            this.snackElement.classList.remove('active');
        }
        catch (e) {
            console.log(e);
        }
        // This timer ensures no snacks appear simultaneously
        // whilst allowing the element to transition (CSS).
        window.setTimeout(() => {
            // Remove the snack element completely.
            try {
                this.domElement.removeChild(this.snackElement);
            }
            catch (e) {
                console.log(e);
            }
            // Reset the progress.
            this.progress = -1;
            // If the queue isn't empty, show the next snack.
            if (this.queue.length)
                this.show(this.queue[0], true, msg, is_good);
        }, 500);
    }
    show(config, important, msg, is_good) {
        if (!config)
            return false;
        // Assign the config a UNID.
        if (!config._sbid)
            config._sbid = +new Date(); // Bad.
        const queuePopulated = this.queue.length;
        // If it's unimportant, add it to the queue.
        if (this.active && !important)
            return this.queue.push(config);
        // Otherwise, show it immediately.
        // If it's from the queue, remove it.
        if (queuePopulated && config._sbid === this.queue[0]._sbid)
            this.queue.shift();
        // If one is already active, place it back at the
        // start of the queue, ready to be displayed next.
        if (this.active) {
            this.queue.unshift(this.active);
            // Place this one at the front of the queue.
            this.queue.unshift(config);
            // Hide the current one.
            // This function will then grab the next one from
            // the queue, so we return.
            return this.hide(msg, is_good);
        }
        // Make it active.
        this.active = config;
        // Create the snack element. This would be a
        // private method in an actual implementation.
        const snackElement = document.createElement('div');
        snackElement.className = "snack";
        const snackMessage = document.createElement('span');
        snackMessage.innerText = msg;
        snackElement.appendChild(snackMessage);
        // Add the ✘ if it's dismissible.
        if (config.dismissible) {
            const dismissControl = document.createElement('button');
            dismissControl.type = 'button';
            dismissControl.innerText = '✘';
            dismissControl.onclick = this.hide;
            snackElement.appendChild(dismissControl);
            snackElement.classList.add('dismissible');
            if (is_good != true) {
                dismissControl.style.background = 'red';
            }
            else {
                dismissControl.style.background = 'rgb(2, 197, 197)';
            }
        }
        // Add in the progress bar.
        const progressBar = document.createElement('div');
        progressBar.className = 'progress';
        if (is_good != true) {
            progressBar.style.background = 'red';
        }
        else {
            progressBar.style.background = 'rgb(2, 197, 197)';
        }
        snackElement.appendChild(progressBar);
        this.progressElement = progressBar;
        this.snackElement = snackElement;
        this.domElement.appendChild(snackElement);
        // Start the progress counter.
        this.timer = window.setInterval(() => {
            this.progress++;
            // If it's the first iteration, add the active
            // class to the element. Shh, this is a hack.
            if (this.progress === 0)
                this.snackElement.classList.add('active');
            // Increment the progress bar.
            const snackWidth = this.snackElement.clientWidth;
            this.progressElement.style.width = (this.progress / 100) * snackWidth + 'px';
            // If the progress is at 100, it's time to go.
            if (this.progress === 100)
                this.hide(msg, is_good);
        }, Math.round(this.visibilityDuration / 100));
    }
}
exports.Snackbar = Snackbar;
function showAlert(msg, is_good, ele) {
    const prevs = document.getElementsByClassName('snackbar');
    for (var i = 0; i < prevs.length; i++) {
        const element = prevs[i];
        element.classList.add('hide');
    }
    const alert = new Snackbar();
    alert.show(ele.dataset, false, msg, is_good);
}
exports.showAlert = showAlert;

},{}]},{},[1]);
