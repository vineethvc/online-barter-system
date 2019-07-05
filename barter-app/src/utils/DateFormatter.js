import moment from 'moment';

class DateFormatter {
  getDateTime(dateString){
    try{
        var dateTime = new Date(dateString);
        return moment(dateTime).format("MMMM Do, YYYY h:mm ss A")
    }catch(err){
      console.log("date formatter error", err)
      throw err;
    }
  }
}

export default new DateFormatter();

