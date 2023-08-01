let Init={
    Contract:null,
    Metamask:null
}
let Reducer=(State=Init,Action)=>{
    switch(Action?.type){
        case "SetContract":
            Init={...Init,Contract:Action?.payload}
            return {...Init,Contract:Action?.payload}
        case "SetMetamask":
            Init={...Init,Metamask:Action?.payload}
            return {...Init,Metamask:Action?.payload}
        default:
            return State
    }
}
export default Reducer