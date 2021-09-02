import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILED,
    USER_ACTIVATION_SUCCESS,
    USER_ACTIVATION_FAILED,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    USER_AUTHENTICATED_SUCCESS,
    USER_AUTHENTICATED_FAILED,
   
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAILED
} from '../types'

const initialState = {
    register_success:null,
    login_success : null,
    isAuthenticated : null ,
    user : null,
    message : '',
    isAccountActivated: null,
    email_sent:null,
    password_changed:null,

 
}

const authReducer = (state = initialState,action)=>{
    const {type,payload,message} = action
    console.log(type);
    switch(type){
        case USER_REGISTER_SUCCESS :
            return{
                ...state,
                register_success:true
            }
        case USER_AUTHENTICATED_FAILED:
            return{
               ...state,
               isAuthenticated:false,      
            }
        case USER_AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated:true
            }
        case USER_ACTIVATION_SUCCESS:
            return{
                ...state,
                isAccountActivated:true,
                message:message
            }
        case USER_ACTIVATION_FAILED:
            return{
                ...state,
                isAccountActivated:false,
                message : message
            }
        case USER_LOGIN_SUCCESS:
            return{
               ...state,
               
              login_success:true
              
            }
        case USER_LOGIN_FAILED :
        case USER_LOGOUT_SUCCESS:
        case USER_REGISTER_FAILED:
           
            return{
                ...state,
                login_success:false,
                isAuthenticated : false,
                user : null,
                register_success:false,
                isAccountActivated:false
            }
        case USER_LOGOUT_FAILED:
            return{
                ...state
            }
        case USER_LOADED_SUCCESS :
            return{
                ...state,
                user : payload,
                isAuthenticated : true,
            }
        case USER_LOADED_FAILED :
            return{
                ...state,
                user : null,
                isAuthenticated : false,
            }
        case PASSWORD_RESET_SUCCESS:
            return{
                ...state,
                email_sent:true
            }
        case PASSWORD_RESET_FAILED:
            return{
                ...state,
                email_sent:false
            }
        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return{
                ...state,
                password_changed:true
            }
        case PASSWORD_RESET_CONFIRM_FAILED:
            return{
                ...state,
                password_changed:false
            }
        default:
            return{
                ...state,
            }
    }
}

export default authReducer