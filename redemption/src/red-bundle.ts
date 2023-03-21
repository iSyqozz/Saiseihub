import {showAlert} from "./snackbar";

declare global {
    interface Window {
      solana: any;
      solflare:any;
      braveSolana:any;
      slope:any;
      Slope:any;
    }
  }

const nav = document.querySelector('header') as HTMLElement;
const phantom = document.getElementById('Phantom')as HTMLElement;
const solflare = document.getElementById('Solflare') as HTMLElement;
const brave = document.getElementById('Brave')as HTMLElement;
const slope = document.getElementById('Slope') as HTMLElement;
const return_button = document.querySelector('#quit')as HTMLElement;
const modal = document.querySelector('.modal1')as HTMLElement;
const modal_content = document.querySelector('.modal1-box')as HTMLElement;
const connect_loading_ind = document.querySelector('.loader--style8')as HTMLElement;
const button1 = document.querySelector('.button1') as HTMLButtonElement;
const ME_button = document.querySelector('.me-button') as HTMLElement;
const ME_menu = document.querySelector('.dropdown-ME') as HTMLElement;
const connect_wallet_button = document.querySelector('.connect-wallet') as HTMLElement;
const disconnect_wallet_button = document.querySelector('.disconnect-wallet') as HTMLElement;
const view_up_button = document.querySelector('.up-arrow-container') as HTMLElement;
const arrow_pic = document.querySelector('.up-arrow1') as HTMLImageElement;

//global state and control variables
var wallet_type:string = '';
var owner:string = '';
var me_dropped:boolean = false;
var content_intersected:boolean = false;
var view_button_pop:boolean = false;
var temp_id:any = null;
var is_arrow_animating:boolean = false;


//scroll top nav dim
window.addEventListener('scroll',function(){
    if (window.scrollY >= 100 && !content_intersected){
        nav.classList.toggle('scrolled-to-content');
        content_intersected = true;
    }else if(window.scrollY < 100 && content_intersected){
        nav.classList.toggle('scrolled-to-content');
        content_intersected = false;
    }

    if (window.scrollY >= 650 && !view_button_pop){
        view_up_button.style.display = 'block';
        view_button_pop = true;
    }else if(window.scrollY < 650 && view_button_pop){
        view_up_button.style.display = 'none';
        view_button_pop = false;
    }


})



//checking if requested type is installed or not
function check_wallet(){
    
    //phantom check
    if (wallet_type === 'phantom'){
        if (!window.solana || !window.solana.isPhantom) {
            showAlert('Phantom Wallet is not installed!',false,button1);
            return false
        }else{
            return true
        }
    }

    //solflare check
    if (wallet_type === 'solflare'){
        if (!window.solflare || !window.solflare.isSolflare) {
            showAlert('Solflare Wallet is not installed!',false,button1);
            return false
        }else{
            return true
        }
    }

    //brave wallet check
    if (wallet_type === 'brave'){
        if (!window.braveSolana || !window.braveSolana.isBraveWallet) {
            showAlert('Brave Wallet is not installed!',false,button1);
            return false
        }else{
            return true
        }
    }

    //slope wallet check
    if (wallet_type === 'slope'){
        if (!window.slope) {
            showAlert('Slope Wallet is not installed!',false,button1);
            return false
        }else{
            return true
        }
    }
}

