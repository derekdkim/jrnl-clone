const entryMonths = ['Jan', 'Feb', 'Mar', 
                'Apr', 'May', 'Jun', 'Jul', 
                'Aug', 'Sep', 'Oct', 
                'Nov', 'Dec'];

// Format mmm/dd/year to display on the entry header
const formatEntryDate = (date) => {
  let workingDate;
  if (date instanceof Date) {
    workingDate = date;
  } else {
    workingDate = new Date(date);
  }

  const year = workingDate.getFullYear();
  const month = workingDate.getMonth();
  const day = workingDate.getDate();

  // Return Today or the actual date in Nov 12, 2020 format
  return isItToday(year, month, day) ? 'Today' : `${entryMonths[month]} ${day}`;
}

// Format hh:mm to display on the entry header
const formatEntryTime = (date) => {
  let workingDate;
  if (date instanceof Date) {
    workingDate = date;
  } else {
    workingDate = new Date(date);
  }
  
  let hr = workingDate.getHours();
  let AMPM = 'am';
  
  // PM if past noon. Otherwise defaults to AM
  if (hr >= 12) {
    AMPM = 'pm';

    // Convert from 24h time to 12h unless hr was exactly 12
    if (hr !== 12) {
      hr -= 12;
    }
  }

  const min = workingDate.getMinutes();

  return `${hr}:${min}${AMPM}`;
}

const isItToday = (year, month, day) => {
  const today = new Date(Date.now());

  // Match year, month, date to today
  if (today.getFullYear() === year) {
    if (today.getMonth() === month) {
      if (today.getDate() === day) {
        return true;
      }
    }
  }

  return false;
}

const formatModifiedDate = (date) => {
  // Months is technically incorrect due to not every month having 30 days 
  const operations = [1000, 60, 60, 24, 30, 12, 1];
  const units = ['sec', 'min', 'hour', 'day', 'month', 'year'];
  let dateDiff = Date.now() - date;

  // Bring date up to larger units until an appropriate range is found
  for (let i = 0; i <= operations.length; i++) {
    dateDiff /= operations[i];
    if (dateDiff < operations[i + 1]) {
      let plural = Math.floor(dateDiff) > 1 ? 's' : '';
      return `${Math.floor(dateDiff)} ${units[i]}${plural}`; 
    }
  }
  return undefined;
}

export { formatEntryDate, formatEntryTime, formatModifiedDate, entryMonths };