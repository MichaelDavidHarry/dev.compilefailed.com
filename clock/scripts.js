(function(){
    const formatLeadingZero = (number) => String(number).padStart(2, '0');
    const localTimeZoneAbbreviation = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(new Date()).find(part => part.type == 'timeZoneName').value;
    const renderTime = () => {
        let time = new Date();
        let anteMeridian = (time.getHours / 12) > 1;
        document.querySelector('#local-clock-display').innerHTML = `${formatLeadingZero(time.getMonth() + 1)}-${formatLeadingZero(time.getDate())}-${formatLeadingZero(time.getFullYear())} ${formatLeadingZero(time.getHours() % 12)}:${formatLeadingZero(time.getMinutes())}:${formatLeadingZero(time.getSeconds())} ${anteMeridian ? "AM" : "PM"} ${localTimeZoneAbbreviation}`;
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