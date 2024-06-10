export default function FormatTime(hour,minute){
    let hour12 = hour
    let period = "AM"
    if (parseInt(hour12) > 12){
        hour12 = (parseInt(hour12) - 12).toString();
        period = "PM"
    }
    return (hour12 + ":" + minute + " " + period)    
}