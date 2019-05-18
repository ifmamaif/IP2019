import React from 'react'
import "../styles/Login.css";
import ajax from "../services/Auth"
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import strings from '../res/strings'
import {Redirect, BrowserRouter, Switch, Route} from 'react-router-dom';

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
        }
    }

    async componentDidMount() {
        // window.addEventListener("beforeunload", e => (e.returnValue = "Unsaved changes will be lost."));
        const data = await ajax.sotryAuth();
        console.log(data);

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

        return (
            <div id="background">
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
                            {strings.login.button}
                        </Button>
                    </div>
                </div>
                {/*<img src={require('../res/images/donorium.png')} alt="Logo" id="logo"/>*/}
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

export default Login;

