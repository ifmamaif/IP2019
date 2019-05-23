import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class RenderFrame extends React.Component {

  constructor(props) {
    super();
    this.state = {seconds: 0};
  }

  componentDidMount() {
    this.interval = setInterval(() => this.props.setNextFrame(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  bgTransitionTime(key) {
    return 2000;
  }

  spriteTransitionTime(key) {
    if (
        this.props[key] === "move-left" ||
        this.props[key] === "move-left-far" ||
        this.props[key] === "move-right" ||
        this.props[key] === "move-right-far" ||
        this.props[key] === "from-left-leave-right" ||
        this.props[key] === "from-right-leave-left"
    ) {
      return 1200;
    } else if (this.props[key] === "shake") {
      return 700;
    } else if (this.props[key] === "bounce") {
      return 400;
    } else {
      return 250;
    }
  }

  render() {
    var props = this.props;
    return (
        <div onClick={props.setNextFrame} className="zoom-frame">
          <ReactCSSTransitionGroup
              transitionName={props.bgTransition || "scene-change"}
              transitionEnterTimeout={this.bgTransitionTime("bgTransition")}
              transitionLeaveTimeout={this.bgTransitionTime("bgTransition")}
          >
            <img draggable="false" key={props.bg} className="bg" src={props.bg}/>
            <ReactCSSTransitionGroup
                className="sprite-center-parent"
                transitionName={props.spriteTransition || "sprite"}
                transitionEnterTimeout={this.spriteTransitionTime("spriteTransition")}
                transitionLeaveTimeout={this.spriteTransitionTime("spriteTransition")}
            >
              <img draggable="false" key={props.sprite} className={"sprite " + props.spriteEffect} src={props.sprite}/>
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
                transitionName={props.spriteLeftTransition || "sprite"}
                transitionEnterTimeout={this.spriteTransitionTime("spriteLeftTransition")}
                transitionLeaveTimeout={this.spriteTransitionTime("spriteLeftTransition")}
            >
              <img
                  draggable="false"
                  key={props.spriteLeft + "left"}
                  className={"sprite left " + props.spriteLeftEffect}
                  src={props.spriteLeft}
              />
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
                transitionName={props.spriteRightTransition || "sprite"}
                transitionEnterTimeout={this.spriteTransitionTime("spriteRightTransition")}
                transitionLeaveTimeout={this.spriteTransitionTime("spriteRightTransition")}
            >
              <img
                  draggable="false"
                  key={props.spriteRight + "right"}
                  className={"sprite right " + props.spriteRightEffect}
                  src={props.spriteRight}
              />
            </ReactCSSTransitionGroup>
          </ReactCSSTransitionGroup>
          {props.text && props.textBoxShown ? (
              <div className="text-box" style={{fontFamily: props.font}}>
                {props.speaker ? <div className="speaker"> {props.speaker} </div> : null}
                <div className="text">{props.speaker ? `"${props.text}"` : props.text}</div>
              </div>
          ) : null}
        </div>
    );
  }
}
export default RenderFrame;