//helper used by other functions below
function matchRegexp(value, regexp) {
  return regexp.test(value);
}

function isExisty(value) {
  return value !== null && value !== undefined;
}

var validations = {

  isExisty(value) {
    return value !== null && value !== undefined;
  },

  isEmpty(value) {
    return value === '';
  },

  isEmptyString(value) {
    return value === '';
  },

  isUrl(url) {
    if(matchRegexp(url, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)) {
      return true;
    } else {
      return false;
    }
  },

  isEmail (value) {
      return matchRegexp(value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
  },

  isNumeric(value) {
    if (typeof value === 'number') {
      return true;
    }
    return matchRegexp(value, /^[-+]?(?:\d*[.])?\d+$/);
  },

  isAlpha(value) {
    return matchRegexp(value, /^[A-Z]+$/i);
  },

  isAlphanumeric(value) {
    return matchRegexp(value, /^[0-9A-Z]+$/i);
  },

  isInt(value) {
    return matchRegexp(value, /^(?:[-+]?(?:0|[1-9]\d*))$/);
  },

  isFloat(value) {
    return matchRegexp(values, value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/);
  },

  isWords(value) {
    return matchRegexp(value, /^[A-Z\s]+$/i);
  },

  isSpecialWords(value) {
    return matchRegexp(values, value, /^[A-Z\s\u00C0-\u017F]+$/i);
  },

  maxLength(value, length) {
    return !isExisty(value) || value.length <= length;
  },

  minLength(value, length) {
    return !isExisty(value) || value.length >= length;
  },

  //alphanumeric + spaces + hyphens (address field, for example)
  isAlphanumericSpacesHyphens(value) {
    return matchRegexp(value, /^[0-9A-Z][0-9A-Z -]*[0-9A-Z]+$/i);
  },

  //alpha + spaces + hyphens (first/last names, city for example)
  //has to start with a character and finish with a character
  isAlphaSpacesHyphens(name) {
    if(matchRegexp(name, /^[A-Z][A-Z\s- ]*[A-Z]+$/i)) {
      return true;
    } else {
      return false;
    }
  },

  isPostalCode(value) {
    if (matchRegexp(value, /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)) {
      return true;
    } else {
      return false;
    }
  },

  isPhoneNumber(value) {
    if(matchRegexp(value, /^\d{3}-\d{3}-\d{4}$|^\d{10}$/)) {
      return true;
    } else {
      return false;
    }
  },

  isPassword(password) {
    if(matchRegexp(password, /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9\u00C0-\u017F!@#$%^&*]{8,16}$/)) {
      return true;
    } else {
      return false;
    }
  },
};


//TODO REMOVE 2 following functions
function validateLogin(login) {
  if(login !== null && login !== undefined && login !== ''
                    && matchRegexp(login, /^[0-9A-Z]+$/i)
                    && login.length > 6) {
    console.log('Login passed the validation');
    return true;
  } else {
    console.log('Login failed the validation');
    return false;
  }
}



function validateEmail(email) {
  if(matchRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i)) {
    return true;
  } else {
    return false;
  }
}

function isTabletPortrait() {
  // @tablet-portrait media query:
  return (window.matchMedia('(orientation: portrait)').matches &&
    window.matchMedia('(max-device-aspect-ratio: 1/1)').matches &&
    window.matchMedia('(min-device-width: 481px)').matches) ||
    // @tablet-portrait-with-keyboard media query:
    (window.matchMedia('(orientation: landscape)').matches &&
    window.matchMedia('(max-device-aspect-ratio: 1/1)').matches &&
    window.matchMedia('(min-device-width: 481px)').matches);
}

function isTabletLandscape() {
  // @tablet-landscape media query:
  return (window.matchMedia('(orientation: landscape)').matches &&
    window.matchMedia('(min-device-aspect-ratio: 1/1)').matches &&
    window.matchMedia('(min-device-width: 960px)').matches &&
    window.matchMedia('(max-device-width: 1366px)').matches);
}

function isDesktopPortrait() {
  // @desktop-portrait media query:
  return (window.matchMedia('(orientation: portrait)').matches &&
    window.matchMedia('(min-device-aspect-ratio: 1/1)').matches);
}

function isDesktopLandscape() {
  // @desktop-landscape media query:
  return (window.matchMedia('(orientation: landscape)').matches &&
    window.matchMedia('(min-device-aspect-ratio: 1/1)').matches &&
    window.matchMedia('(min-device-width: 1367px)').matches);
}


module.exports = {
  isTabletPortrait,
  isTabletLandscape,
  isDesktopPortrait,
  isDesktopLandscape,

  validations,
  //TODO remove next 2 functions
  validateLogin,
  validateEmail
}
