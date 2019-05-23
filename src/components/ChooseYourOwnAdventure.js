import React from 'react'
import "../styles/chooseYourOwnAdventure.css";
import ajax from "../services/fetchStory"
import TitleScreen from "../components/TitleScreen"
import Record from "../components/Record"
import {Redirect, BrowserRouter, Switch, Route, Link, withRouter} from 'react-router-dom';
import fetchResources from "../services/fetchResources"
import blobToImg from "../services/blobToImg"
import {FlippingCard, FlippingCardBack, FlippingCardFront} from "react-ui-cards"
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
            stories: null,
            uri : null
        };

    }

    async componentDidMount() {
        let token = localStorage.getItem('auth_token');
        let objToken = {
            "TFMAuthentication": token,
        };
        // console.log(objToken);
        if (token) {
            ajax.fetchStory(objToken).then((stories) => {
                if (stories != null && typeof (stories) !== "undefined") {
                    console.log("din backend am primit", stories)
                    fetchResources.fetchResources(stories.stories[0]["cover_path"]).then(async (resource) => {
                        console.log("poza este", resource);
                        blobToImg(resource).then(async(result)  =>{
                            // this.setState({
                            //     b64img : result,
                            // });
                            stories.stories[0]["cover_path"] = result;
                            this.setState({
                                stories: stories.stories,
                            });
                            console.log("stories,", this.state.stories);
                        });
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    console.log("ceva nu e bine, Tap; fara povesti azi")
                }
            }).catch(error => {
                console.log(error);
            });
        }
        console.log("afisez state-ul TAAAAAAAAAAAAAP ", this.state)

    }

    selectStory = (event) => {
        // this.props.history.replace("TitleScreen")
        this.props.history.push({
            pathname: '/TitleScreen',
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
                {stories && stories.map((story) => {
                    return (
                        <FlippingCard className="parent entire-card">
                            <FlippingCardBack className="parent">
                                <h1>{story.title}</h1>
                                {/*<Button variant="contained" className="select-button">*/}
                                {/*Select Adventure*/}
                                {/*</Button>*/}
                                <Button color="primary" variant="contained" className="select-button"
                                        onClick={this.selectStory}>
                                    Select Adventure
                                </Button>
                                <img className="card-back" src={story.cover_path} alt="imaginea mea"/>

                            </FlippingCardBack>
                            <FlippingCardFront className="parent">
                                <img className="card-front"
                                     src="https://cdn5.f-cdn.com/contestentries/342444/7309306/56b791c9efbd8_thumb900.jpg"
                                     alt="imaginea mea"/>
                            </FlippingCardFront>
                        </FlippingCard>);
                })}</div>);

    }
}


export default withRouter(ChooseYourOwnAdventure);

