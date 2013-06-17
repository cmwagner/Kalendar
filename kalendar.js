/**
 * Advances the date into the future by a given number of days.
 * @param {Integer} days The number of days to advance.
 * @returns {Date} The advanced date.
 */
Date.prototype.advDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};


/**
 * Reverses the date into the past by a given number of days.
 * @param {Integer} days The number of days to reverse.
 * @returns {Date} The reversed date.
 */
Date.prototype.revDays = function(days) {
    this.setDate(this.getDate() - days);
    return this;
};


/**
 * Advances the date into the future by a given number of weeks.
 * @param {Integer} weeks The number of weeks to advance.
 * @returns {Date} The advanced date.
 */
Date.prototype.advWeeks = function(weeks) {
    this.advDays(7 * weeks);
    return this;
};


/**
 * Reverses the date into the past by a given number of weeks.
 * @param {Integer} weeks The number of weeks to reverse.
 * @returns {Date} The reversed date.
 */
Date.prototype.revWeeks = function(weeks) {
    this.revDays(7 * weeks);
    return this;
};

/**
 * Finds the last day of the Gregorian month.
 * @returns {Integer} The number of the last day of the month.
 */
Date.prototype.getEOM = function() {
    var day = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return day.getDate();
};

Date.prototype.getDateDiff = function(date) {
    var diff = Math.dateDiff(this, date);
    return diff;
};

Math.dateDiff = function(date1, date2) {
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    var distance = 0;
    switch(true) {
        case date1.getTime() === date2.getTime():
            break;
        case date1 < date2:
            while (date1 < date2) {
                distance = distance +1;
                date1 = date1.advDays(1);
            }
            break;
        case date1 > date2:
            while (date1 > date2) {
                distance = distance +1;
                date1 = date1.revDays(1);
            }
            break;
    }
    return distance;
};

Date.prototype.getOrdinal = function() {
    var date = this.getDate();
    switch (date) {
        case 1:
        case 21:
        case 31:
            ordinal = date + "st";
            break;
        case 2:
        case 22:
            ordinal = date + "nd";
            break;
        case 3:
        case 23:
            ordinal = date + "rd";
            break;
        default:
            ordinal = date + "th";
            break;
    }
    return ordinal;
};

Date.prototype.thisSunday = function() {
    var weekday = this.getDay();
    return this.addDays(0 - weekday);
};

Date.prototype.nextSunday = function() {
    var weekday = this.getDay();
    return this.addDays(7 - weekday);
};

Date.prototype.prevSunday = function() {
    var weekday = this.getDay();
    if (weekday === 0) {
        return this.addDays(-7);
    } else {
        return this.addDays(0 - weekday);
    }
};

Date.prototype.getKalendarYear = function() {
    var christmas = new Date("December 25, " + this.getFullYear());
    var advent1 = christmas.prevSunday().revWeeks(3);
    if (this > advent1) {
        return this.getFullYear();
    } else {
        return this.getFullYear() - 1;
    }
};

Date.prototype.getHolidays = function() {
    var year = this.getFullYear();
    var month = this.getMonth();
    var date = this.getDate();
    
    var holidays = [];
    
    var getMemorialDay = function() {
        var eom = new Date("May 31, " + year);
        var weekday = eom.getDay();
        switch(weekday) {
            case 0: return eom.revDays(-6); break;
            default:  return eom.revDays(weekday); break;
        }
    };

    if(getMemorialDay().getTime() === this.getTime()) {
        holidays.push("Memorial Day");
    }


    var calendar = {
        "January 1": "New Year",
        "February 14": "Valentine's Day",
        "December 25": "Christmas Day"
    };

    for (var i in calendar) {
        var value = calendar[i];
        var comp = new Date(i + ", " + year).getTime();
        var today = this.getTime();
        if(comp === today) {
            holidays.push(value);
        }
    }
    return holidays;
};

