import React, { useState } from 'react';

export default function useToken() {
	const getToken = () => {
    	const tokenString = localStorage.getItem('token');
    	const userToken = JSON.parse(tokenString);
    	return userToken
 	};

	const [token, setToken] = useState(getToken());

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