import React, {Component} from "react";
import Music from "./Music"
import backgroundMusic from '../story/sounds/spiritOfFreedom.mp3';
import Bird from "./Bird";
import Record from "./ChooseYourOwnAdventure";
import ajax from "../services/fetchChapters"
import fetchResources from "../services/fetchResources"
import blobToImg from "../services/blobToImg";

var frontendChapter = null;
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

        // let chapter = {
        //     "chapter_ids": [1],
        // };
        // if (token) {
        //     ajax.tfm_get_chapters(objToken, chapter).then((chapterInfo) => {
        //         if (chapterInfo != null && typeof (chapterInfo) !== "undefined") {
        //             console.log("din backend am primit", chapterInfo);
        //             // debugger;
        //             let firstChapter = chapterInfo.chapters[0];
        //             fetchResources.fetchResources(firstChapter["cover_path"]).then((resource) => {
        //
        //                 console.log("RESOURCE", resource);
        //                 blobToImg(resource).then(async(result)  =>{
        //                     // let frontendChapter  = story[0];
        //                     let frontendChapter = {
        //                         "text" : firstChapter.setting,
        //                         "bg" : result,
        //                         bgTransition: "scene-change",
        //                     };
        //                     console.log(" !!!! frontendChapter  ", frontendChapter);
        //
        //                     // story = [...story, frontendChapter];
        //                 });
        //             }).catch(error => {
        //                 console.log(error);
        //             });
        //             this.setState({
        //                 stories: chapterInfo.stories,
        //             });
        //             console.log("stories,", this.state.stories);
        //         } else {
        //             console.log("ceva nu e bine, Tap; fara povesti azi")
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //     });
        // }
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