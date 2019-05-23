import React, {Component} from "react";
import Music from "./Music"
import backgroundMusic from '../story/sounds/spiritOfFreedom.mp3';
import Bird from "./Bird";
import Record from "./ChooseYourOwnAdventure";
import ajax from "../services/fetchChapters"
import fetchResources from "../services/fetchResources"

class TitleScreen extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        let token = localStorage.getItem('auth_token');
        let objToken = {
            "TFMAuthentication": token,
        };

        let chapter = {
            "chapter_ids": [1, 2],
        };
        if (token) {
            ajax.tfm_get_chapters(objToken, chapter).then((chapterInfo) => {
                if (chapterInfo != null && typeof (chapterInfo) !== "undefined") {
                    console.log("din backend am primit", chapterInfo);
                    fetchResources.fetchResources(chapterInfo.chapters[0]["cover_path"]).then((resource) => {
                        console.log("poza este", resource)
                    }).catch(error => {
                        console.log(error);
                    });
                    this.setState({
                        stories: chapterInfo.stories,
                    });
                    console.log("stories,", this.state.stories);
                } else {
                    console.log("ceva nu e bine, Tap; fara povesti azi")
                }
            }).catch(error => {
                console.log(error);
            });
        }
        // console.log("afisez state-ul TAAAAAAAAAAAAAP ",this.state)
    }

    render() {
        return (
            <div>
                <Bird/>
                <div>
                    <Music url={backgroundMusic}/>
                    <div id="title-screen-header">
                        <div id="logo">The story of IP</div>
                        <ul id="menu">
                            <li>
                                <span className="center-custom" onClick={this.props.beginStory}>Begin</span>
                            </li>
                            {/*<li>*/}
                            {/*<span onClick={props.toggleLoadMenu}>Continue</span>*/}
                            {/*</li>*/}
                            <li/>
                            {/*<span className="abracadabra">Say Abracadabra to start the adventure of your life !</span>*/}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }


}

export default TitleScreen;
// className="overlay" id="title-overlay"