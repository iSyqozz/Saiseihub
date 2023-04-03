import {PublicKey, Transaction} from '@solana/web3.js';
import {showAlert} from "./snackbar";
import {wallet_type,
  owner,
  dim,
  undim,
  connect_wallet_button,
  wallet_info_balance_token,
  set_balances
} 
from "./main-bundle";
import bs58 from 'bs58';
import base58 from 'bs58';


//constants
const sol_pool = document.querySelector('#sol-pool') as HTMLElement;     
const usdc_pool = document.querySelector('#usdc-pool') as HTMLElement;     
const bonk_pool = document.querySelector('#bonk-pool') as HTMLElement;
const blinkers = document.querySelectorAll('.dot');
const refresh_indicators = document.querySelectorAll('.refresh-ind');
const pool_buttons = document.querySelectorAll('.pool-button');
const button1 = document.querySelector('.button1') as HTMLButtonElement;
const question_slots  = document.querySelectorAll('.question.question-init');
const faq_section = document.querySelector('.faq') as HTMLElement;
const pool_logos = document.querySelectorAll('.logo-container');
const faq_header = document.querySelector('.faq-header-title') as HTMLElement;
const portfolio_header = document.querySelector('.portfolio-header-title') as HTMLElement;
const portfolio = document.querySelector('.portfolio-container') as HTMLElement;
const claim_anchor = document.querySelector('.claim-anchor') as HTMLElement;
const wallet_info_portfolio = document.querySelector('.wallet-info-portfolio') as HTMLElement;
const connect_wallet_portfolio = document.querySelector('.init-portfolio')?.children[0].children[1] as HTMLElement;

const modal2 = document.querySelector('.modal2')as HTMLElement;
const sliderBar = document.querySelector('.slider-bar') as HTMLElement;
const sliderProgress = document.querySelector('.slider-progress') as HTMLElement;
const sliderHandle = document.querySelector('.slider-handle') as HTMLElement;
const sliderValue = document.querySelector('.slider-value') as HTMLElement;
const deposit_amount_indicator = document.querySelector('.amount-indicator') as HTMLElement;
//const withdraw_amount_indicator = document.querySelector('.withdraw-indicator') as HTMLElement;
const deposit_max_button = document.querySelector('.max-button') as HTMLElement;
const deposit_modal_button = document.querySelector('.deposit-modal-button') as HTMLElement;
const deposit_modal_return = document.querySelector('.wallet-btn.deposit-modal-button.return') as HTMLElement;
const withdraw_buttons = document.querySelector('.withdraw-container') as HTMLElement;



//vars
var prev_faq:any = null;
var pool_status:any = null;
var isDragging = false;
var value = 0;
var choosen_pool = '';
var refresh_ready:boolean = true;



//sleep function
function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



//getting the pools status
async function get_pools_status(){

  var res:Array<any> = [];
  await fetch('https://saisei-server.com/get_active_pools', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => {
      res = [0,0,0,0,0,0,'---','---','---'];
    })
    return res
};
//getting pools exchange rate
async function get_exchange_rate(pool:string){

  var res:number = 0;
  await fetch('https://saisei-server.com/get_pool_exchange_rate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body:JSON.stringify({
      pool:pool
    })})
    .then(response => response.json())
    .then(data => {
      
      res = data;
    })
    .catch(error => {
      res = 0;
    })
    
    return res
}

//getting total deposited KAI for pool
async function get_kai_amount(pool:string){

  var res:number = 0;
  await fetch('https://saisei-server.com/get_pool_kai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body:JSON.stringify({
      pool:pool
    })})
    .then(response => response.json())
    .then(data => {
      res = data;
    })
    .catch(error => {
      res = 0;
    })
    return res
}


