import {
    LOGIN,
    REGISTER,
   
} from '../constants';

export const userLogin = ( user ) => {
    return async dispatch => {
        const url = "http://localhost:4001/auth/login";
        const response = await fetch(url,{method:'POST',mode:'cors',
        headers:{"Content-Type": "application/json"},
          body: JSON.stringify({
            email:user.email,
            password:user.password
        })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    localStorage.setItem('sellerId', data.sellerId)
   var result=data
    dispatch({
        type:LOGIN, 
        val:{
        isLoggedin:result.success,
        email:result.email
    }
    })    
}
}

export const userRegistration = ( user ) => {
    console.log(user);
    return async dispatch => {
        const url = "http://localhost:4001/auth/signup";
        const response = await fetch(url,{method:'POST',mode:'cors',
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({user})
    });
    const result = await response.json();
    console.log(result);
    dispatch({
        type:REGISTER, val:{result}
    })
}
}


