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

const phantom = document.getElementById('Phantom')as HTMLElement;
const solflare = document.getElementById('Solflare') as HTMLElement;
const brave = document.getElementById('Brave')as HTMLElement;
const slope = document.getElementById('Slope') as HTMLElement;
const return_button = document.querySelector('#quit')as HTMLElement;
const modal = document.querySelector('.modal1')as HTMLElement;
const button1 = document.querySelector('.button1') as HTMLButtonElement;

//global state and control variables
var wallet_type:string = '';
var owner:string = '';




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
            await slope_obj.connect().then((obje:any)=>{
                showAlert('Slope Wallet successfully connected!',true,button1);
            })
            return true;
        }catch(e){
            console.log(e);
            showAlert('Failed to connect to Slope Wallet!',false,button1);
            return false;
        }
    }

}

async function main(){

    //checking selected wallet
    const is_installed = check_wallet();
    
    if (!is_installed){
        //return early from the function
        return
    }

    //else we connect to the selected wallet
    const connected = await connect_wallet();
    if (!connected){
        //return early from the function
        return
    }else{
        console.log(owner);
    }

}




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



//return button for connect wallet modal
return_button.addEventListener('click', function(e) {
    modal.style.display = 'none';
});
