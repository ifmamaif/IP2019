import React from "react";
import Music from"./Music"
import backgroundMusic from '../story/sounds/spiritOfFreedom.mp3';
import Bird from "./Bird";
function TitleScreen(props) {
  return (
      <div>
        <Bird/>
    <div>
      <Music url={backgroundMusic}/>
      <div id="title-screen-header">
        <div id="logo">The story of IP</div>
        <ul id="menu">
          <li>
            <span className="center-custom" onClick={props.beginStory}>Begin</span>
          </li>
          {/*<li>*/}
            {/*<span onClick={props.toggleLoadMenu}>Continue</span>*/}
          {/*</li>*/}
          <li />
          {/*<span className="abracadabra">Say Abracadabra to start the adventure of your life !</span>*/}
        </ul>
      </div>
    </div>
      </div>
  );
}

export default TitleScreen;
// className="overlay" id="title-overlay"