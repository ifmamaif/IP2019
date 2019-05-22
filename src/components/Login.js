import React from 'react'
import "../styles/Login.css";
import ajax from "../services/Auth"
import Record from "../components/Record"
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Music from "../components/Music"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import strings from '../res/strings'
import backgroundMusic from '../story/sounds/bedtime.mp3';
import {Redirect, BrowserRouter, Switch, Route,Link,withRouter} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameValid: false,
            passwordValid: false,
            errorUsername: '',
            errorPassword: '',
            auth: false,
            auth_token :''
        }
    }

    async componentDidMount() {
        //DOM load event
        window.addEventListener("DOMContentLoaded", () => {

            const spotlight = document.querySelector('.spotlight');

            let spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.85) 200px)';

            window.addEventListener('mousemove', e => updateSpotlight(e));

            window.addEventListener('mousedown', e => {

                spotlightSize = 'transparent 130px, rgba(0, 0, 0, 0.95) 150px)';

                updateSpotlight(e);

            });

            window.addEventListener('mouseup', e => {

                spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.85) 200px)';

                updateSpotlight(e);

            });

            function updateSpotlight(e) {

                spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize}`;

            }
        });
    }


    //Tests if username and password match and redirects to the calendar page
    handleSubmit = (event) => {
        // event.preventDefault();
        // console.log("this.validate() : ", this.validate());
        // console.log("this.props",this.props);
        // console.log("this.props.childProps",this.props.childProps);
        // this.props.userHasAuthenticated(true);
        // if(this.validate()) {
        //     this.setState({
        //         auth: true
        //     });
        // }
        //Call the backend api and check if username and password match

        let {username,password} = this.state;
        console.log(this.state.showProgress);

        let loginData = {password};
        loginData["user_name"] = username;
        ajax.login(loginData).then((data) => {
            console.log("data este ",data["token"])
            var token = data["token"];
            if(data.hasOwnProperty("token"))
            {
                this.setState({
                    showProgress : false,
                    auth_token : token,
                    isLogged : true,
                    auth:true,
                    errorMessage : ''
                });
                window.localStorage.setItem('auth_token', token);
                console.log("ne mutam in Record")
                this.props.history.replace('ChooseYourOwnAdventure');
            }
            else{
                this.setState({
                    showProgress : false,
                    isLogged : false,
                    errorMessage : 'Username or password invalid'
                })
            }
        }).catch(error => {
            console.log(error);
        });
console.log("afisez state-ul ",this.state)
    };
    check = (value) => {
        if (value === '' || value === null || typeof(value) === undefined)
            return false;

        return true;

    }
    setError = (value, target) => {
        let newValue = null;
        console.log(target);
        if (value === false)
            newValue = strings.login[target];
        else
            newValue = '';
        this.setState(() => ({
            [target]: newValue,
        }));
    };

    validate = () => {
        let usernameCheck = this.check(this.state.username);
        let passwordCheck = this.check(this.state.password);
        this.setState(() => ({
            usernameValid: usernameCheck,
            passwordValid: passwordCheck,
        }));
        this.setError(usernameCheck, 'errorUsername');
        this.setError(passwordCheck, 'errorPassword');
        return (this.state.usernameValid && this.state.passwordValid);
    };

    //Sets state for username and password ( after a key is pressed )
    handleInputChange = (event) => {
        this.setState({
                [event.target.id]: event.target.value,
                error: event.target.value,
            }
        )
    };

    render() {
        if (this.state.auth) {
            return <Redirect to="../calendar" />;
        }
        let {classes} = styles;
        return (
            <div id="background " className="spotlight">
                <Music id="music" url={backgroundMusic}/>
                <div id="login">
                    <div>
                        <h3 className="loginTitle">{strings.login.title}</h3>
                        <p className="loginStory">
                            {strings.login.description}
                        </p>
                        <TextField
                            id="username"
                            style={styles.textfield}
                            error
                            label="Username"
                            onChange={this.handleInputChange}
                            helperText={this.state.errorUsername}
                        />
                        <br/>
                        <TextField
                            id="password"
                            style={styles.textfield}
                            error
                            type="password"
                            label="Password"
                            onChange={this.handleInputChange}
                            helperText={this.state.errorPassword}
                        />
                        <br/>
                        <Button id="loginButton" label="Submit" color="primary" variant="contained"
                                onClick={this.handleSubmit}>
                            {strings.login.button}
                        </Button>
                    </div>
                </div>
                {/*<img src={require('../res/images/donorium.png')} alt="Logo" id="logo"/>*/}
                {/*Token-ul este : {this.state.auth_token}*/}
                {/*<div className="spotlight"/>*/}
            </div>
        );
    }
}

//Style TextField component
const styles = theme => ({
    multilineColor:{
        color:'red'
    },
    textfield: {
        width: '90%',
        color:"white !important"}
});
//
// const styles = {
//     textfield: {
//         width: '90%',
//         color:"white !important"
//     }
// };

export default withRouter(Login);

