import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CheckinDate from './components/checkin/CheckinDate';
import { routerMiddleware, push } from 'react-router-redux';


// const {reactUrl} =urlConfig;

class MainContainer extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                
                 <CheckinDate />
            </div>
        );
    }
}


export default connect()(MainContainer);