//setting up the pools;
async function setup_pool(pool:HTMLElement,index:number){ 
  

//adding choosen pool event listener  
pool.addEventListener('click',()=>{
    choosen_pool = pool.getAttribute('id') as string;
  })

  
  //1. adjusting the status inddicator based on the pools availability
  const status_text = pool.children[0].children[0].children[0];
  const status_dot = pool.children[0].children[1];
  const exchange_rate = pool.children[2].children[0].children[1].children[0] as HTMLElement;
  exchange_rate.classList.add('exchange-rate-green');
  
  
  //removing inactive ind from portfolio section
  const portfolio_section_inactive = document.querySelectorAll('.connected-portfolio .portfolio-segment .pool-inactive')[index] as HTMLElement;
  const portfolio_section_active = document.querySelectorAll('.connected-portfolio .portfolio-segment .segment-content')[index+1] as HTMLElement;
  portfolio_section_inactive.style.display = 'none';
  portfolio_section_active.style.display = 'flex';
  
  
  status_text.textContent = 'Pool Active';
  status_text.classList.remove('is-inactive'); 
  status_text.classList.add('is-active'); 
  status_dot.classList.add('green-dot');
  status_dot.classList.remove('red-dot');
  
  const expiration_date_div = pool.children[2].children[1].children[2].children[1] as HTMLElement;  
  const pool_amount_div = pool.children[2].children[1].children[0].children[1] as HTMLElement;

  
  
  //setting up expiry timer
  setInterval(() => {

  const future_timestamp = pool_status[index+6] as number;
  const currentTimestamp = new Date().getTime();
  const difference = future_timestamp - currentTimestamp;

  const seconds = Math.floor(difference / 1000) % 60;
  const minutes = Math.floor(difference / 1000 / 60) % 60;
  const hours = Math.floor(difference / 1000 / 60 / 60) % 24;
  const days = Math.floor(difference / 1000 / 60 / 60 / 24);

  const remainingTime = `${days}d ${hours}h ${minutes}m`;
  

  expiration_date_div.innerText = remainingTime;
  if(days > 0){
    expiration_date_div.classList.add('date-active');
  }else{
    expiration_date_div.classList.add('date-active-late');
  }

  }, 1000);
  
  //setting up pool reserves
  if (index === 0){
    pool_amount_div.innerText = `${pool_status[index+3]} SOL`
  }else
  if (index === 1){
    pool_amount_div.innerText = `${pool_status[index+3]} USDC`
  }else
  if (index === 2){
    pool_amount_div.innerText = `${pool_status[index+3]} BONK`
  }
  
  
  //setting up kai amount
  const pool_kai:number = await get_kai_amount(pool.getAttribute('id') as string);
  const kai_amount_div = pool.children[2].children[1].children[1].children[1] as HTMLElement;
  kai_amount_div.textContent = `${pool_kai} $KAI`
  console.log(kai_amount_div.classList);

  
  //setting up pool exchange rate. 
  try{
    const rate:number = await get_exchange_rate(pool.getAttribute('id') as string);
    exchange_rate.textContent = rate.toString().substring(0,7); 
  }catch(e){}



}

