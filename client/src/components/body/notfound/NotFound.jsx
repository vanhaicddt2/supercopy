import React from 'react';
import azLogo from '../../../units/img/logo_full.png';
import './notFound.css';

function NotFound() {
    return (
    <div className='not_found'>
        <div className='not_found-content'>
            <div className='not_found-content_title1'>404</div>
            <div className='not_found-content_title2'>PAGE NOT FOUND</div>
            <div>---</div>
            <div className='logo' style={{ width:'100%' }}>
                <img src={azLogo} alt='logo' width={200}/>
            </div>
            <button className='btn btn-primary p-3 mt-3 mb-3'
                onClick={()=> window.open("https://azumayavietnam.com/","_self")}
            >Home page Azumaya Viet Nam</button>
        </div>
    </div>)
}

export default NotFound;
