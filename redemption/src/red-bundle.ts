import { showAlert } from "./snackbar";
import {wallet_type,owner} from "./main-bundle"


//constants
const pools = document.querySelectorAll('.pool');     
const sol_pool = document.querySelector('.sol-pool') as HTMLElement;     
const usdc_pool = document.querySelector('.usdc-pool') as HTMLElement;     
const bonk_pool = document.querySelector('.bonk-pool') as HTMLElement;
const green_dot = document.querySelector('.green-dot') as HTMLElement;
const red_dot = document.querySelector('.red-dot') as HTMLElement;
const pool_buttons = document.querySelectorAll('.pool-button');
const button1 = document.querySelector('.button1') as HTMLButtonElement;
const question_slots  = document.querySelectorAll('.question.question-init');
const faq_section = document.querySelector('.faq') as HTMLElement;
const pool_logos = document.querySelectorAll('.logo-container');
//vars

var prev_faq:any = null; 




//smooth scroll to faq on clicking ? on pool logos
pool_logos.forEach((ele:Element)=>{
  ele.addEventListener('click',()=>{
    faq_section.scrollIntoView({behavior:'smooth', block: "center", inline: "nearest"});
  })
})

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


for (var i=0 ; i < pool_buttons.length ; i++){
    const pool_button = pool_buttons[i];
 
    pool_button.addEventListener('click',blocked_click);
}

//intersection observer for faq buttons

interface IntersectionObserverEntry {
    intersectionRatio: number;
    isIntersecting: boolean;
    target: Element;
  }
  
const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('faq-visible');
      // you can also perform other actions on the target element here
    } else {
      entry.target.classList.remove('faq-visible');
    }
  });
  });
  
  const elements = document.querySelectorAll('.faq');
  
  elements.forEach((element: Element) => {
    observer.observe(element);
  });

  //adding event listeners and interactivity to question dropdowns
  
  
  question_slots.forEach((e:Element) => {
    const question_slot = e as HTMLElement;
    question_slot.addEventListener('click', ()=>{
        
      question_slot.classList.toggle('question-clicked')
      const arrow_down = question_slot.children[0].children[1] as HTMLElement
      if (arrow_down.textContent === '▴' ){
          arrow_down.textContent = '▾';
      }else{
          arrow_down.textContent = '▴';
      }
      
      })

  })



    