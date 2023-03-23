import { showAlert } from "./snackbar";

const pools = document.querySelectorAll('.pool');     
const sol_pool = document.querySelector('.sol-pool') as HTMLElement;     
const usdc_pool = document.querySelector('.usdc-pool') as HTMLElement;     
const bonk_pool = document.querySelector('.bonk-pool') as HTMLElement;
const green_dot = document.querySelector('.green-dot') as HTMLElement;
const red_dot = document.querySelector('.red-dot') as HTMLElement;
const pool_buttons = document.querySelectorAll('.pool-button');
const button1 = document.querySelector('.button1') as HTMLButtonElement;

//sleep function
function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }


//status indicator dot blinking
 setInterval(async () => {
    for (var i=0 ; i < 3 ; i++){
        await sleep(300);
        const copy  = document.createElement('div');
        copy.style.cssText = green_dot.style.cssText;
        copy.className = green_dot.className;
        copy.classList.add('blink');
        green_dot.appendChild(copy);

        const copy2  = document.createElement('div');
        copy2.style.cssText = red_dot.style.cssText;
        copy2.className = red_dot.className;
        copy2.classList.add('blink');
        red_dot.appendChild(copy2);
    }

    setTimeout(() => {
        const children = green_dot.children
        for (var j=0 ; j < children.length; j++){
            const child = children[j] as HTMLElement;
            child.remove();
        }

        const children2 = red_dot.children
        for (var j=0 ; j < children2.length; j++){
            const child = children2[j] as HTMLElement;
            child.remove();
        }
    }, 1000);
}, 3000); 

//adding event listeners for inactive pool_buttons

const blocked_click = () => {
    showAlert('Wallet not connected',false,button1);
}

console.log(pool_buttons);
for (var i=0 ; i < pool_buttons.length ; i++){
    const pool_button = pool_buttons[i];
 
    pool_button.addEventListener('click',blocked_click);
}



    