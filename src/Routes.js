import React, { Component } from 'react';
import { Redirect, BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Record from "./components/Record";
import ChooseYourOwnAdventure from "./components/ChooseYourOwnAdventure";
import AppliedRoute from "./components/AppliedRoute" ;
import TitleScreen from "./components/TitleScreen";
import App from "./App"

const SecretRoute = ({ component: Component, auth : auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("auth_token")
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/register',
                state: { from: props.location }
            }} />
    )} />
);

class Routes extends Component {
    render() {
        console.log("props este",this);
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <AppliedRoute path="/" exact component={Register} props={this.props.childProps}/>
                        <AppliedRoute path="/login" exact component={Login} props={this.props.childProps}/>
                        <AppliedRoute path="/register" exact component={Register} props={this.props.childProps}/>
                        <SecretRoute path="/record" exact component={Record} auth={this.props.childProps}/>
                        <SecretRoute path="/ChooseYourOwnAdventure" exact component={ChooseYourOwnAdventure} auth={this.props.childProps}/>
                        <SecretRoute path="/TitleScreen" exact component={App} auth={this.props.childProps}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Routes;