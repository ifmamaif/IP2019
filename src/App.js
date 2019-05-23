// Dependencies
import React, {Component} from "react";
import Sound from "react-sound";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Fullscreen from "react-full-screen";
import WheelReact from "wheel-react";
// API
// import temp from "./story/story";
import choices from "./story/choices";
// import ajax from "./services/Auth"
// Components
import TitleScreen from "./components/TitleScreen";
import Backlog from "./components/Backlog";
import ChoiceMenu from "./components/ChoiceMenu";
import ConfigMenu from "./components/ConfigMenu";
import RenderFrame from "./components/RenderFrame";
import MenuButtons from "./components/MenuButtons";
import SaveLoadMenu from "./components/SaveLoadMenu";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faCoffee, faVolumeUp, faVolumeMute} from '@fortawesome/free-solid-svg-icons'
import Bird from "./components/Bird";
// CSS
import "./styles/config.css";
import "./styles/container.css";
import "./styles/backlog.css";
import "./styles/choicesoverlay.css";
import "./styles/effects.css";
import "./styles/menubuttons.css";
import "./styles/saveloadmenu.css";
import "./styles/sprites.css";
import "./styles/textbox.css";
import "./styles/titlescreen.css";
import "./styles/transitions.css";
import Record from "./components/ChooseYourOwnAdventure";
import Artyom from "artyom.js";

import ajax from "./services/sendResponse"
import tfm_get_chapters from "./services/fetchChapters"
import fetchResources from "./services/fetchResources";
import blobToImg from "./services/blobToImg";

const bn = require("./story/sprites/block-neutral.png");

var story = {};


// setInterval = (() => {
//   let obj = "text: \"Pentru ca asa a zis TAP! \"" + Math.random();
//   story = [...story,obj];
//   console.log("noua poveste",story)
// },3000);

const INITIAL_STATE = {
    bgmVolume: 80,
    soundEffectVolume: 90,
    voiceVolume: 100,
    font: "Trebuchet MS",
    isFull: false,
    choicesStore: {},
    index: 0,
    stateHistory: [],
    choicesHistory: [],
    choicesIndexHistory: [],
    indexHistory: [],
    choicesExist: false,
    configMenuShown: false,
    titleScreenShown: true,
    frameIsRendering: false,
    backlogShown: false,
    textBoxShown: true,
    saveMenuShown: false,
    loadMenuShown: false,
    isSkipping: false
};

library.add(fab, faCheckSquare, faVolumeUp, faCoffee, faVolumeMute);


class App extends Component {
    constructor() {
        super();
        this.setFrame = this.setFrame.bind(this);
        this.toggleBacklog = this.toggleBacklog.bind(this);
        this.state = INITIAL_STATE;

        WheelReact.config({
            down: () => {
                if (
                    !this.state.backlogShown &&
                    !this.state.choicesExist &&
                    !this.state.loadMenuShown &&
                    !this.state.saveMenuShown &&
                    !this.state.titleScreenShown &&
                    !this.state.configMenuShown
                ) {
                    this.toggleBacklog();
                }
            }
        });
    }


