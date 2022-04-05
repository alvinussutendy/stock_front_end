import React from 'react';
import Layout from "../components/layout";

const routes = [
	{
		path: '/',
		exact: true,
		name: 'dashboard',
		element: <Layout/>
	}
]

export default routes;