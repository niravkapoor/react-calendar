export const daysBetween = (date1, date2) => {
  
    // The number of milliseconds in one day
    let ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds and set to midnight
    let date1Obj = new Date(date1).setHours(0,0,0);
    let date2Obj = new Date(date2).setHours(0,0,0);

    // Calculate the difference in milliseconds
    let diff = Math.abs(date2Obj - date1Obj)

    // Convert back to days and return
    return diff/ONE_DAY;

}

export const getSingularOrPluralText = (num, singular, plural) => {
    let retVal = "";
    if(num != undefined && num > 0){
        retVal = num;
        if(num > 1){
            retVal = retVal + " " + plural;
        }
        else{
            retVal = retVal + " " + singular;
        }
    }
    return retVal;
  }