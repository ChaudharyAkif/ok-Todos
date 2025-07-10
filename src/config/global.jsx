
import { message } from "antd"


window.getRandowId = ()=> Math.random().toString(36).slice(2)+ Math.random().toString(36).slice(2)

const RegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/;

window.isEmail = email => RegexPattern.test(email)
window.MessageAlert = (text,type) =>{


    switch(type){
        case "success" : message.success(text) ; break;
        case "error" : message.error(text) ; break;
        case "warning" : message.warning(text) ; break;
        case "Info" : message.Info(text) ; break;
        default  : message.info(text) 
    }
}