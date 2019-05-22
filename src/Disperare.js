import React from 'react'
import Register from './components/Register'
import {Router} from 'react-router-dom';
import Routes from "./Routes"

import history from './history';

class Disperare extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
        }}

    userHasAuthenticated = (authenticated) =>
    {
        this.setState({isAuthenticated:authenticated});
    };

        render() {
            const childProps =
                {
                    isAuthenticated: this.state.isAuthenticated,
                    userHasAuthenticated: this.userHasAuthenticated
                };
            return (
                <Routes childProps={childProps}/>
            );
    }
}



export default Disperare;