function setup_portfolio(sol_number:number,usdc_number:number,bonk_number:number){
  

  //total deposits
  console.log(sol_number,usdc_number,bonk_number);
  const tot = sol_number+usdc_number+bonk_number;

  //sol_exchange_rate
  const exchange_rate_sol_text = sol_pool.children[2].children[0].children[1].children[0] as HTMLElement;
  var sol_exchange_rate = '';
  if (exchange_rate_sol_text.innerHTML === '&nbsp;---'){
    console.log('rip!')
    sol_exchange_rate = '0';
  }else{
    sol_exchange_rate = exchange_rate_sol_text.textContent as string;
  }
  sol_exchange_rate = (parseFloat(sol_exchange_rate as string) * sol_number).toString().substring(0,9);

  //usdc_exchange_rate
  const exchange_rate_usdc_text = usdc_pool.children[2].children[0].children[1].children[0] as HTMLElement;
  var usdc_exchange_rate = '';
  if (exchange_rate_usdc_text.innerHTML === '&nbsp;---'){
    console.log('rip!')
    usdc_exchange_rate = '0';
  }else{
    usdc_exchange_rate = exchange_rate_usdc_text.textContent as string;
  }
  usdc_exchange_rate = (parseFloat(usdc_exchange_rate as string) * usdc_number).toString().substring(0,9);

  //bonk_exchange_rate
  const exchange_rate_bonk_text = bonk_pool.children[2].children[0].children[1].children[0] as HTMLElement;
  var bonk_exchange_rate = '';
  if (exchange_rate_bonk_text.innerHTML === '&nbsp;---'){
    console.log('rip!')
    bonk_exchange_rate = '0';
  }else{
    bonk_exchange_rate = exchange_rate_bonk_text.textContent as string;
  }
  bonk_exchange_rate = (parseFloat(bonk_exchange_rate as string) * bonk_number).toString().substring(0,9);

  
  
  //overview elements to be adjusted
  const tot_kai = document.querySelector('.portfolio-overview .segment-content')?.children[0].children[1];
  const estimated_earnings_tot = document.querySelector('.portfolio-overview .segment-content')?.children[1].children;
  const sol_segment = document.querySelector('.segment-content-sol');
  const usdc_segment = document.querySelector('.segment-content-usdc');
  const bonk_segment = document.querySelector('.segment-content-bonk');
  
  tot_kai!.textContent = tot.toString().substring(0,9);
  
  estimated_earnings_tot![1].textContent = `SOL: ${sol_exchange_rate}`; 
  estimated_earnings_tot![2].textContent = `USDC: ${usdc_exchange_rate}`;  
  estimated_earnings_tot![3].textContent = `BONK: ${bonk_exchange_rate}`;
  
  sol_segment!.children[0].children[1].textContent = sol_number.toString().substring(0,9); 
  usdc_segment!.children[0].children[1].textContent = usdc_number.toString().substring(0,9); 
  bonk_segment!.children[0].children[1].textContent = bonk_number.toString().substring(0,9); 

  sol_segment!.children[1].children[1].textContent = sol_exchange_rate.toString().substring(0,9); 
  usdc_segment!.children[1].children[1].textContent = usdc_exchange_rate.toString().substring(0,9); 
  bonk_segment!.children[1].children[1].textContent = bonk_exchange_rate.toString().substring(0,9); 
  


  console.log(tot_kai);
  tot_kai!.textContent = tot.toString().substring(0,9);



}




//main function
async function main_redemption(){
  pool_status = await get_pools_status();
  
  //setting up the pools status and info and style and functionality
  dim('');
  if (pool_status[0] === 1){
    setup_pool(sol_pool,0);
  }

  if (pool_status[1] === 1){
    setup_pool(usdc_pool,1);
  }

  if (pool_status[2] === 1){
    setup_pool(bonk_pool,2);
  }
  undim('');

const interval_id = setInterval(async () => {
    if(owner != ''){
      clearInterval(interval_id);

      for (var i=0 ; i < pool_buttons.length ; i++){
        const pool_button = pool_buttons[i];
     
        pool_button.removeEventListener('click',blocked_click);
        

        if(pool_status[i] === 0){
          pool_button.textContent = 'Inactive';
          pool_button.addEventListener('click',pool_inactive_click);
        }else{
          pool_button.textContent = 'Deposit';
          pool_button.addEventListener('click',()=>{
            enabled_click();
          });
          pool_button.classList.remove('pool-button-inactive');
        }
      }

      const prev_content = document.querySelector('.init-portfolio .not-connected') as HTMLElement;
      const portfolio_segment = document.querySelectorAll('.portfolio-segment');
      portfolio.classList.remove('pending-connection');
      portfolio_segment.forEach((ele:Element)=>{
        const element = ele as HTMLElement;
        element.style.display = 'flex'; 
      })
      prev_content.parentElement!.classList.add('connected-portfolio');
      prev_content.style.display = 'none';

      try{

        await fetch('https://saisei-server.com/get_user_deposits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body:JSON.stringify({
            owner:owner,
          })})
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setup_portfolio(data[0] as number, data[1] as number,data[2] as number);
            //adjusting portfolio
          
          
          })
          .catch(error => {
            console.log(error);
          })
        }catch(e){
          console.log(e)
        }

    }

  }, 1000);
}



//setting choosen pool