Date.prototype.isPascalMoon = function() {
    var year = this.getFullYear();
    var cycle = (year % 19) + 1;
    var moons = new Array();
    moons[1] = "April 14, " + year;
    moons[2] = "April 3, " + year;
    moons[3] = "March 23, " + year;
    moons[4] = "April 11, " + year;
    moons[5] = "March 31, " + year;
    moons[6] = "April 18, " + year;
    moons[7] = "April 8, " + year;
    moons[8] = "March 28, " + year;
    moons[9] = "April 16, " + year;
    moons[10] = "April 5, " + year;
    moons[11] = "March 25, " + year;
    moons[12] = "April 13, " + year;
    moons[13] = "April 2, " + year;
    moons[14] = "March 22, " + year;
    moons[15] = "April 10, " + year;
    moons[16] = "March 30, " + year;
    moons[17] = "April 17, " + year;
    moons[18] = "April 7, " + year;
    moons[19] = "March 27, " + year;
    var moon = new Date(moons[cycle]);
    if (moon.getTime() === this.getTime()) {
        return true;
    } else {
        return false;
    }
};

Date.prototype.getPascalMoon = function() {
    var year = this.getFullYear();
    var cycle = (year % 19) + 1;
    var moons = new Array();
    moons[1] = new Date("April 14, " + this.getFullYear());
    moons[2] = new Date("April 3, " + this.getFullYear());
    moons[3] = new Date("March 23, " + this.getFullYear());
    moons[4] = new Date("April 11, " + this.getFullYear());
    moons[5] = new Date("March 31, " + this.getFullYear());
    moons[6] = new Date("April 18, " + this.getFullYear());
    moons[7] = new Date("April 8, " + this.getFullYear());
    moons[8] = new Date("March 28, " + this.getFullYear());
    moons[9] = new Date("April 16, " + this.getFullYear());
    moons[10] = new Date("April 5, " + this.getFullYear());
    moons[11] = new Date("March 25, " + this.getFullYear());
    moons[12] = new Date("April 13, " + this.getFullYear());
    moons[13] = new Date("April 2, " + this.getFullYear());
    moons[14] = new Date("March 22, " + this.getFullYear());
    moons[15] = new Date("April 10, " + this.getFullYear());
    moons[16] = new Date("March 30, " + this.getFullYear());
    moons[17] = new Date("April 17, " + this.getFullYear());
    moons[18] = new Date("April 7, " + this.getFullYear());
    moons[19] = new Date("March 27, " + this.getFullYear());
    return moons[cycle];
};

Date.prototype.getEaster = function() {
    var moon = this.getPascalMoon();
    var easter = moon.nextSunday();
    return easter;
};

Date.prototype.getAshWednesday = function() {
    var easter = this.getEaster();
    var ashwed = easter.revDays(46);
    return ashwed;
};

Date.prototype.getPentecost = function() {
    var easter = this.getEaster();
    var pentecost = easter.advDays(49);
    return pentecost;
};

Date.prototype.getChristmas = function() {
    var christmas = new Date("December 25, " + this.getFullYear());
    return christmas;
};

Date.prototype.getAdvent1 = function() {
    var christmas = this.getChristmas();
    var advent = christmas.prevSunday().revWeeks(3);
    return advent;
};

Date.prototype.getEpiphany = function() {
    var epiphany = new Date("January 6, " + this.getFullYear());
    return epiphany;
};

Date.prototype.getLitSeason = function() {
    var moon = this.getPascalMoon();
    var christmas = new Date("December 25, " + this.getFullYear());
    var advent = christmas.prevSunday().revWeeks(3);
    var epiphany = new Date("January 6, " + this.getFullYear());

    var easter = moon.nextSunday();
    var ashwednesday = easter.revDays(46);
    var pentecost = easter.advDays(49);

    switch (true) {
        case this < epiphany:
            return "Christmas";
            break;
        case this < ashwednesday:
            return "Epiphany";
            break;
        case this < easter:
            return "Lent";
            break;
        case this <= pentecost:
            return "Easter";
            break;
        case this < advent:
            return "After Pentecost";
            break;
        case this < christmas:
            return "Advent";
            break;
        default:
            return "Christmas";
            break;
    }
};