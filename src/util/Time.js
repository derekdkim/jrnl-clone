const entryMonths = ['Jan', 'Feb', 'Mar', 
                'Apr', 'May', 'Jun', 'Jul', 
                'Aug', 'Sep', 'Oct', 
                'Nov', 'Dec'];

// Format mmm/dd/year to display on the entry header
const formatEntryDate = (date) => {
  const workingDate = new Date(date);
  const year = workingDate.getFullYear();
  const month = workingDate.getMonth();
  const day = workingDate.getDate();

  // Return Today or the actual date in Nov 12, 2020 format
  return isItToday(year, month, day) ? 'Today' : `${entryMonths[month]} ${day}`;
}

// Format hh:mm to display on the entry header
const formatEntryTime = (date) => {
  const workingDate = new Date(date);
  let hr = workingDate.getHours();
  let AMPM = 'am';
  
  // PM if past noon. Otherwise defaults to AM
  if (hr > 12) {
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

export { formatEntryDate, formatEntryTime };