//smooth scroll to faq on clicking ? on pool logos
pool_logos.forEach((ele:Element)=>{
  
  ele.addEventListener('click',()=>{
    faq_section.scrollIntoView({behavior:'smooth', block: "center", inline: "nearest"});
  });
})

//refresh indicator for live rate
refresh_indicators.forEach((ele:Element)=>{

  ele.addEventListener('click',async()=>{
    ele.classList.add('refresh-ind-spinning');
    const pool = ele.parentElement?.parentElement?.parentElement
    const exchange_rate = pool?.children[2].children[0].children[1].children[0] as HTMLElement;
    const activity = pool?.children[0].children[0].children[0].textContent;
    if (refresh_ready && activity != 'Pool inactive'){
      try{
        const rate:number = await get_exchange_rate(pool?.getAttribute('id') as string);
        exchange_rate.textContent = rate.toString().substring(0,7);
        console.log(rate);
      }catch(e){

      }

      refresh_ready = false
      setTimeout(() => {
        ele.classList.remove('refresh-ind-spinning');
      }, 1500);
  
      setTimeout(() => {
        refresh_ready = true
      }, 180000);
    }else{
      setTimeout(() => {
        ele.classList.remove('refresh-ind-spinning');
      }, 2500);
    }




  });

});

//smooth scroll to portfolio section on claim anchor click

claim_anchor.addEventListener('click',()=>{
  portfolio_header.scrollIntoView({behavior:'smooth', block: "center", inline: "nearest"});
})

//smooth scroll to faq section on faq header click

faq_header.addEventListener('click',()=>{
  faq_section.scrollIntoView({behavior:'smooth', block: "center", inline: "nearest"});
})

//smooth scroll to portfolio section on wallet_info_portfolio click

wallet_info_portfolio.addEventListener('click',()=>{
  portfolio_header.scrollIntoView({behavior:'smooth', block: "center", inline: "nearest"});
})

//smooth scroll to portfolio section on portfolio header click

portfolio_header.addEventListener('click',()=>{
  portfolio.scrollIntoView({behavior:'smooth', block: "center"});
})

//connect wallet from portfolio button

connect_wallet_portfolio.addEventListener('click',()=>{
  connect_wallet_button.click();
})


sliderHandle.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mousemove', (event:MouseEvent) => {
  event.preventDefault();
  if (isDragging) {
    const newPosition = event.pageX - sliderBar.getBoundingClientRect().left - sliderHandle.offsetWidth / 2;
    const sliderBarWidth = sliderBar.clientWidth;
    const sliderHandleWidth = sliderHandle.offsetWidth;
    const minPosition = 0;
    const maxPosition = sliderBarWidth - sliderHandleWidth;
    const boundedPosition = Math.max(minPosition, Math.min(maxPosition, newPosition));
    sliderHandle.style.transform = `translateX(${boundedPosition}px)`;
    sliderProgress.style.width = `${boundedPosition}px`;
    const percentage = updateValue();
    const val = parseFloat(wallet_info_balance_token.textContent as string)
    deposit_amount_indicator.textContent = `${Math.floor(val * (percentage/100))}`
  }
});

modal2.addEventListener('mouseup', () => {
  isDragging = false;
});