    componentDidMount() {

        let token = localStorage.getItem('auth_token');
        let objToken = {
            "TFMAuthentication": token,
        };
        let chapter = {
            "chapter_ids": [1],
        };
        if (token) {
            var frontendChapter = {};
            tfm_get_chapters.tfm_get_chapters(objToken, chapter).then((chapterInfo) => {
                if (chapterInfo != null && typeof (chapterInfo) !== "undefined") {
                    console.log("din backend am primit", chapterInfo);
                    // debugger;
                    let firstChapter = chapterInfo.chapters[0];
                    fetchResources.fetchResources(firstChapter["cover_path"]).then((resource) => {

                        console.log("RESOURCE", resource);
                        blobToImg(resource).then(async(result)  =>{
                            // let frontendChapter  = story[0];
                             frontendChapter["text"] = firstChapter.setting;
                             frontendChapter["bg"] = result;
                             frontendChapter["speaker"] = "Legendary IP Hero";
                             frontendChapter["bgTransition"] =  "scene-change";

                            // story = [...story, frontendChapter];
                        });
                    }).catch(error => {
                        console.log(error);
                    });

                    fetchResources.fetchResources(firstChapter["character_path"]).then((resource) => {

                        blobToImg(resource).then(async(result)  =>{

                            frontendChapter["bn"] = result;
                            story = [...story, frontendChapter];
                            console.log(" !!!! first  ", frontendChapter);
                        });
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



        const artyom = new Artyom();

// This function activates artyom and will listen and execute only 1 command (for http connections)
        function startOneCommandArtyom() {
            artyom.fatality();// use this to stop any of

            setTimeout(function () {// if you use artyom.fatality , wait 250 ms to initialize again.
                artyom.initialize({
                    lang: "en-GB",// A lot of languages are supported. Read the docs !
                    continuous: false,// recognize 1 command and stop listening !
                    listen: true, // Start recognizing
                    debug: true, // Show everything in the console
                    speed: 1 // talk normally
                }).then(function () {
                    console.log("Ready to work !");
                });
            }, 250);
        }

// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
        function startContinuousArtyom() {
            artyom.fatality();// use this to stop any of

            setTimeout(function () {// if you use artyom.fatality , wait 250 ms to initialize again.
                artyom.initialize({
                    lang: "en-GB",// A lot of languages are supported. Read the docs !
                    continuous: true,// Artyom will listen forever
                    listen: true, // Start recognizing
                    debug: true, // Show everything in the console
                    speed: 1 // talk normally
                }).then(function () {
                    console.log("Ready to work !");
                });
            }, 250);
        }

        var self = this;
        var UserDictation = artyom.newDictation({
            continuous: true, // Enable continuous if HTTPS connection
            onResult: function (text) {
                // Do something with the text
                console.log(text);
                // console.log("this",self)
                if(text){
                    self.setState({
                        speechToText: text,
                    })
                }
            },
            onStart: function () {
                console.log("Dictation started by the user");
            },
            onEnd: function () {
                alert("Dictation stopped by the user");
            }
        });

        // fetch data for the new chapter
        setInterval(() => {
            console.log("ce a vrut sa zica este :", this.state.speechToText);
            let token = localStorage.getItem('auth_token');
            let objToken = {
                "TFMAuthentication": token,
            };
            let chapter = 5;

            if(this.state.speechToText !== null && this.state.speechToText !== "undefiend" && this.state.speechToText !== ""){
                ajax.tfm_send_chapter_response(objToken,chapter,this.state.speechToText).then((newChapterId) => {
                 console.log("noul capitol e ", newChapterId);
                 let chapter = {
                     "chapter_ids" : [newChapterId["next_chapter_id"]]
                 }
                 this.setState({
                     speechToText : ""
                 });

                    tfm_get_chapters.tfm_get_chapters(objToken, chapter).then((chapterInfo) => {
                        if (chapterInfo != null && typeof (chapterInfo) !== "undefined") {
                            console.log("din backend am primit", chapterInfo);
                            let selectedChapter = chapterInfo.chapters[0];
                            fetchResources.fetchResources(selectedChapter["cover_path"]).then((resource) => {
                                console.log("poza este", resource);
                                blobToImg(resource).then(async(result)  =>{
                                    // this.setState({
                                    //     b64img : result,
                                    // });

                                    let frontendChapter  = story[0];
                                    frontendChapter = {
                                        "text" : selectedChapter.setting,
                                        "bg" : result,
                                        bgTransition: "scene-change",
                                    };
                                    console.log("frontendChapter  ", frontendChapter);
                                    story = [...story, frontendChapter];




                                   console.log("result",result);
                                });

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

                }).catch(error => {
                    console.log(error);
                });
                console.log("afisez state-ul ",this.state)
            }},8000);

        setInterval(() => {
            let myStr = "Pentru ca asa a zis TAP!" + Math.random();
            let obj = story[9];
            obj["text"] = myStr;
            story = [...story, obj];
            // console.log("noua poveste",story)

        }, 2000000);

        UserDictation.start();

    }

    setFrameFromChoice(choice, routeBegins) {
        for (let i = 0; i < story.length; i++) {
            if (routeBegins === story[i].routeBegins) {
                this.setFrame(i);
            }
        }

        let choicesStore = {...this.state.choicesStore};
        choicesStore[choice]++ || (choicesStore[choice] = 1);
        this.setState({choicesStore});
    }

    setNextFrame() {
        const currentIndex = this.state.index;
        const jumpToBecauseStore = story[currentIndex].jumpToBecauseStore;
        if (story[currentIndex].jumpToBecauseStore) {
            for (let i = 0; i < story.length; i++) {
                if (story[i].receiveJumpBecauseStore) {
                    if (
                        jumpToBecauseStore === story[i].receiveJumpBecauseStore[0] &&
                        this.state.choicesStore[jumpToBecauseStore] === story[i].receiveJumpBecauseStore[1]
                    ) {
                        this.setFrame(i);
                        return;
                    }
                }
            }
        }
        if (story[currentIndex].jumpTo) {
            if (story[currentIndex].jumpTo === "title-screen") {
                this.setState(INITIAL_STATE);
                return;
            }
            for (let i = 0; i < story.length; i++) {
                if (story[currentIndex].jumpTo === story[i].receiveJump) {
                    this.setFrame(i);
                    return;
                }
            }
        }
        if (
            !this.state.choicesExist &&
            !this.state.loadMenuShown &&
            !this.state.saveMenuShown &&
            !this.state.titleScreenShown &&
            !this.state.backlogShown &&
            !this.state.configMenuShown
        ) {
            this.setFrame(currentIndex + 1);
        }
    }

    setFrame(index) {
        // Makes sure the index is within the story array
        if (index >= story.length) {
            index = story.length - 1;
        } else if (index <= -1) {
            index = 0;
        }
        debugger;
        // Updates story with new index
        this.setState({
            index: index,
            bg: story[index].bg,
            bgm: story[index].bgm,
            choicesExist: story[index].choicesExist,
            soundEffect: story[index].soundEffect,
            speaker: story[index].speaker,
            sprite: story[index].sprite,
            spriteEffect: story[index].spriteEffect,
            spriteTransition: story[index].spriteTransition,
            spriteLeft: story[index].spriteLeft,
            spriteLeftEffect: story[index].spriteLeftEffect,
            spriteLeftTransition: story[index].spriteLeftTransition,
            spriteRight: story[index].spriteRight,
            spriteRightEffect: story[index].spriteRightEffect,
            spriteRightTransition: story[index].spriteRightTransition,
            text: story[index].text,
            bgTransition: story[index].bgTransition,
            voice: story[index].voice
        });
    }

    renderFrame() {
        return (
            <RenderFrame
                font={this.state.font}
                setNextFrame={this.setNextFrame.bind(this)}
                bg={this.state.bg}
                sprite={this.state.sprite}
                spriteEffect={this.state.spriteEffect}
                spriteTransition={this.state.spriteTransition}
                spriteLeft={this.state.spriteLeft}
                spriteLeftEffect={this.state.spriteLeftEffect}
                spriteLeftTransition={this.state.spriteLeftTransition}
                spriteRight={this.state.spriteRight}
                spriteRightEffect={this.state.spriteRightEffect}
                spriteRightTransition={this.state.spriteRightTransition}
                speaker={this.state.speaker}
                text={this.state.text}
                textBoxShown={this.state.textBoxShown}
                bgTransition={this.state.bgTransition}
            />
        );
    }

    setChoice(choicesIndex) {
        // Makes sure the index is within the Choices array
        if (choicesIndex >= choices.length) {
            choicesIndex = choices.length - 1;
        } else if (choicesIndex <= -1) {
            choicesIndex = 0;
        }

        this.setState({
            choicesIndex: choicesIndex,
            choiceOptions: choices[choicesIndex].choices
        });
    }

    handleChoiceSelected(event) {
        // this.stopSkip();
        this.setFrameFromChoice(event.currentTarget.name, event.currentTarget.alt);
        let nextIndex = 0;
        if (event.currentTarget.id) {
            this.setState({choicesStore: {}});
        }
        if (event.currentTarget.placeholder) {
            nextIndex = parseInt(event.currentTarget.placeholder, 10);
        } else {
            nextIndex = this.state.choicesIndex + 1;
        }
        this.setChoice(nextIndex);
    }

    renderChoiceMenu() {
        return (
            <ChoiceMenu choiceOptions={this.state.choiceOptions}
                        onConClickhoiceSelected={this.handleChoiceSelected.bind(this)}/>
        );
    }

    toggleConfigMenu() {
        if (this.state.saveMenuShown) {
            this.setState({saveMenuShown: false});
        }
        if (this.state.loadMenuShown) {
            this.setState({loadMenuShown: false});
        }
        if (this.state.backlogShown) {
            this.setState({backlogShown: false});
        }
        this.setState(prevState => ({
            configMenuShown: !prevState.configMenuShown
        }));
    }

    toggleBacklog() {
        if (this.state.configMenuShown) {
            this.setState({configMenuShown: false});
        }
        if (this.state.saveMenuShown) {
            this.setState({saveMenuShown: false});
        }
        if (this.state.loadMenuShown) {
            this.setState({loadMenuShown: false});
        }
        this.setState(prevState => ({
            backlogShown: !prevState.backlogShown
        }));
    }

    toggleTextBox() {
        this.setState(prevState => ({
            textBoxShown: !prevState.textBoxShown
        }));
    }

    // toggleSaveMenu() {
    //   if (this.state.configMenuShown) {
    //     this.setState({ configMenuShown: false });
    //   }
    //   if (this.state.loadMenuShown) {
    //     this.setState({ loadMenuShown: false });
    //   }
    //   if (this.state.backlogShown) {
    //     this.setState({ backlogShown: false });
    //   }
    //   this.setState(prevState => ({
    //     saveMenuShown: !prevState.saveMenuShown
    //   }));
    // }
    //
    // toggleLoadMenu() {
    //   if (this.state.configMenuShown) {
    //     this.setState({ configMenuShown: false });
    //   }
    //   if (this.state.saveMenuShown) {
    //     this.setState({ saveMenuShown: false });
    //   }
    //   if (this.state.backlogShown) {
    //     this.setState({ backlogShown: false });
    //   }
    //   this.setState(prevState => ({
    //     loadMenuShown: !prevState.loadMenuShown
    //   }));
    // }

    // startSkip() {
    //   const intervalTime = prompt("How many milliseconds per frame would you like?", "75");
    //   if (intervalTime > 0) {
    //     this.setState({
    //       isSkipping: true
    //     });
    //     this.textSkipper = setInterval(this.setNextFrame.bind(this), intervalTime);
    //   }
    // }
    //
    // stopSkip() {
    //   clearInterval(this.textSkipper);
    //   this.setState({
    //     isSkipping: false
    //   });
    // }
    //
    // saveSlot(number) {
    //   var d = new Date();
    //   var datestring =
    //     ("0" + (d.getMonth() + 1)).slice(-2) +
    //     "-" +
    //     ("0" + d.getDate()).slice(-2) +
    //     "-" +
    //     d.getFullYear() +
    //     " " +
    //     ("0" + d.getHours()).slice(-2) +
    //     ":" +
    //     ("0" + d.getMinutes()).slice(-2);
    //
    //   localStorage.setItem("time" + number, datestring); // saves the current time to the save slot
    //   localStorage.setItem(number, JSON.stringify(this.state, (k, v) => (v === undefined ? null : v)));
    //   this.setState(this.state);
    // }
    //
    // loadSlot(number) {
    //   this.setState(JSON.parse(localStorage.getItem(number)));
    //   this.setState({
    //     saveMenuShown: false
    //   }); // save menu to false and not load because save is true when saving
    // }

    beginStory() {
        // this.stopSkip();
        this.setState({
            titleScreenShown: false,
            frameIsRendering: true
        });
        this.setFrame(0);
        this.setState({
            choicesIndex: 0,
            choiceOptions: choices[0].choices
        });
    }

    titleScreen = () => {

        return <TitleScreen beginStory={this.beginStory.bind(this)} title={this.props.location.state}/>; //title= {this.props.location.state.detail }

        // toggleLoadMenu={this.toggleLoadMenu.bind(this)}
    }

    configMenu() {
        return (
            <ConfigMenu
                changeFont={newFont => this.setState({font: newFont.label})}
                font={this.state.font}
                bgmVolume={this.state.bgmVolume}
                soundEffectVolume={this.state.soundEffectVolume}
                voiceVolume={this.state.voiceVolume}
                bgmVolumeChange={value => this.setState({bgmVolume: value})}
                soundEffectVolumeChange={value => this.setState({soundEffectVolume: value})}
                voiceVolumeChange={value => this.setState({voiceVolume: value})}
                toggleConfigMenu={this.toggleConfigMenu.bind(this)}
            />
        );
    }

    saveMenu() {
        return (
            <SaveLoadMenu
                choicesExist={this.state.choicesExist}
                choiceOptions={this.state.choiceOptions}
                confirmationMessage="Overwrite save?"
                currentTime={this.state.currentTime}
                menuType="Save"
                executeSlot={this.saveSlot.bind(this)}
                toggleMenu={this.toggleSaveMenu.bind(this)}
                speaker={this.state.speaker}
                text={this.state.text}
                textBoxShown={this.state.textBoxShown}
            />
        );
    }

    loadMenu() {
        return (
            <SaveLoadMenu
                choicesExist={this.state.choicesExist}
                choiceOptions={this.state.choiceOptions}
                confirmationMessage="Load save?"
                currentTime={this.state.currentTime}
                menuType="Load"
                executeSlot={this.loadSlot.bind(this)}
                toggleMenu={this.toggleLoadMenu.bind(this)}
                speaker={this.state.speaker}
                text={this.state.text}
                textBoxShown={this.state.textBoxShown}
            />
        );
    }

    renderMenuButtons() {
        return (
            <MenuButtons
                menuButtonsShown={this.state.menuButtonsShown}
                setNextFrame={this.setNextFrame.bind(this)}
                // toggleSaveMenu={this.toggleSaveMenu.bind(this)}
                // toggleLoadMenu={this.toggleLoadMenu.bind(this)}
                // saveSlot={this.saveSlot.bind(this)}
                // loadSlot={this.loadSlot.bind(this)}
                // saveMenuShown={this.state.saveMenuShown}
                // loadMenuShown={this.state.loadMenuShown}
                toggleConfigMenu={this.toggleConfigMenu.bind(this)}
                configMenuShown={this.state.configMenuShown}
                toggleBacklog={this.toggleBacklog.bind(this)}
                toggleTextBox={this.toggleTextBox.bind(this)}
                toggleFullscreen={() => this.setState({isFull: true})}
                textBoxShown={this.state.textBoxShown}
                backlogShown={this.state.backlogShown}
                // startSkip={this.startSkip.bind(this)}
                // stopSkip={this.stopSkip.bind(this)}
                // isSkipping={this.state.isSkipping}
            />
        );
    }

    backlog() {
        return (
            <Backlog
                index={this.state.index}
                setFrame={this.setFrame}
                setChoice={this.setChoice.bind(this)}
                toggleBacklog={this.toggleBacklog}
                choicesStore={this.state.choicesStore}
                choicesHistory={this.state.choicesHistory}
                choicesIndexHistory={this.state.choicesIndexHistory}
                indexHistory={this.state.indexHistory}
                setChoicesHistory={choicesHistory => this.setState({choicesHistory: choicesHistory})}
                setIndexHistory={indexHistory => this.setState({indexHistory: indexHistory})}
                setChoicesStore={choicesStore => this.setState({choicesStore: choicesStore})}
            />
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.index < this.state.index) {
            this.setState({
                choicesHistory: [...this.state.choicesHistory, prevState.choicesStore],
                choicesIndexHistory: [...this.state.choicesIndexHistory, prevState.choicesIndex],
                indexHistory: [...this.state.indexHistory, prevState.index]
            });
        }
    }

    playBGM() {
        return <Sound url={this.state.bgm} volume={this.state.bgmVolume} playStatus={Sound.status.PLAYING}
                      loop={true}/>;
    }

    playSoundEffect() {
        return (
            <Sound url={this.state.soundEffect} volume={this.state.soundEffectVolume}
                   playStatus={Sound.status.PLAYING}/>
        );
    }

    playVoice() {
        return <Sound url={this.state.voice} volume={this.state.voiceVolume} playStatus={Sound.status.PLAYING}/>;
    }

    render() {
        let zoomMultiplier = 0;
        if (window.innerWidth / window.innerHeight <= 1280 / 720) {
            zoomMultiplier = window.innerWidth / 1280;
        } else {
            zoomMultiplier = window.innerHeight / 720;
        }

        return (
            <div {...WheelReact.events} style={this.state.isFull ? {zoom: zoomMultiplier} : null}>
                <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({isFull})}>
                    <ReactCSSTransitionGroup
                        className="container"
                        component="div"
                        transitionName="menu"
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}
                    >
                        {/*<Bird/>*/}
                        {/*<Record/>*/}
                        {this.state.titleScreenShown ? this.titleScreen() : null}
                        {this.state.frameIsRendering ? this.renderFrame() : null}
                        {/* GUI menu buttons */}
                        {this.state.configMenuShown ? this.configMenu() : null}
                        {this.state.saveMenuShown ? this.saveMenu() : null}
                        {this.state.loadMenuShown ? this.loadMenu() : null}
                        {this.state.backlogShown ? this.backlog() : null}
                        {this.state.frameIsRendering ? this.renderFrame() : null}
                        {this.state.choicesExist ? this.renderChoiceMenu() : null}
                    </ReactCSSTransitionGroup>
                </Fullscreen>
                {!this.state.titleScreenShown ? this.renderMenuButtons() : null}
                {this.state.bgm ? this.playBGM() : null}
                {this.state.soundEffect ? this.playSoundEffect() : null}
                {this.state.voice ? this.playVoice() : null}
            </div>
        );
    }
}

export default App;
