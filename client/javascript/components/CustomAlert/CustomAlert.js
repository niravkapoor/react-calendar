import React, { Component, PropTypes } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CustomAlert.scss';
import classNames from 'classnames';

class CustomAlert extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state={
      "alertText" : "Heelo"
    }
  }

  onButtonClick(event){
    if(this.props.onButtonClick != undefined){
      clearTimeout(this.timer);
      this.props.onButtonClick();
    }
  }

  componentDidMount() {
    let triggerTime = 2000;
    let self = this;
    
    if(window){  
        this.timer = window.setTimeout(()=>{
          clearTimeout(this.timer);
          if(this.props.onAlertClose != undefined){
            this.props.onAlertClose();
          }
        }, triggerTime)
    }
  }

  render() {
    return (
      <div>
          <div className = {"alert-container"}>
              <span className={"message-text"}>
                  {this.props.messageText}
              </span>
              <button className={"button-text"} onClick={this.onButtonClick.bind(this)}>
                  {this.props.buttonText}
              </button>
            </div>
      </div>
    )
  }
}
CustomAlert.propTypes = { 
  enable: PropTypes.bool,
  messageText: PropTypes.string,
  buttonText: PropTypes.string,
  onAlertClose: PropTypes.func,
  onButtonClick: PropTypes.func
};

CustomAlert.defaultProps = { 
  messageText: 'Need Your Attention',
  buttonText: 'OK',
  enable: false
};

export default CustomAlert