function updateValue(): number {
  const transformValue = sliderHandle.style.transform;
  const currentPosition = parseInt(transformValue.replace(/[^\d.-]/g, ''));
  const maxPosition = sliderBar.clientWidth - sliderHandle.offsetWidth;
  const percentage = Math.round(currentPosition / 68 * 100);
  value = percentage ;
  sliderValue.innerText = `${value}%`;
  return percentage;
}





 //status indicator dot blinking
 setInterval(async () => {
    for (var i=0 ; i < 3 ; i++){
        await sleep(300);
        const copy1  = document.createElement('div');
        const blinker1 = blinkers[0] as HTMLElement
        copy1.style.cssText = blinker1.style.cssText;
        copy1.className = blinker1.className;
        copy1.classList.add('blink');
        blinker1.appendChild(copy1);

        const copy2  = document.createElement('div');
        const blinker2 = blinkers[1] as HTMLElement
        copy2.style.cssText = blinker2.style.cssText;
        copy2.className = blinker2.className;
        copy2.classList.add('blink');
        blinker2.appendChild(copy2);

        const copy3  = document.createElement('div');
        const blinker3 = blinkers[2] as HTMLElement
        copy3.style.cssText = blinker3.style.cssText;
        copy3.className = blinker3.className;
        copy3.classList.add('blink');
        blinker3.appendChild(copy3);
    }

    setTimeout(async () => {
        const children = blinkers[0].children
        for (var j = 0 ; j < children.length; j++){
            const child = children[j] as HTMLElement;
            child.remove();
        }

        const children1 = blinkers[1].children
        for (var j=0 ; j < children1.length; j++){
            const child = children1[j] as HTMLElement;
            child.remove();
        }

        const children2 = blinkers[2].children
        for (var j=0 ; j < children2.length; j++){
            const child = children2[j] as HTMLElement;
            child.remove();
        }
    }, 1000);

}, 3000);

//function for getting a transaction
async function get_deposit_transaction(){

  try{

  var transaction:string = '';
  const amount = parseInt(deposit_amount_indicator.textContent as string);
  await fetch('https://saisei-server.com/get_kai_deposit_transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body:JSON.stringify({
      owner_address:owner,
      amount:amount,
    })})
    .then(response => response.json())
    .then(data => {
      transaction = data;
      //console.log(data);
    })
    .catch(error => {
      transaction = 'failed from frontend';
    })
    return transaction;
  }catch(e){
    return 'failed';
  }
}

//function for signing a transaction
async function sign_transaction(transaction:string){

  try{
    const transaction_buffer = Buffer.from(transaction,'base64');
    const raw_tx = Transaction.from(transaction_buffer);
  
    if (wallet_type === 'phantom'){
      const signed_transaction = await window.solana.signTransaction(raw_tx,{skipPreflight: false});
      return signed_transaction;
    }else if(wallet_type === 'solflare'){
      const signed_transaction = await window.solflare.signTransaction(raw_tx);
      return signed_transaction;
    }else if(wallet_type === 'slope'){
      const slope = new window.Slope();
      var res = await slope.signTransaction(base58.encode(raw_tx.serializeMessage()));
      const signature = res.data.signature;
      const pk = res.data.publicKey;
      
      raw_tx.addSignature(
        new PublicKey(pk),
        bs58.decode(signature) as Buffer,
      )
      return raw_tx;
    }else if(wallet_type === 'brave'){
      const signed_transaction = await window.braveSolana.signTransaction(raw_tx,{skipPreflight: false});
      return signed_transaction;
    }
  }catch(e){
    return 'failed';
  }
}

//function for sending a transaction

async function send_transaction(transaction:Transaction){
  const temp = transaction.serialize({requireAllSignatures:true,verifySignatures:true})
  const transactionBase64 = Buffer.from(temp).toString('base64');
  var sig:string = '';
    await fetch('https://saisei-server.com/submit_solflare_transaction',{
    method:"POST",
    headers:{
      'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        serialized_transaction:transactionBase64 
      }),
      })
      .then(response => response.json())
      .then(data =>{
        sig = data;
      })
      .catch(error=>{
        console.log(error);
        sig = '';
      }
      )  
  return sig
}

async function verify_deposit_transaction(sig:string){

  var worked:number = 1;
  const amount = parseInt(deposit_amount_indicator.textContent as string);
  await fetch('https://saisei-server.com/verify_kai_deposit_transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body:JSON.stringify({
      signature:sig,
      owner:owner,
      pool:choosen_pool
    })})
    .then(response => response.json())
    .then(data => {
      worked = data
      //console.log(data);
    })
    .catch(error => {
      worked = 0;
    })
    return worked;
}

//adding event listeners for pool_buttons
const blocked_click = () => {
  showAlert('Wallet not connected',false,button1);
}

const pool_inactive_click = () =>{
  showAlert('Pool Inactive',false,button1);
}

