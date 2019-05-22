import React from 'react'
import "../styles/Login.css";
import Login from "../components/Login"
import ajax from "../services/register"
import Record from "../components/Record"
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import strings from '../res/strings'
import {Redirect, BrowserRouter, Switch, Route, Link, withRouter} from 'react-router-dom';

class Register extends React.Component {
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
        // window.addEventListener("beforeunload", e => (e.returnValue = "Unsaved changes will be lost."));
        // const data = await ajax.login();
        // console.log(data);

        // this.setState({
        //   ceva: da
        // })
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
        ajax.register(loginData).then((responseCode) => {
            debugger;
            if(responseCode ==  200 || responseCode == 201 )
            {
                this.setState({
                    showProgress : false,
                    isLogged : true,
                    errorMessage : ''
                });
                console.log("Inregistrat cu succes");
                // window.location.replace(Login);
                this.props.history.replace("Login")
            }
            else{
                console.log("Numele de utilizator trebuie sa fie unic");
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
            newValue = strings.register[target];
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

    goToLogin = () => {

        this.props.history.replace("Login")

    };

    render() {
        if (this.state.auth) {
            return <Redirect to="../calendar" />;
        }

        return (
            <div id="background">
                <div id="login">
                    <div>
                        <h3 className="loginTitle">{strings.register.title}</h3>
                        <p className="loginStory">
                            {strings.register.description}
                        </p>
                        <TextField
                            id="username"
                            style={styles.textfield}
                            error
                            label="Nume utilizator"
                            onChange={this.handleInputChange}
                            helperText={this.state.errorUsername}
                        />
                        <br/>
                        <TextField
                            id="password"
                            style={styles.textfield}
                            error
                            type="password"
                            label="Parola"
                            onChange={this.handleInputChange}
                            helperText={this.state.errorPassword}
                        />
                        <br/>
                        <Button id="loginButton" label="Submit" color="primary" variant="contained"
                                onClick={this.handleSubmit}>
                            {strings.register.button}
                        </Button>
                        <span id="my-span">Already have an account ?<a
                            onClick={this.goToLogin}><span id="promo">Log in</span>
                        </a></span>
                    </div>
                </div>
                {/*<Switch>*/}
            {/*<Redirect to='./login' />*/}
                {/*</Switch>*/}
                {/*<img src={require('../res/images/donorium.png')} alt="Logo" id="logo"/>*/}
                {/*Token-ul este : {this.state.auth_token}*/}
            </div>
        );
    }
}

//Style TextField component

const styles = {
    textfield: {
        width: '90%',
        color: 'red',
    }
};

export default withRouter(Register);

