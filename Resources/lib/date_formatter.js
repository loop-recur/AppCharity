module.exports = (function() {
  var date = function(date_str, opts) {
    var parsed_date,
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if(!date_str) { return ''; }

    if(opts && opts.fb) {
      var split_date = date_str.split(/\D/),
          year = split_date[0],
          month = split_date[1]-1,
          day = split_date[2],
          hour = split_date[3],
          min = split_date[4],
          sec = split_date[5];
          parsed_date = new Date(year, month, day, hour, min, sec);
    }

    if (opts && opts.to_date && opts.formatted) {
      parsed_date = new Date(date_str * 1000).toString().slice(0,15);
    } else if (opts && opts.parsed) {
      parsed_date = opts.fb ? parsed_date.toISOString() : new Date(date_str).toISOString();
    } else if (opts && opts.formatted) {
      parsed_date = opts.fb ? parsed_date.toString().slice(0,10) : new Date(date_str).toString().slice(0,10);
    } else if (opts && opts.twitter) {
      parsed_date = date_str.slice(0,10);
    } else if (opts && opts.twitter_row) {
      parsed_date = date_str.slice(4,10);
    } else if (opts && opts.month) {
      parsed_date = months[new Date(date_str * 1000).getMonth()];
    } else if (opts && opts.day) {
      parsed_date = new Date(date_str * 1000).getDate();
    } else if (opts && opts.to_date) {
      parsed_date = new Date(date_str * 1000).toString();
    }

    return parsed_date;
	};
	return {date : date};
})();
