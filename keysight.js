
var keycodeShiftedKeys = {
    "/": "?",
    ".": ">",
    ",": "<",
    "\'": "\"",
    ";": ":",
    "[": "{",
    "]": "}",
    "\\": "|",
    "`": "~",
    "=": "+",
    "-": "_",
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "0": ")"
};

var keyCodeUnshiftedKeys = {}
for(var x in keycodeShiftedKeys) {
    var shiftedKey = keycodeShiftedKeys[x]
    keyCodeUnshiftedKeys[shiftedKey] = x
}

var keydownKeycodeDictionary = {
    0: "\\",

    8: "\b",
    9: "\t",

    12: "num",
    13: "\n",

    16: "shift",
    17: "ctrl",  // 'ctrl' on windows and linux
    18: "alt",   // aka 'option'
    19: "pause", // or sometimes 'break'?
    20: "caps",

    27: "esc",

    32: " ",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",

    44: "print",
    45: "insert",
    46: "delete",

    // 48-90

//    48: "0",
//    49: "1",
//    50: "2",
//    51: "3",
//    52: "4",
//    53: "5",
//    54: "6",
//    55: "7",
//    56: "8",
//    57: "9",
//
//    59: ";",
//
//    61: "=",
//
//    65: "a",
//    66: "b",
//    67: "c",
//    68: "d",
//    69: "e",
//    70: "f",
//    71: "g",
//    72: "h",
//    73: "i",
//    74: "j",
//    75: "k",
//    76: "l",
//    77: "m",
//    78: "n",
//    79: "o",
//    80: "p",
//    81: "q",
//    82: "r",
//    83: "s",
//    84: "t",
//    85: "u",
//    86: "v",
//    87: "w",
//    88: "x",
//    89: "y",
//    90: "z",
    91: "cmd",   // 'left window key'
    92: "cmd",   // 'right window key'
    93: "cmd",   // 'select key'

    96: "num0",
    97: "num1",
    98: "num2",
    99: "num3",
    100: "num4",
    101: "num5",
    102: "num6",
    103: "num7",
    104: "num8",
    105: "num9",
    106: "*",
    107: "+",
    108: "num_enter",
    109: "num_subtract",
    110: "num_decimal",
    111: "num_divide",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    124: "print",

    144: "num",    // num lock
    145: "scroll", // scroll lock

    173: "-",

    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "\'",
    223: "`",
    224: "cmd",
    225: "alt",

    57392: "ctrl", // ctrl on mac
    63289: "num"
};

var keydownKeycodeReverseDictionary = {}
for(var x in keydownKeycodeDictionary) {
    var name = keydownKeycodeDictionary[x]
    keydownKeycodeReverseDictionary[name] = x
}

var keypressCharacterMap = {
    '\r':'\n'
}
var keydownCharacterMap = {
    num_subtract: '-',
    num_enter: '\n',
    num_decimal: '.',
    num_divide: '/'

}

function getKeypressKeycodeValue(charcode) {
    var character = String.fromCharCode(charcode)
    if(character in keyCodeUnshiftedKeys) {
        return keyCodeUnshiftedKeys[character]
    } else if(character in keypressCharacterMap) {
        return keypressCharacterMap[character]
    } else {
        return character.toLowerCase()
    }
}


module.exports = function(event) {
    if(event.type === 'keypress') {
        var key = getKeypressKeycodeValue(event.charCode)
    } else {
        if(event.keyCode !== undefined) {
            if(event.keyCode in keydownKeycodeDictionary) {
                var key = keydownKeycodeDictionary[event.keyCode]
            } else {
                var key = String.fromCharCode(event.keyCode).toLowerCase() // fall back to this in case the explicit map above doesn't cover something
            }
        } else if(event.charCode === 0) {
            var key = '\n'
        }
    }

    if(event.shiftKey && key in keycodeShiftedKeys) {
        var char = keycodeShiftedKeys[key]
    } else if(event.shiftKey && !(key in keydownKeycodeReverseDictionary)) {
        var char = key.toUpperCase() // fallback
    } else if(key in keydownCharacterMap) {
        var char = keydownCharacterMap[key]
    } else {
        var char = key
    }

    return {
        char: char,
        key: key,
        shift: event.shiftKey,
        ctrl: event.ctrlKey,
        alt: event.altKey,
        cmd: event.metaKey,
    }
}

module.exports.unprintableKeys = {
    "\b":1,"num":1,"shift":1,"meta":1,"alt":1,"pause":1,"caps":1,"esc":1,
    "pageup":1,"pagedown":1,"end":1,"home":1,
    "left":1,"up":1,"right":1,"down":1,
    "print":1,"insert":1,"delete":1,"cmd":1,
    "f1":1,"f2":1,"f3":1,"f4":1,"f5":1,"f6":1,"f7":1,"f8":1,"f9":1,"f10":1,"f11":1,"f12":1,
    "scroll":1,"ctrl":1,
}


