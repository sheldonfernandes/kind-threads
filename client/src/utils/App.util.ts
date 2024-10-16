export class AppUtil {
  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  getDate(date :string | undefined) {
    if(date )
    {
      const fullDate = new Date(Date.parse(date));
      let twoDigitMonth = fullDate.getMonth() + "";
      if (twoDigitMonth.length == 1)
          twoDigitMonth = "0" + twoDigitMonth;
      let twoDigitDate = fullDate.getDate() + "";
      if (twoDigitDate.length == 1)
          twoDigitDate = "0" + twoDigitDate;
      return twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear(); 

    }
    return null
  }

  getDateTime(date :string | undefined) {
    if(date )
    {
      const fullDate = new Date(Date.parse(date));
      return fullDate.toLocaleString('en-US', {day:'numeric', month:"short", year:"numeric", hour: 'numeric', minute: 'numeric', hour12: true }); 

    }
    return null
  }
}
