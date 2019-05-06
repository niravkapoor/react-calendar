import React, { PropTypes, Component } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { CHECKIN_HEADING_TEXT, CHECKOUT_HEAD_TEXT, MONTHS_ARRAY, DAYS_ARRAY_MON, CALENDAR_BTN_ERROR_TEXT } from '../../../../constants/index.js';
import CustomAlert from '../../../CustomAlert/CustomAlert';
import {daysBetween, getSingularOrPluralText } from '../../../../core/utils';

class Calendar extends Component{
    constructor(props) {
        super(props);
        var date = new Date();
        this.dateSelectBtnClicked = this.dateSelectBtnClicked.bind(this);

        this.compareDates = this.compareDates.bind(this);        
        this.numMonthsToDisp = [];
        for(let i = 1; i<= 6 ;i++){
            this.numMonthsToDisp.push(date.getMonth() + i)
        }
        this.displayedFirstMonthDates = [];        

        this.state = {
            date: date,
            day: (date.getDay() + 6 ) % 7, //to start week with Monday instead of Sunday
            month: date.getMonth(),
            year: date.getFullYear(),
            checkOutSelectedDate: this.props.checkOutDate ? new Date(this.props.checkOutDate) : '',
            checkInSelectedDate: this.props.checkInDate ? new Date(this.props.checkInDate) : '',
            checkOutDateError: false
        };

        //To Do: Handle the cross of calendar click coming from hotel list
    }

    componentDidMount() {
        if(this.state.checkOutSelectedDate && this.state.checkInSelectedDate){
            this.props.updateHeadingQs(getSingularOrPluralText(daysBetween(this.state.checkInSelectedDate, this.state.checkOutSelectedDate), "Night", "Nights"));
        }
        if(this.state.checkInSelectedDate){
            let currentMonth = MONTHS_ARRAY[this.state.checkInSelectedDate.getMonth()]+this.state.checkInSelectedDate.getFullYear();
            this.fullCalender.scrollTop = Math.max(this[currentMonth].offsetTop - 40 , 0)
        }
    }

    __getDaysInMonth(month, year, isLastMonthCal = false) {

        var date = new Date(year, month, 1);
        var days = [];
        
        while (date.getMonth() === month && this.displayedFirstMonthDates.length <= 180) {
            days.push(new Date(date));
            //MNR
            this.displayedFirstMonthDates.push(date);
            date.setDate(date.getDate() + 1);
        }
        return days;
    }


    createDay(config){
        let checkin_class = "";
        let checkout_class = "";
        let inbetween_class = "";
        let currentDate_class = "";

        if(config.currentDate){
            currentDate_class = "currentDate";
        }
        if(this.state.checkInSelectedDate){ //if check in selected
            if (this.compareDates(this.state.checkInSelectedDate, config.date) == 0) { //if check is current date
                checkin_class = "checkinDate";
                if(this.state.checkOutSelectedDate){ //if check out selected
                    checkout_class = "norightCurve";
                }
            }
            else if(this.state.checkOutSelectedDate){
                if(this.compareDates(config.date, this.state.checkInSelectedDate) == 1  && this.compareDates(this.state.checkOutSelectedDate, config.date) == 1){
                    inbetween_class = "inbetweenDate";
                }
                else if(this.compareDates(this.state.checkOutSelectedDate, config.date) == 0){
                    inbetween_class = "checkoutDate";
                }
            }
        }

        let dateClasses = classNames(
            "cal-day", 
            currentDate_class,
            checkin_class,
            checkout_class,
            inbetween_class
        )
        return (
            <div onClick={this.__checkoutDate.bind(this, config.date)} className={dateClasses}>
                <p><span>{config.date.getDate()}</span></p>
            </div>
        )
    }


     __createFirstMonth () {
        this.displayedFirstMonthDates = [];
        var allDaysofMonth = this.__getDaysInMonth(this.state.month, this.state.year);
        var firstMonthDates;
        var emptyDates;
        var counter = [0, 1, 2, 3, 4, 5, 6];
        let firstMonthDisplayDates = []
                
        if(this.state.day !== 0){
            emptyDates = (
                counter.map((count) =>{
                    if (count < this.state.day) {
                        return (
                            <div className={"cal-day"}><p></p></div>
                        )
                    }
                })
            )
        }


        firstMonthDates = (
            allDaysofMonth.map((date) => {
                let config = {
                    date: date,
                    currentDate: false
                }
                switch(this.compareDates(date, this.state.date)){
                    case 0:
                        config.currentDate = true;
                    case 1:
                        firstMonthDisplayDates.push(date);
                        return this.createDay(config);
                    break;
                }
            })
        );

        this.displayedFirstMonthDates = firstMonthDisplayDates;
        let monthId = MONTHS_ARRAY[this.state.month]+this.state.year;
        return (
            <div className={"first-monthView"}>
                <div className={"cal-monthHead"}>
                    <span className={"cal-monthName"}>{MONTHS_ARRAY[this.state.month]}</span> <span className={"cal-yaerName"}>{this.state.year}</span>
                </div>
                <div className={"cal-monthView"} id={monthId} ref={c => { this[monthId] = c; }}>
                    <div className={"cal-mv-weekRow"}>
                        {emptyDates}
                        {firstMonthDates}
                    </div>
                </div>
            </div>
        );
    }

    compareDates(dateFirst, dateSecond){
        dateFirst.setHours(0,0,0,0);
        dateSecond.setHours(0,0,0,0);
        if(dateFirst.getTime() == dateSecond.getTime()){
            return 0;
        }

        else if(dateFirst < dateSecond){
            return -1;
        }

        else if(dateFirst > dateSecond){
            return 1;
        }
    } 

