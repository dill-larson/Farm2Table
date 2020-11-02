import React /*,{useState, Component}*/ from "react";
import { Card, Jumbotron} from 'react-bootstrap';
import {useForm} from "react-hook-form";

//Image defined
//import farmland from '../images/dan-meyers-IQVFVH0ajag-unsplash.jpg';

export default function SignUp()
{
    const { register, handleSubmit, errors} = useForm();
    const onSubmit = data => console.log(data); 

    return(
		<div style={{backgroundColor: '#1ABC56', width: '100%', height: '100%'}}>
			<Jumbotron style={{marginBottom: "100px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
				<h1 className="text-main-brand text-center font-weight-bold display-2">Sign Up</h1>
			</Jumbotron>
			<Card className="text-center" style={{width: '30rem', margin: 'auto'}}> 
				<form onSubmit={handleSubmit(onSubmit)} className="text-left">
					<h2> New users sign up </h2>
					<p> User name: <input name="username" ref={register({required: true})} /> 
					{errors.username && <span>This field is required</span>}</p>
					
					<p> Email address: <input name="email" ref={register({required: true })} /> 
					{errors.email && <span>This field is required</span>} </p>

					<p> Role: <select name="role" ref={register}> 
						<option value="consumer">Consumer</option>
						<option value="farmer">Farmer</option>
					</select></p>

					<p> Password: <input name="password" type="password" ref={register({required: true })} /> 
					{errors.password && <span>This field is required</span>} </p>
					<input type="submit" style={{ width:'30rem', position: 'absolute'}} className="btn btn-primary" />
				</form>
			</Card> 
		</div>
    )
}


//REFERENCE code
/*
Getting started on react-hook-form 
https://react-hook-form.com/get-started

https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
*/