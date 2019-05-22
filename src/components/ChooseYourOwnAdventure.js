import React from 'react'
import "../styles/chooseYourOwnAdventure.css";
import ajax from "../services/fetchStory"
import TitleScreen from "../components/TitleScreen"
import Record from"../components/Record"
import {Redirect, BrowserRouter, Switch, Route, Link, withRouter} from 'react-router-dom';


import {FlippingCard, FlippingCardBack,FlippingCardFront} from "react-ui-cards"
import Button from "@material-ui/core/Button";

const styles = {
    card: {
        maxWidth: "200px !important",
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

class ChooseYourOwnAdventure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories : [{
                "title" : "Povestea celor 3 purcelusi",
                "img" : "https://static1.squarespace.com/static/53abe338e4b0d980731bf5b2/t/573478e69f7266fafb5bc9c5/1463056628073/"
            },
                {
                    "title" : "O lume disparuta",
                    "img" : "https://thegrovela.com/wp-content/uploads/2018/06/GAF_JurassicPark_900x600.png"
                },
                {
                    "title" : "Povestea celor 3 purcelusi",
                    "img" : "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2018/06/kajhlfy4897867-624x351.jpg"
                },],
        }
    }

    async componentDidMount() {

        let token = localStorage.getItem('auth_token');
        let objToken = {
            "auth_token" : token,
        };
        if(token){
            ajax.fetchStory(objToken).then((stories) => {
                if(stories !=null && typeof (stories) !== "undefined")
                {
                   // this.setState({
                   //     stories
                   // });
                    console.log("stories,",this.state.stories);
                }
                else{
                    console.log("ceva nu e bine, Tap; fara povesti azi")
                }
            }).catch(error => {
                console.log(error);
            });
            console.log("afisez state-ul ",this.state)
        }

    }


    selectStory = (event) => {
        // this.props.history.replace("TitleScreen")
        this.props.history.push({
            pathname: '/TitleScreen',
            search: '?query=abc',
            state: "test"
        })
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
        let {stories} = this.state;
        console.log(stories);
        return (
            <div className="parent container">
        {stories.map((story) => {
            return (
                <FlippingCard className="parent entire-card">
                    <FlippingCardBack className="parent">
                        <h1>{story.title}</h1>
                        {/*<Button variant="contained" className="select-button">*/}
                            {/*Select Adventure*/}
                        {/*</Button>*/}
                        <Button color="primary" variant="contained" className="select-button"   onClick={this.selectStory}>
                            Select Adventure
                        </Button>
                        <img className="card-back" src={story.img} alt="imaginea mea" />

                    </FlippingCardBack>
                    <FlippingCardFront className="parent">
                        <img className="card-front" src="https://cdn5.f-cdn.com/contestentries/342444/7309306/56b791c9efbd8_thumb900.jpg" alt="imaginea mea"/>
                    </FlippingCardFront>
                </FlippingCard>);})}</div>);

    }
}



export default withRouter(ChooseYourOwnAdventure);

