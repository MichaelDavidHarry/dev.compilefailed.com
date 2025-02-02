(function(){
    var overrideTime = null;

    // Provide a given time to display by appending a hash to the URL, like this: #time=2-2-2025 12:11 pm
    if (window.location.hash.startsWith("#time")){
        overrideTime = new Date(decodeURIComponent(window.location.hash.split('=')[1]));
    }

    const formatLeadingZero = (number) => String(number).padStart(2, '0');
    const localTimeZoneAbbreviation = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(new Date()).find(part => part.type == 'timeZoneName').value;
    
    const format12HourHour = (twentyFourHourHour) => {
        let hour = twentyFourHourHour % 12;
        if (hour == 0){
            hour = 12;
        }
        return hour;
    }
    
    const renderTime = () => {
        let time = overrideTime ?? new Date();
        let anteMeridian = (time.getHours() / 12) < 1;
        document.querySelector('#local-clock-display').innerHTML = `${formatLeadingZero(time.getMonth() + 1)}-${formatLeadingZero(time.getDate())}-${formatLeadingZero(time.getFullYear())} ${formatLeadingZero(format12HourHour(time.getHours()))}:${formatLeadingZero(time.getMinutes())}:${formatLeadingZero(time.getSeconds())} ${anteMeridian ? "AM" : "PM"} ${localTimeZoneAbbreviation}`;
        document.querySelector('#utc-clock-display').innerHTML = `${formatLeadingZero(time.getUTCMonth() + 1)}-${formatLeadingZero(time.getUTCDate())}-${formatLeadingZero(time.getUTCFullYear())} ${formatLeadingZero(time.getUTCHours())}:${formatLeadingZero(time.getUTCMinutes())}:${formatLeadingZero(time.getUTCSeconds())} UTC`;
        document.querySelector('#unix-clock-display').innerHTML = Math.round(time.getTime() / 1000);
    }

    const scheduleTimeout = () => {
        setTimeout(() => {
            renderTime();
            scheduleTimeout();
        }, 1000 - new Date().getMilliseconds());
    };

    renderTime();
    scheduleTimeout();
})();