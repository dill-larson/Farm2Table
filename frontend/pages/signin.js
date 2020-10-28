import React /*,{useState, Component}*/ from "react";
import { Card, Jumbotron} from 'react-bootstrap';
import {useForm} from "react-hook-form";
import {Link} from 'react-router-dom';

export default function SignIn()
{
    const { register, handleSubmit, errors} = useForm();
	const onSubmit = data => console.log(data); 
	
    return(
        <div style={{backgroundColor: '#1ABC56', width: '100%', height: '100%'}}>
			<Jumbotron style={{marginBottom: "100px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
				<h1 className="text-main-brand text-center font-weight-bold display-2">Login</h1>
			</Jumbotron>
			<Card className="text-center" style={{width: '30rem', margin: 'auto'}}> 
				<form onSubmit={handleSubmit(onSubmit)} className="text-left">
					<h2> User login </h2>
					
					<p>Email address: <input name="email" ref={register({required: true })} /> 
					{errors.email && <span>This field is required</span>} </p>

					<p>Password: <input name="password" type="password" ref={register({required: true })} /> 
					{errors.password && <span>This field is required</span>} </p>
					<Link to={"signup"} className="nav-link" >First time on Farm2App?</Link>
					
					<input type="submit" style={{ width:'30rem', position: 'absolute'}} className="btn btn-primary" />
				</form>
			</Card> 
		</div>
		
		
    )
}