const enabled_click = async () =>{
  dim('');
  await set_balances(); 
  undim('');
  modal2.style.display = 'flex';
}

for (var i=0 ; i < pool_buttons.length ; i++){
    const pool_button = pool_buttons[i];
 
    pool_button.addEventListener('click',blocked_click);
}


deposit_max_button.addEventListener('click',()=>{
  sliderHandle.style.transform = `translateX(${68}px)`;
  sliderProgress.style.width = `${68}px`;
  const val = parseFloat(wallet_info_balance_token.textContent as string)
  deposit_amount_indicator.textContent = `${Math.floor(val)}`
  //updateValue();

})

deposit_modal_return.addEventListener('click',()=>{
  reset_deposit_modal();
})

//adding event listener to deposit modal button and deposit return button
deposit_modal_button.addEventListener('click',async()=>{
  const current_pool = choosen_pool;
  const amount = parseInt(deposit_amount_indicator.textContent as string);


  if (deposit_amount_indicator.textContent === '0'){
  showAlert(`Amount cannot be zero! `,false,button1);
  return
  }
    
    //fetching transaction
    dim('Fetching Transaction.');
    await sleep(1000);
    const transaction:string = await get_deposit_transaction();
    if (transaction === 'failed'){
      showAlert('Failed to fetch Transaction',false,button1);
      undim('');
      return
    }

    //waiting for trabsaction approval and signature
    dim('Waiting for Transaction Approval.');
    const signed_transaction = await sign_transaction(transaction);
    if (signed_transaction === 'failed'){
      showAlert('Transaction Signature Failed',false,button1);
      undim('');
      return
    }
    
    
    //sending the transaction
    dim('Sending Transaction.');
    const sig = await send_transaction(signed_transaction);
    if (sig === ''){
      showAlert('Failed to send Transaction',false,button1);
      undim('')
      return
    }

    dim('Verifying Transaction');
    const is_valid = await verify_deposit_transaction(sig);

    undim('');
    reset_deposit_modal();
    await adjust_amounts(amount,current_pool);
    showAlert('Transaction Approved and Successfully sent!',true,button1);
  
});

function reset_deposit_modal(){
  modal2.style.display = 'none';
  sliderHandle.style.transform = `translateX(${0}px)`;
  sliderProgress.style.width = `${0}px`;
  deposit_amount_indicator.textContent = '0';
  updateValue();
}

//function for adjusting amounts through the whole page
async function adjust_amounts(amount:number,current_pool:string){

  //adjusting wallet info token balance
  const prev_kai = parseFloat(wallet_info_balance_token.textContent as string);
  const new_amount = prev_kai - amount;
  wallet_info_balance_token.textContent = `${new_amount}`;

  await fetch('https://saisei-server.com/get_user_deposits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body:JSON.stringify({
      owner:owner,
    })})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const res:number = data[0];
      const res2:number = data[1];
      const res3:number = data[2];
      
      if(current_pool === 'sol-pool'){
        setup_portfolio(res+amount,res2,res3);
      }else if(current_pool === 'usdc-pool'){
        setup_portfolio(res,res2+amount,res3);
      }else{
        setup_portfolio(res,res2,res3+amount);
      }
    })

  

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
    const answer_text = e.children[1].children[0];
    question_slot.addEventListener('click', ()=>{
      answer_text.classList.toggle('answer-shown');
        
      question_slot.classList.toggle('question-clicked')
      const arrow_down = question_slot.children[0].children[1] as HTMLElement
      if (arrow_down.textContent === '▴' ){
          arrow_down.textContent = '▾';
      }else{
          arrow_down.textContent = '▴';
      }
      
      })

  })

//disconected intenet

const connection_interval = setInterval(async ()=>{
  //console.log(window.navigator.onLine);
  if (!window.navigator.onLine){
    dim('Connection Disconnected');

    const temp = setInterval(async () => {

      if (window.navigator.onLine){
        clearInterval(temp)
        location.reload();
        
      } 
      
    }, 1000);

    clearInterval(connection_interval)
    
  }
},3000)

main_redemption();



    