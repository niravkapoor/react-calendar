import React, { PropTypes, Component } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Calendar from './components/Calendar/Calendar';
import { connect } from 'react-redux';
import s from './Checkin.scss';
import classNames from 'classnames';
import { CHECKIN_HEADING_TEXT, CHECKOUT_HEAD_TEXT } from '../../constants';
// import { convertToFormat } from '../../core/utils';

class CheckinDate extends Component {
    constructor(props) {
        super(props);
        this.updateHeadingQs = this.updateHeadingQs.bind(this);
        this.datesSelected = this.datesSelected.bind(this);
        this.state = {
            heading_question: (this.props.checkOutDate)? CHECKOUT_HEAD_TEXT : CHECKIN_HEADING_TEXT
        }
    }

    updateHeadingQs(ques) {
        this.setState({
            "heading_question": ques
        })
    }

    datesSelected(obj){
        // this.props.updateSearchStore({
        //     check_in_date: convertToFormat(obj.checkInDate),
        //     check_out_date: convertToFormat(obj.checkOutDate)
        // })
    }

    render() {
        debugger;
        return(
            <div className={"checkin-main"}>                
                <div className={"checkin-container"}>
                    <p className={"ci-heading-qs"}>{this.state.heading_question}</p>
                </div>
                <hr className={"divider"}/>
                <Calendar checkOutDate={this.props.checkOutDate} 
                        checkInDate={this.props.checkInDate} 
                        updateHeadingQs={this.updateHeadingQs} 
                        datesSelected = {this.datesSelected}
                />
            </div>
        )
    }
}

CheckinDate.propTypes = {
    checkOutDate: PropTypes.string,
    checkInDate: PropTypes.string,
    updateSearchStore: PropTypes.func
}

export default connect()(CheckinDate)
