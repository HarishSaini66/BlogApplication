import { myAxois } from "./helper";

export const signUp=(user)=>{
    return myAxois.post('/api/v1/auth/register',user).then((response)=> response.data);
}


export const loginUser =(loginDetail)=>{
    return myAxois.post('/api/v1/auth/login',loginDetail).then((response)=>response.data);

}

export const getUser=(userId)=>{
    return myAxois.get(`/api/v1/users/${userId}`).then((response)=>response.data);
}



