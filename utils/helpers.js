module.exports = {
    // methods
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      // return date.toLocaleDateString();
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
    },
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
};
