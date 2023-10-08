import React, { useEffect, useState } from 'react';
import '../css/home.css';
import {  Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import apifunctions from '../api/api';
import Swal from 'sweetalert2';
const HomePage = () => {
    const navigate = useNavigate();
    const [name,setName]=useState('')
    const cookie=new Cookies();
    useEffect(()=>{
        let token=cookie.get('userid')
        if(!token) return navigate('/login')
        else{
            const getdata=async()=>{
                var data=await apifunctions.getuser(token)
                console.log(data)
                setName(data.name);
            };
            getdata();
            
        }
    })

    const handleLogout=(e)=>{
        // e.preventDefault();
        try {
            console.log('hello')
            cookie.remove('userid');
            return navigate('/login');
        } catch (error) {
            return Swal.fire(
                error.message,
                'something went wrong',
                'error'
            )
        }
    }
    return (
        <div className="homepage">
            <header className="header">
                <h1 className='username'>Hello {name}</h1>
                <h2>Welcome to SkyGoal Education - Where Education Meets Future</h2>
                <p>Take charge of your future with our extensive search engine to avail all that you need to build a great career. </p>
                <a href="https://skygoal.education/" className="cta-button">Learn More</a>
            </header>
            
            <div className="container">
                <section id="learn-more" className="section">
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet lorem id justo faucibus hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p>
                </section>

                <section className="section">
                    <h2>Our Services</h2>
                    <p>We offer a wide range of services to support your educational technology needs.</p>
                    <ul>
                        <li>Online Courses</li>
                        <li>E-Learning Platforms</li>
                        <li>Student Management Systems</li>
                        <li>Interactive Learning Tools</li>
                    </ul>
                </section>
            </div>
            <div className='logout-div'>
                <button className='cta-button' onClick={handleLogout}>logout</button>
            </div>
            <footer className="footer">
                &copy; {new Date().getFullYear()} Ed-Tech Solutions. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