//connecting to the wallet after checking it's installation
async function connect_wallet(){

    if (wallet_type === 'phantom'){
        try{
            await window.solana.connect().then((obje:any)=>{
                owner = window.solana.publicKey.toString();
                showAlert('Phantom Wallet successfully connected!',true,button1);
            });
            return true;
        }catch(e){
            console.log(e);
            showAlert('Failed to connect to Phantom Wallet!',false,button1);
            return false;
        }
    }

    if (wallet_type === 'brave'){
        try{
            await window.solana.connect().then((obje:any)=>{
                owner = window.solana.publicKey.toString();
                showAlert('Brave Wallet successfully connected!',true,button1);
            });
            return true;

        }catch(e){
            console.log(e);
            showAlert('Failed to connect to Brave Wallet!',false,button1);
            return false;
        }
    }

    if (wallet_type === 'solflare'){
        try{
            await window.solflare.connect().then((obje:any)=>{
                owner = window.solflare.publicKey.toString();
                showAlert('Solflare Wallet successfully connected!',true,button1);
            });
            return true
        }catch(e){
            console.log(e);
            showAlert('Failed to connect to Solflare Wallet!',false,button1);
            return false;
        }
    }

    if (wallet_type === 'slope'){
        try{
            const slope_obj = new window.Slope();
            var failed = false
            await slope_obj.connect().then((obje:any)=>{
                console.log(obje.data)
                if (obje.msg != 'ok'){
                    failed = true
                }else{
                    owner = obje.data.publicKey
                }
            })
            if(failed){
                showAlert('Failed to connect to Slope Wallet!',false,button1);
                return false
            }else{
                showAlert('Slope Wallet successfully connected!',true,button1);
                return true;
            }
        }catch(e){
            console.log(e);
            showAlert('Failed to connect to Slope Wallet!',false,button1);
            return false;
        }
    }

}

async function main(){

    modal_content.style.display = 'none';
    connect_loading_ind.style.display = 'block';

    //checking selected wallet
    const is_installed = check_wallet();
    
    if (!is_installed){
        modal_content.style.display = 'block';
        connect_loading_ind.style.display = 'none';
        //return early from the function
        return
    }

    //else we connect to the selected wallet
    const connected = await connect_wallet();
    
    if (!connected){
        modal_content.style.display = 'block';
        connect_loading_ind.style.display = 'none';
        //return early from the function
        return
    }else{
        console.log(owner);
        const display_key = owner.substring(0,6)+'..'+'&#160&#160&#160&#160▾';
        connect_wallet_button.innerHTML = display_key;
        modal_content.style.display = 'block';
        connect_loading_ind.style.display = 'none';
        modal.style.display = 'none';
        connect_wallet_button.removeEventListener('click',show_connect_modal);
        disconnect_wallet_button.style.display = 'block';
    }
}


//connect wallet button click

const show_connect_modal = async()=>{
    modal.style.display = 'flex'; 
}

connect_wallet_button.addEventListener('click',show_connect_modal)


//sidconnect wallet button click

disconnect_wallet_button.addEventListener('click',async ()=>{
    location.reload();
})

//adding event listeners to all wallet buttons
phantom.addEventListener('click', async() => {
    wallet_type = 'phantom'
    await main();  
});

solflare.addEventListener('click', async() => {
    wallet_type = 'solflare'
    await main();  
});

brave.addEventListener('click', async() => {
    wallet_type = 'brave'
    await main();  
});

slope.addEventListener('click', async() => {
    wallet_type = 'slope'
    await main();  
});

return_button.addEventListener('click', function(e) {
    modal.style.display = 'none';
});


//ME button dropdown
ME_button.addEventListener('click',(e)=>{
    if (!me_dropped){
        ME_menu.classList.add('dropdown-ME-visible')
        me_dropped = true
    }else{
        ME_menu.classList.remove('dropdown-ME-visible')
        me_dropped = false;
    }
})


//functionality and fancy effects for scroll up button
view_up_button.addEventListener('click',()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
})

view_up_button.addEventListener('mouseover',()=>{
    if (is_arrow_animating){
        return
    }

    is_arrow_animating = true;
    
    var num = 0
    temp_id = setInterval(() => {
        
        num+=1
        const duplicate = document.createElement('img') as HTMLImageElement;
        duplicate.src = arrow_pic.src;
        duplicate.style.cssText = arrow_pic.style.cssText
        duplicate.className = arrow_pic.className;
        arrow_pic.parentNode!.insertBefore(duplicate,arrow_pic.nextSibling);
        duplicate.classList.add('arrow-float-up');
        setTimeout(() => {
            duplicate.remove();
        }, 500);

        if (num === 3){
            clearInterval(temp_id);
            is_arrow_animating = false;
        }
    }, 500);

})




