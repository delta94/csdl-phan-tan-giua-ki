function toggleThongTin(selector, defaultDisplay = 'block') {
    let selectorDisplay = $(selector).css('display');
    if (selectorDisplay == 'none') {
        $(selector).css('display', defaultDisplay);
    } else {
        $(selector).css('display', 'none');
    }
}

$(document).ready(function () {});
