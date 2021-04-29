import React from 'react'
import { Redirect } from 'react-router-dom'

const HomeComponent = () => {

    if (!localStorage.getItem('_id')) {
        console.log("User not Logged In");
        return (<Redirect to='/login' />)
    }

    return (
        <div>
            Home Component
        </div>
    )
}

export default HomeComponent
