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
exports.set_balances = exports.undim = exports.dim = exports.wallet_info_viewed = exports.menu_disappear_id = exports.menu_appear_id = exports.side_menu_appeared = exports.prevScrollPos = exports.scrollTimeout = exports.is_arrow_animating = exports.temp_id = exports.view_button_pop = exports.content_intersected = exports.wallet_info_dropped = exports.me_dropped = exports.owner = exports.wallet_type = exports.wallet_info_balance_token = exports.connect_wallet_button = void 0;
const snackbar_1 = require("./snackbar");
const header = document.querySelector('header');
const nav = document.querySelector('header');
const phantom = document.getElementById('Phantom');
const solflare = document.getElementById('Solflare');
const brave = document.getElementById('Brave');
const slope = document.getElementById('Slope');
const return_button = document.querySelector('#quit');
const modal = document.querySelector('.modal1');
const modal_content = document.querySelector('.modal1-box');
const connect_loading_ind = document.querySelector('.loader--style8');
const loader_text = document.querySelector('.loader-prompt');
const button1 = document.querySelector('.button1');
const ME_button = document.querySelectorAll('.me-button')[0];
const ME_button2 = document.querySelectorAll('.me-button')[1];
const ME_menu = document.querySelector('.dropdown-ME');
//side menu elements
const side_menu_button = document.querySelector('.menu-button');
const side_menu = document.querySelector('.side-menu');
const side_text = document.querySelectorAll('.text-side');
exports.connect_wallet_button = document.querySelector('.connect-wallet');
const disconnect_wallet_button = document.querySelector('.disconnect-wallet');
const view_up_button = document.querySelector('.up-arrow-container');
const arrow_pic = document.querySelector('.up-arrow1');
const clouds = document.querySelectorAll('.clouds');
const wallet_info_box = document.querySelector('.dropdown-wallet-info');
const wallet_info_balance_sol = document.querySelector('.wallet-info-balance-sol');
exports.wallet_info_balance_token = document.querySelector('.wallet-info-balance-token');
const wallet_type_text = document.querySelector('.wallet-type-text');
const wallet_type_img = document.querySelector('.wallet-type-logo');
//global state and control variables
exports.wallet_type = '';
exports.owner = '';
exports.me_dropped = false;
exports.wallet_info_dropped = false;
exports.content_intersected = false;
exports.view_button_pop = false;
exports.temp_id = null;
exports.is_arrow_animating = false;
exports.prevScrollPos = window.scrollY;
exports.side_menu_appeared = false;
exports.wallet_info_viewed = false;
console.log('test');
//sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//getting connected wallet sol and sushi balance
function get_sol_balance() {
    return __awaiter(this, void 0, void 0, function* () {
        var res = 0;
        yield fetch('http://192.168.1.43:3000/get_balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                address: exports.owner,
            })
        })
            .then(response => response.json())
            .then(data => {
            res = data;
            //console.log(data);
        })
            .catch(error => {
            res = 0;
        });
        return res;
    });
}
;
function get_kai_balance() {
    return __awaiter(this, void 0, void 0, function* () {
        var res = 0;
        yield fetch('http://192.168.1.43:3000/get_kai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                address: exports.owner,
            })
        })
            .then(response => response.json())
            .then(data => {
            res = data;
            //console.log(data);
        })
            .catch(error => {
            res = 0;
        });
        return res;
    });
}
;
function dim(content) {
    modal_content.style.display = 'none';
    modal.style.display = 'flex';
    connect_loading_ind.style.display = 'block';
    loader_text.style.display = 'block';
    loader_text.innerHTML = content;
}
exports.dim = dim;
function undim(content) {
    modal_content.style.display = 'block';
    modal.style.display = 'none';
    connect_loading_ind.style.display = 'none';
    loader_text.style.display = 'none';
    loader_text.innerHTML = '';
}
exports.undim = undim;
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    dim('');
    yield sleep(1000);
    undim('');
}), 10);
//syncing header and side menu
header.addEventListener('mouseover', () => {
    if (window.scrollY >= 100) {
        side_menu.style.marginTop = '50px';
    }
});
header.addEventListener('mouseout', () => {
    if (window.scrollY >= 100) {
        side_menu.style.marginTop = '40px';
    }
});
//adding global click event listeners for UX and click logic
document.addEventListener('click', (event) => {
    // check if the target element of the event is inside the dropdown menu or not
    const isClickedInsideDropdownMenu = ME_menu.contains(event.target);
    const isClickedInsidebutton = ME_button.contains(event.target) || ME_button2.contains(event.target);
    const temp = ME_menu.classList.value;
    const isClickedinsidewalletinfo = wallet_info_box.contains(event.target);
    const isClickedinsidewalletinfobutton = exports.connect_wallet_button.contains(event.target);
    // if the click is outside of the wallet-info-box, hide it
    if (!isClickedinsidewalletinfo && exports.wallet_info_dropped && !isClickedinsidewalletinfobutton) {
        wallet_info_box.classList.remove('dropdown-wallet-info-visible');
        exports.wallet_info_dropped = false;
    }
    // if the click is outside of the dropdown menu, hide it
    if (!isClickedInsideDropdownMenu && exports.me_dropped && !isClickedInsidebutton) {
        ME_menu.classList.remove('dropdown-ME-visible');
        exports.me_dropped = false;
    }
});
//scroll top nav dim and clouds/brand animation
window.addEventListener('scroll', function () {
    if (window.scrollY >= 100 && !exports.content_intersected) {
        nav.classList.add('scrolled-to-content');
        exports.content_intersected = true;
        side_menu.style.marginTop = '40px';
    }
    else if (window.scrollY < 100 && exports.content_intersected) {
        side_menu.style.marginTop = '50px';
        nav.classList.remove('scrolled-to-content');
        exports.content_intersected = false;
    }
    if (window.scrollY >= 650 && !exports.view_button_pop) {
        view_up_button.style.display = 'block';
        exports.view_button_pop = true;
    }
    else if (window.scrollY < 650 && exports.view_button_pop) {
        view_up_button.style.display = 'none';
        exports.view_button_pop = false;
    }
    //we animate the clouds only if the user scrolls down 
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > exports.prevScrollPos) {
        for (var i = 0; i < clouds.length; i++) {
            const cloud = clouds[i];
            cloud.classList.add('clouds-freefall');
        }
        clearTimeout(exports.scrollTimeout);
        exports.scrollTimeout = setTimeout(() => {
            for (var i = 0; i < clouds.length; i++) {
                const cloud = clouds[i];
                cloud.classList.add("clouds-not-freefall");
                cloud.classList.remove("clouds-freefall");
                //cloud.classList.remove("clouds-not-freefall");
            }
            setTimeout(() => {
                for (var i = 0; i < clouds.length; i++) {
                    const cloud = clouds[i];
                    cloud.classList.remove("clouds-not-freefall");
                }
            }, 500);
        }, 300);
    }
    exports.prevScrollPos = window.scrollY;
});
//checking if requested type is installed or not
function check_wallet() {
    //phantom check
    if (exports.wallet_type === 'phantom') {
        if (!window.solana || !window.solana.isPhantom) {
            (0, snackbar_1.showAlert)('Phantom Wallet is not installed!', false, button1);
            return false;
        }
        else {
            return true;
        }
    }
    //solflare check
    if (exports.wallet_type === 'solflare') {
        if (!window.solflare || !window.solflare.isSolflare) {
            (0, snackbar_1.showAlert)('Solflare Wallet is not installed!', false, button1);
            return false;
        }
        else {
            return true;
        }
    }
    //brave wallet check
    if (exports.wallet_type === 'brave') {
        if (!window.braveSolana || !window.braveSolana.isBraveWallet) {
            (0, snackbar_1.showAlert)('Brave Wallet is not installed!', false, button1);
            return false;
        }
        else {
            return true;
        }
    }
    //slope wallet check
    if (exports.wallet_type === 'slope') {
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
        if (exports.wallet_type === 'phantom') {
            try {
                yield window.solana.connect().then((obje) => {
                    exports.owner = window.solana.publicKey.toString();
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
        if (exports.wallet_type === 'brave') {
            try {
                yield window.solana.connect().then((obje) => {
                    exports.owner = window.solana.publicKey.toString();
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
        if (exports.wallet_type === 'solflare') {
            try {
                yield window.solflare.connect().then((obje) => {
                    exports.owner = window.solflare.publicKey.toString();
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
        if (exports.wallet_type === 'slope') {
            try {
                const slope_obj = new window.Slope();
                var failed = false;
                yield slope_obj.connect().then((obje) => {
                    if (obje.msg != 'ok') {
                        failed = true;
                    }
                    else {
                        exports.owner = obje.data.publicKey;
                    }
                });
                if (failed) {
                    (0, snackbar_1.showAlert)('Failed to connect to Slope Wallet!', false, button1);
                    return false;
                }
                else {
                    (0, snackbar_1.showAlert)('Slope Wallet successfully connected!', true, button1);
                    return true;
                }
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
        dim('');
        //checking selected wallet
        const is_installed = check_wallet();
        if (!is_installed) {
            console.log('checking installation');
            modal_content.style.display = 'block';
            connect_loading_ind.style.display = 'none';
            //return early from the function
            return;
        }
        dim('A pop-up should appear from<br/>your wallet extension to connect.');
        //else we connect to the selected wallet
        const connected = yield connect_wallet();
        if (!connected) {
            dim('');
            modal_content.style.display = 'block';
            connect_loading_ind.style.display = 'none';
            //return early from the function
            return;
        }
        else {
            try {
                window.solana.on('accountChanged', () => {
                    location.reload();
                });
            }
            catch (_a) { }
            try {
                window.solflare.on('accountChanged', () => {
                    location.reload();
                });
            }
            catch (_b) { }
            undim('');
            const display_key = exports.owner.substring(0, 6) + '..' + '&#160&#160&#160&#160▾';
            exports.connect_wallet_button.innerHTML = display_key;
            modal_content.style.display = 'block';
            //setting appropriate event listener for wallet button
            exports.connect_wallet_button.removeEventListener('click', show_connect_modal);
            exports.connect_wallet_button.addEventListener('click', show_wallet_info);
            disconnect_wallet_button.style.display = 'flex';
            return;
        }
    });
}
//connect wallet button click
const show_connect_modal = () => __awaiter(void 0, void 0, void 0, function* () {
    modal.style.display = 'flex';
});
//setting balances for wallet info box
function set_balances() {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.wallet_info_viewed) {
            return;
        }
        const sol_balance = yield get_sol_balance();
        const kai_balance = yield get_kai_balance();
        wallet_info_balance_sol.textContent = `${sol_balance / 1000000000}`.substring(0, 6);
        exports.wallet_info_balance_token.textContent = `${kai_balance}`.substring(0, 9);
        console.log(sol_balance);
        exports.wallet_info_viewed = true;
    });
}
exports.set_balances = set_balances;
//set wallet meta-stuff
function set_wallet_meta() {
    if (exports.wallet_type === 'phantom') {
        wallet_type_img.src = './assets/phantom.svg';
    }
    else if (exports.wallet_type === 'solflare') {
        wallet_type_img.src = './assets/solflare.svg';
    }
    else if (exports.wallet_type === 'slope') {
        wallet_type_img.src = './assets/slope.svg';
    }
    else if (exports.wallet_type === 'brave') {
        wallet_type_img.src = './assets/Brave.svg';
    }
    wallet_type_text.textContent = exports.wallet_type;
}
//showing the wallet info-box for wallet info box
const show_wallet_info = () => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!exports.wallet_info_dropped) {
            wallet_info_box.classList.add('dropdown-wallet-info-visible');
            exports.wallet_info_dropped = true;
        }
        else {
            wallet_info_box.classList.remove('dropdown-wallet-info-visible');
            exports.wallet_info_dropped = false;
        }
        set_wallet_meta();
        yield set_balances();
    }), 100);
});
exports.connect_wallet_button.addEventListener('click', show_connect_modal);
//sidconnect wallet button click
disconnect_wallet_button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    location.reload();
}));
//adding event listeners to all wallet buttons
phantom.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    exports.wallet_type = 'phantom';
    yield main();
}));
solflare.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    exports.wallet_type = 'solflare';
    yield main();
}));
brave.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    exports.wallet_type = 'brave';
    yield main();
}));
slope.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    exports.wallet_type = 'slope';
    yield main();
}));
return_button.addEventListener('click', function (e) {
    modal.style.display = 'none';
});
//ME button dropdown
ME_button.addEventListener('click', (e) => {
    setTimeout(() => {
        if (!exports.me_dropped) {
            ME_menu.classList.add('dropdown-ME-visible');
            exports.me_dropped = true;
        }
        else {
            ME_menu.classList.remove('dropdown-ME-visible');
            exports.me_dropped = false;
        }
    }, 100);
});
ME_button2.addEventListener('click', (e) => {
    setTimeout(() => {
        if (!exports.me_dropped) {
            ME_menu.classList.add('dropdown-ME-visible');
            exports.me_dropped = true;
        }
        else {
            ME_menu.classList.remove('dropdown-ME-visible');
            exports.me_dropped = false;
        }
    }, 100);
});
//side menu button function and logic
const side_menu_event = () => {
    if (!exports.side_menu_appeared) {
        exports.side_menu_appeared = true;
        side_menu.classList.add('side-menu-appear');
        side_menu_button.removeEventListener('click', side_menu_event);
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            for (var i = 0; i < side_text.length; i++) {
                yield sleep(100);
                const text = side_text[i];
                text.classList.add('text-side-appear');
            }
            side_menu_button.addEventListener('click', side_menu_event);
        }), 300);
    }
    else {
        exports.side_menu_appeared = false;
        side_menu_button.removeEventListener('click', side_menu_event);
        for (var i = 0; i < side_text.length; i++) {
            const text = side_text[i];
            text.classList.remove('text-side-appear');
        }
        setTimeout(() => {
            side_menu.classList.remove('side-menu-appear');
            side_menu_button.addEventListener('click', side_menu_event);
        }, 300);
    }
};
side_menu_button.addEventListener('click', side_menu_event);
//functionality and fancy effects for scroll up button
view_up_button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
view_up_button.addEventListener('mouseover', () => {
    if (exports.is_arrow_animating) {
        return;
    }
    exports.is_arrow_animating = true;
    var num = 0;
    exports.temp_id = setInterval(() => {
        num += 1;
        const duplicate = document.createElement('img');
        duplicate.src = arrow_pic.src;
        duplicate.style.cssText = arrow_pic.style.cssText;
        duplicate.className = arrow_pic.className;
        arrow_pic.parentNode.insertBefore(duplicate, arrow_pic.nextSibling);
        duplicate.classList.add('arrow-float-up');
        setTimeout(() => {
            duplicate.remove();
        }, 500);
        if (num === 3) {
            clearInterval(exports.temp_id);
            exports.is_arrow_animating = false;
        }
    }, 500);
});
