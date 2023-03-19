(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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
const phantom = document.getElementById('Phantom');
const solflare = document.getElementById('Solflare');
const brave = document.getElementById('Brave');
const slope = document.getElementById('Slope');
const return_button = document.querySelector('#quit');
const modal = document.querySelector('.modal1');
//global state and control variables
var wallet_type = '';
var owner = '';
//checking if requested type is installed or not
function check_wallet() {
    //phantom check
    if (wallet_type === 'phantom') {
        if (!window.solana || !window.solana.isPhantom) {
            (0, snackbar_1.showAlert)('Phantom Wallet is not installed!', false, button1);
            return false;
        }
        else {
            return true;
        }
    }
    //solflare check
    if (wallet_type === 'solflare') {
        if (!window.solflare || !window.solflare.isSolflare) {
            (0, snackbar_1.showAlert)('Solflare Wallet is not installed!', false, button1);
            return false;
        }
        else {
            return true;
        }
    }
    //brave wallet check
    if (wallet_type === 'brave') {
        if (!window.braveSolana || !window.braveSolana.isBraveWallet) {
            (0, snackbar_1.showAlert)('Brave Wallet is not installed!', false, button1);
            return false;
        }
        else {
            return true;
        }
    }
    //slope wallet check
    if (wallet_type === 'slope') {
        if (!window.slope) {
            (0, snackbar_1.showAlert)('Slope Wallet is not installed!', false, button1);
            return false;
        }
        else {
            return true;
        }
    }
}
//connecting to the wallet after checking it's installation
function connect_wallet() {
    return __awaiter(this, void 0, void 0, function* () {
        if (wallet_type === 'phantom') {
            try {
                yield window.solana.connect().then((obje) => {
                    owner = window.solana.publicKey.toString();
                    (0, snackbar_1.showAlert)('Phantom Wallet successfully connected!', true, button1);
                });
                return true;
            }
            catch (e) {
                console.log(e);
                (0, snackbar_1.showAlert)('Failed to connect to Phantom Wallet!', false, button1);
                return false;
            }
        }
        if (wallet_type === 'brave') {
            try {
                yield window.solana.connect().then((obje) => {
                    owner = window.solana.publicKey.toString();
                    (0, snackbar_1.showAlert)('Brave Wallet successfully connected!', true, button1);
                });
                return true;
            }
            catch (e) {
                console.log(e);
                (0, snackbar_1.showAlert)('Failed to connect to Brave Wallet!', false, button1);
                return false;
            }
        }
        if (wallet_type === 'solflare') {
            try {
                yield window.solflare.connect().then((obje) => {
                    owner = window.solflare.publicKey.toString();
                    (0, snackbar_1.showAlert)('Solflare Wallet successfully connected!', true, button1);
                });
                return true;
            }
            catch (e) {
                console.log(e);
                (0, snackbar_1.showAlert)('Failed to connect to Solflare Wallet!', false, button1);
                return false;
            }
        }
        if (wallet_type === 'slope') {
            try {
                const slope_obj = new window.Slope();
                yield slope_obj.connect().then((obje) => {
                    (0, snackbar_1.showAlert)('Slope Wallet successfully connected!', true, button1);
                });
                return true;
            }
            catch (e) {
                console.log(e);
                (0, snackbar_1.showAlert)('Failed to connect to Slope Wallet!', false, button1);
                return false;
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //checking selected wallet
        const is_installed = check_wallet();
        if (!is_installed) {
            //return early from the function
            return;
        }
        //else we connect to the selected wallet
        const connected = yield connect_wallet();
        if (!connected) {
            //return early from the function
            return;
        }
        else {
            console.log(owner);
        }
    });
}
const button1 = document.querySelector('.button1');
button1.addEventListener('click', () => {
    (0, snackbar_1.showAlert)('this is a good message', true, button1);
});
const button2 = document.querySelector('.button2');
button2.addEventListener('click', () => {
    (0, snackbar_1.showAlert)('this is a good message', false, button2);
});
//adding event listeners to all wallet buttons
phantom.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    wallet_type = 'phantom';
    yield main();
}));
solflare.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    wallet_type = 'solflare';
    yield main();
}));
brave.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    wallet_type = 'brave';
    yield main();
}));
slope.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    wallet_type = 'slope';
    yield main();
}));
//return button for connect wallet modal
return_button.addEventListener('click', function (e) {
    modal.style.display = 'none';
});

},{"./snackbar":1}]},{},[2]);
