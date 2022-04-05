import React, { useState } from 'react';

export default function useToken() {
  //method for get token from local storage
	const getToken = () => {
    	const tokenString = localStorage.getItem('token');
    	const userToken = JSON.parse(tokenString);
    	return userToken
 	};

	const [token, setToken] = useState(getToken()); //state for the token, is exists or not

//method for save token into local storage
	const saveToken = userToken => {
    if(userToken){
      localStorage.setItem('token', JSON.stringify(userToken));
    }
    else{
      localStorage.removeItem('token');
    }
  	setToken(userToken);
	};

	return {
		setToken: saveToken,
		token
	}
}