import React, { Component } from "react";
import { auth } from "../components/firebase";
import { signOut } from "../services/user.service";
import { Redirect } from 'react-router-dom';

export default class SignOut extends Component {
	
	render(){
		auth.signOut();
		return <Redirect to="/" push={true} />;
	}
}