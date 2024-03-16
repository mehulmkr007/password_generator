
// select variable

let slider = document.querySelector('.slider')
let lengthNmber = document.querySelector('.Length_number')
let textPass = document.querySelector('.text-password')


// slider default value 
defaultVal = 10;
// initial password value
let password = ""


// handle slider function
handleSlider();
function handleSlider(){
    lengthNmber.textContent = defaultVal;
    slider.value = defaultVal;
}

slider.addEventListener('input' , (event)=>{
    defaultVal = event.target.value;
    handleSlider();
})


// <=======  set indicator  =====>

let indicator = document.querySelector('.strenth-display')

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// <========= function for strenth calculation ==========>

let upperCaseBox = document.querySelector('.box1')
let lowerCaseBox = document.querySelector('.box2')
let numberBox = document.querySelector('.box3')
let symbolBox = document.querySelector('.box4')


function calStrenth(){

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (upperCaseBox.checked) hasUpper = true;
    if (lowerCaseBox.checked) hasLower = true;
    if (numberBox.checked) hasNum = true;
    if (symbolBox.checked) hasSym = true;
    
    if (hasUpper && hasLower && (hasNum || hasSym) && defaultVal >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        defaultVal >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }
}


let generateBtn = document.querySelector('.generator-button')

generateBtn.addEventListener('click', () =>{
    calStrenth();
})

// -----------generate the random password keyword------------


function getRndInteger(min,max){
    return Math.floor(Math.random()*(max - min)) + min
}

function generateRndNum(){
    return getRndInteger(0,9);
}

function generateRndUpperCase(){
    return String.fromCharCode(getRndInteger(65,92));
}

function generateRndLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

let symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/' 
function generateRndSymbol(){
    let rndNum = getRndInteger(0 , symbols.length);
    return symbols.charAt(rndNum);
}


let checkCount = 0;
function checkBoxCount(){
    if(upperCaseBox.checked) checkCount++;
    if(lowerCaseBox.checked) checkCount++;
    if(symbolBox.checked) checkCount++;
    if(numberBox.checked) checkCount++;
    
    return checkCount;
}

// ---generate password and display into input box---
generateBtn.addEventListener('click', ()=>{

    // to check how many checkBox are ticked
    checkBoxCount();

    if(checkCount == 0){
        return ;
    }
    
    if(checkCount > defaultVal){
        defaultVal = checkCount;
        handleSlider();
    }
    
    password = "";

    let getArr = [];

    if(upperCaseBox.checked){
        getArr.push(generateRndUpperCase);
    }
    if(lowerCaseBox.checked){
        getArr.push(generateRndLowerCase)
    }
    if(symbolBox.checked){
        getArr.push(generateRndSymbol)
    }
    if(numberBox.checked){
        getArr.push(generateRndNum)
    }

    // make password

   

    for(let i=0; i<defaultVal; i++){
        let rndNum = getRndInteger(0,getArr.length)
        password += getArr[rndNum]();
    }

    //   display pass value 
    textPass.value = password;
    calStrenth();
    // after click reset count
    checkCount =0;
    
})



// -----------------------copy btn------------------------
let copyBtn = document.querySelector('.display-container-btn')
let copyMsg = document.querySelector('.Copy-msg')

async function copyContent(){

    try{
        await navigator.clipboard.writeText(textPass.value)
        copyMsg.style.opacity = 1;
    }

    catch(e){
        copyMsg.innerHTML = "failed";
        copyMsg.style.opacity = 1;
    }

    setTimeout(()=>{
        copyMsg.style.opacity = 0;
    },2000)
}

copyBtn.addEventListener('click',()=>{
    if(textPass.value){
        copyContent();
    }
})