    __getFullMonthView (monthIndex) {
        var self = this;
        var currentMonth = new Date();
        currentMonth.setDate(1);
        currentMonth.setMonth(monthIndex);

        var fullMonth = this.__getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
        var fullMonthDates;
        var emptyDates;
        var counter = [0, 1, 2, 3, 4, 5, 6];
        
        if(fullMonth.length > 0){        
            let start_day = (fullMonth[0].getDay() + 6 ) % 7; //to start day with Mon instead of Sunday
            if(start_day !== 0){
                emptyDates = (
                    counter.map((count) =>{
                        if (count < start_day) {
                            return (
                                <div className={"cal-day"}><p></p></div>
                            )
                        }
                    })
                )
            }

            fullMonthDates = (
                fullMonth.map((date) => {
                    let config = {
                        date: date
                    }
                    return this.createDay(config);
                })
            );

            let monthId = MONTHS_ARRAY[currentMonth.getMonth()]+currentMonth.getFullYear();

            return (
                <div className={"fromSecond-monthViews"}>
                    <hr className={"divider"}/>
                    <div className={classNames("cal-monthHead", "row")}>
                        <span className={"cal-monthName"}>{MONTHS_ARRAY[currentMonth.getMonth()]}</span> <span className={"cal-yaerName"}>{currentMonth.getFullYear()}</span>
                    </div>
                    <div className={classNames("cal-monthView", "row")} id={monthId} ref={c => { this[monthId] = c; }}>
                        <div className={"cal-mv-weekRow"}>
                            {emptyDates}
                            {fullMonthDates}
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return null;
        }
    }

    __conditionValidateHotelList(date, event) {
        //user has come from hotel list page and had selected checkin twice.
        if(this.compareDates(this.state.checkInSelectedDate, date) == 0){
            //user selects the checkin date again
            this.setState({
                checkOutSelectedDate: '',
                checkInSelectedDate: '',                        
            })
            this.props.updateHeadingQs(CHECKIN_HEADING_TEXT);
        }
        else{
            //users selects checkin date lesser than previously selected checkin date 
            if(this.compareDates(date, this.state.checkInSelectedDate) == -1){
                this.setState({
                    checkInSelectedDate: date,
                    checkOutSelectedDate: ""
                })
            }
            else{
                var checkoutDate = event.target;
                var fullCheckingDate = new Date(this.state.checkInSelectedDate)
                var differenceofDate =  parseInt((date - fullCheckingDate)/(24*3600*1000));
                if(differenceofDate > 30){
                    //user selects checkout date coming from hotel list page
                    //and selected date is greater than 30 days from checkin date
                    let todayDate  = new Date();
                    this.setState({
                        date: todayDate,
                        day: todayDate.getDay(),
                        month: todayDate.getMonth(),
                        year: todayDate.getFullYear(),
                        checkInSelectedDate: '',
                        checkOutSelectedDate: '',
                        checkOutDateError: true
                    })
                    this.props.updateHeadingQs(CHECKIN_HEADING_TEXT);
                }
                else{
                    //user selects checkout date
                    this.setState({
                        checkOutSelectedDate: date
                    });
                    this.dateSelectBtnClicked(date)
                }
            }
        }
        
    }

    __checkoutDate(date, event) {
        if(this.state.checkInSelectedDate){
            if(this.state.checkOutSelectedDate){
                this.setState({
                    checkInSelectedDate: date,
                    checkOutSelectedDate: "",
                })
                this.props.updateHeadingQs(CHECKOUT_HEAD_TEXT);
            }
            else{
                this.__conditionValidateHotelList(date, event);
            }
        }
        else{
            //user selects checking date coming from search page
            this.setState({
                checkInSelectedDate: date,
                checkOutSelectedDate: "",
            })
            this.props.updateHeadingQs(CHECKOUT_HEAD_TEXT);
        }
    }

    hideCheckoutError() {
        this.setState({
            checkOutDateError: !this.state.checkOutDateError
        })
    }

    dateSelectBtnClicked(checkOutDate){
        this.props.datesSelected({
            checkInDate: this.state.checkInSelectedDate,
            checkOutDate: checkOutDate
        });      
    }

    createErrorMessage(){
        return(
            <div className={"errorCheckout"}>
                <CustomAlert messageText={CALENDAR_BTN_ERROR_TEXT} buttonText="OK" onAlertClose={this.hideCheckoutError.bind(this)} onButtonClick={this.hideCheckoutError.bind(this)}/>
            </div>
        )
    }

    render(){
        return(  
            <div className={"pos-relative"}>  
                <div ref={c => { this.outerContainer = c; }} className={"outer-container"}>
                    <div className={classNames("cal-dayHead", "row")}>
                        {
                            DAYS_ARRAY_MON.map((day, i) => (
                                <div className={"cal-dayName"} key={i}><p>{day}</p></div>
                            ))
                        }
                    </div>
                    <div className={"fullCalender"} ref={c => { this.fullCalender = c; }}>
                        <div className={"container"}>
                            {this.__createFirstMonth()}
                        </div>
                        <div className={classNames("container", "fromSecond-month")}>
                            {
                                this.numMonthsToDisp.map((monthIndex)=>{
                                    return (
                                        <div>{this.__getFullMonthView(monthIndex)}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {       
                        this.state.checkOutDateError &&
                        this.createErrorMessage()
                }
            </div>
        )
    }
}

Calendar.propTypes = {
    checkInDate: PropTypes.string,
    updateHeadingQs: PropTypes.func,
    checkOutDate: PropTypes.string,
    datesSelected: PropTypes.func
}

export default connect()(Calendar)
