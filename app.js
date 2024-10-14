const base_url= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
window.addEventListener("load",()=>{
    updateExchangeRate();
});
for(let select of dropdown){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name=="to" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.appendChild(newOption);

    }
    select.addEventListener("change",(event)=>{
        changeFlag(event.target);
    }
    );
}
const changeFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newURL=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    element.parentElement.querySelector("img").src=newURL;

}
btn.addEventListener("click",  (event)=>{
    event.preventDefault();
    updateExchangeRate();
    
    
});
const updateExchangeRate=async()=>{
    let amount= document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval<1 || amtval===""){
        amtval=1;
        amount.value="1";
    }
    const url=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data=await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let exchange_rate=amtval*rate;
    msg.innerText=`${amtval} ${fromCurr.value} = ${exchange_rate} ${toCurr.value}`;

}