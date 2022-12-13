//isLoggedIn=>
export const isLoggedIn =()=>{
    let data = localStorage.getItem("data");
    if(data !=null) return true;
    else return false;
    
    
}

//doLogin=> data=>set to localstorage

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
}

//doLogOut=> remove from localStorage
export const doLogOut=(next)=>{
    localStorage.removeItem("data");
    next();
}

//get current user
export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }else{
        return undefined;
    }

}