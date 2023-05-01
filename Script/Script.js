let colors = [
    { light: "#cccccc", dark: "#22252d" },
    { light: "#b2b2b2", dark: "#292d36" },
    { light: "#4c4c4c", dark: "#ffffff" },
    { light: "#cccccd", dark: "#444b59" },
    { light: "#199c80", dark: "#26e9c6" },
]
let mathFormula = "5 x 25";

function doLight() {
    if ($("#mode-light").hasClass('active')) {
        // Already light
        return;
    }
    $("#mode-night").removeClass('active');
    $("#mode-light").addClass('active');

    const allElements = document.querySelectorAll('body *');

    allElements.forEach(function (element) {
        if (element.classList.contains('dynamic-color')) {
            var currentBackgroundColor = rgbToHex(getStyle(element, 'backgroundColor'));
            colors.forEach(function (color) {
                if (element.tagName == 'svg' && $(element).attr("fill") == color.light) {
                    $(element).attr("fill", color.dark);

                }
                else if (color.dark === currentBackgroundColor) {
                    $(element).css("background-color", color.light);
                }
            })

            if (element.tagName != 'svg' && element.id != 'mode-toggle') {
                var currentColor = rgbToHex(getStyle(element, 'color'));
                colors.forEach(function (color) {
                    if (color.dark === currentColor) {
                        $(element).css("color", color.light);
                    }
                })
            }
        }
    });
}

function doNight() {
    if ($("#mode-night").hasClass('active')) {
        // Already night
        return;
    }
    $("#mode-light").removeClass('active');
    $("#mode-night").addClass('active');

    const allElements = document.querySelectorAll('body *');

    allElements.forEach(function (element) {
        if (element.classList.contains('dynamic-color')) {
            var currentBackgroundColor = rgbToHex(getStyle(element, 'backgroundColor'));
            colors.forEach(function (color) {
                if (element.tagName == 'svg' && $(element).attr("fill") == color.dark) {
                    $(element).attr("fill", color.light);
                }
                else if (color.light === currentBackgroundColor) {
                    $(element).css("background-color", color.dark);
                }
            })

            if (element.tagName != 'svg'  && element.id != 'mode-toggle') {
                var currentColor = rgbToHex(getStyle(element, 'color'));
                colors.forEach(function (color) {
                    if (color.light === currentColor) {
                        $(element).css("color", color.dark);
                    }
                })
            }
        }
    });
}

function updateOutMath(append) {
    mathFormula += append;
    render();
}

function removeOutMath() {
    if (mathFormula.charAt(mathFormula.length - 1) == ' ') mathFormula = mathFormula.slice(0, -3);
    else mathFormula = mathFormula.slice(0, -1);

    render();
}

function clearOutMath() {
    mathFormula = '';
    $("#out-math").html('');
    $("#out-result").html('0');
    render();
}

function saveResult() {
    mathFormula = eval(mathFormula.replaceAll('x', '*'));
    $("#out-math").html(mathFormula);
    $("#out-result").html(mathFormula);
}

function render()
{
    $("#out-math").html(
        mathFormula
            .replace(/ x /g, '<span style="color: #f37a7a;"> x </span>')
            .replace(/ - /g, '<span style="color: #f37a7a;"> - </span>')
            .replace(/ \+ /g, '<span style="color: #f37a7a;"> + </span>')
            .replace(/ \/ /g, '<span style="color: #f37a7a;"> / </span>')
            .replace(/ \% /g, '<span style="color: #f37a7a;"> % </span>')
    );

    console.log(mathFormula);
    $('#out-result').text(eval(mathFormula.replaceAll('x', '*')));
}

document.addEventListener('DOMContentLoaded', function () {
    updateOutMath('');
});



/*
    @return {string}
 */
function getMode() {
    return $("#mode-light").hasClass('active')
        ? "light" : "night";
}

function rgbToHex(rgb) {
    // Check if the input is an RGBA string
    if (rgb === null) return '#000000';
    let rgbaMatch = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+(\.\d+)?))?\)$/i);

    if (rgbaMatch) {
        // Extract the RGBA values from the matched string
        let r = parseInt(rgbaMatch[1]);
        let g = parseInt(rgbaMatch[2]);
        let b = parseInt(rgbaMatch[3]);
        let a = rgbaMatch[5] ? parseFloat(rgbaMatch[5]) : 1;

        // Convert the RGBA values to hex and return the result
        let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return a === 1 ? hex : hex + Math.round(a * 255).toString(16).padStart(2, '0');
    }

    // Check if the input is an RGB string
    let rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);

    if (rgbMatch) {
        // Extract the RGB values from the matched string
        let r = parseInt(rgbMatch[1]);
        let g = parseInt(rgbMatch[2]);
        let b = parseInt(rgbMatch[3]);

        // Convert the RGB values to hex and return the result
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    // If the input is not a valid RGB or RGBA string, return null
    return null;
}

function getStyle(el, styleProp) {
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el, null)[styleProp];
}

//then result