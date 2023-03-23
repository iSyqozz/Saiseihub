
const pools = document.querySelectorAll('.pool');     
const sol_pool = document.querySelector('.sol-pool') as HTMLElement;     
const usdc_pool = document.querySelector('.usdc-pool') as HTMLElement;     
const bonk_pool = document.querySelector('.bonk-pool') as HTMLElement;
const green_dot = document.querySelector('.green-dot') as HTMLElement;
const red_dot = document.querySelector('.red-dot') as HTMLElement;

//sleep function
function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

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



    