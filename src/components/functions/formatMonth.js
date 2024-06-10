import React, { Component } from 'react';

export default function FormatMonth(month){
    let formatedMonth = ""
    switch (month){
        case "01":
            formatedMonth = "January";
            break;
        case "02":
            formatedMonth = "February";
            break;
        case "03":
            formatedMonth = "March";
            break;
        case "04":
            formatedMonth = "April";
            break;
        case "05":
            formatedMonth = "May";
            break;
        case "06":
            formatedMonth = "June";
            break;
        case "07":
            formatedMonth = "July";
            break;
        case "08":
            formatedMonth = "August";
            break;
        case "09":
            formatedMonth = "September";
            break;
        case "10":
            formatedMonth = "October";
            break;
        case "11":
            formatedMonth = "November";
            break;
        case "12":
            formatedMonth = "December";
            break;
    }
    return formatedMonth;
}