"use strict";

var Unit = require('deadunit/deadunit.browser')
var keysight = require('../keysight')
var syn = require("syn")

var testSequence = [
     // input          keydown         [keypress]
     //[syn code,    character,key,   [character,key] ]


    //*
     ["\\",    "\\","\\"],

     ["\b",    "\b","\b"],
     ["\t",    "\t","\t"],
     ["\n",    "\n","\n"],
     ["\r",    "\n","\n"],      // there is no key that yeilds '\r' on a browser
      
     ["[shift][shift-up]",    'shift','shift'],
     ["[ctrl][ctrl-up]",    'ctrl','ctrl'],
     ["[alt][alt-up]",    'alt','alt'],   // aka 'option'
     ["[pause-break]",    'pause','pause'], // or sometimes 'break'
     ["[caps]",    'caps','caps'],

     ["[escape]",    'esc','esc'],

     ["[space]",    ' ',' '],
     ["[page-up]",    'pageup','pageup'],
     ["[page-down]",    'pagedown','pagedown'],
     ["[end]",    'end','end'],
     ["[home]",    'home','home'],
     ["[left]",    'left','left'],
     ["[up]",    'up','up'],
     ["[right]",    'right','right'],
     ["[down]",    'down','down'],

     //["[print]",    'print','print'],    // not working for some reason - syn doesn't generate a charCode, keyCode, or which, and I apparently don't have a working print screen button
     ["[insert]",    'insert','insert'],
     ["[delete]",    'delete','delete'],

     ["0",    '0','0'],
     ["1",    '1','1'],
     ["2",    '2','2'],
     ["3",    '3','3'],
     ["4",    '4','4'],
     ["5",    '5','5'],
     ["6",    '6','6'],
     ["7",    '7','7'],
     ["8",    '8','8'],
     ["9",    '9','9'],

     ["[shift]0[shift-up]",    ')','0'],
     ["[shift]1[shift-up]",    '!','1'],
     ["[shift]2[shift-up]",    '@','2'],
     ["[shift]3[shift-up]",    '#','3'],
     ["[shift]4[shift-up]",    '$','4'],
     ["[shift]5[shift-up]",    '%','5'],
     ["[shift]6[shift-up]",    '^','6'],
     ["[shift]7[shift-up]",    '&','7'],
     ["[shift]8[shift-up]",    '*','8'],
     ["[shift]9[shift-up]",    '(','9'],

     ["[shift];[shift-up]",    ':',';'],
     ["[shift]=[shift-up]",    '+','='],
     ["[shift],[shift-up]",    '<',','],
     ["[shift]-[shift-up]",    '_','-'],
     ["[shift].[shift-up]",    '>','.'],
     ["[shift]/[shift-up]",    '?','/'],
     ["[shift]`[shift-up]",    '~','`'],
     //["[shift][[shift-up]",    '{','['],       // tested manually and it works - syn doesn't handle "[shift][[shift-up]" well
     ["[shift]\\[shift-up]",    '|','\\'],
     ["[shift]][shift-up]",    '}',']'],
     ["[shift]\'[shift-up]",    '"','\''],

     ["[shift-up];",    ';',';'],     // the shift-up here because apparently its still in shift mode because of a previous key event?

     // syn has issues rendering correct events for these - but I tested manually and they work
//     ["A",    'A','a'],
//     ["[shift]b[shift-up]",    'B','b'],
//     ["[shift]c[shift-up]",    'C','c'],
//     ["[shift]d[shift-up]",    'D','d'],
//     ["[shift]e[shift-up]",    'E','e'],
//     ["[shift]f[shift-up]",    'F','f'],
//     ["[shift]g[shift-up]",    'G','g'],
//     ["[shift]h[shift-up]",    'H','h'],
//     ["[shift]i[shift-up]",    'I','i'],
//     ["[shift]j[shift-up]",    'J','j'],
//     ["[shift]k[shift-up]",    'K','k'],
//     ["[shift]l[shift-up]",    'L','l'],
//     ["[shift]m[shift-up]",    'M','m'],
//     ["[shift]n[shift-up]",    'N','n'],
//     ["[shift]o[shift-up]",    'O','o'],
//     ["[shift]p[shift-up]",    'P','p'],
//     ["[shift]q[shift-up]",    'Q','q'],
//     ["[shift]r[shift-up]",    'R','r'],
//     ["[shift]s[shift-up]",    'S','s'],
//     ["[shift]t[shift-up]",    'T','t'],
//     ["[shift]u[shift-up]",    'U','u'],
//     ["[shift]v[shift-up]",    'V','v'],
//     ["[shift]w[shift-up]",    'W','w'],
//     ["[shift]x[shift-up]",    'X','x'],
//     ["[shift]y[shift-up]",    'Y','y'],
//     ["[shift]z[shift-up]",    'Z','z'],

     ["a",    'a','a'],
     ["b",    'b','b'],
     ["c",    'c','c'],
     ["d",    'd','d'],
     ["e",    'e','e'],
     ["f",    'f','f'],
     ["g",    'g','g'],
     ["h",    'h','h'],
     ["i",    'i','i'],
     ["j",    'j','j'],
     ["k",    'k','k'],
     ["l",    'l','l'],
     ["m",    'm','m'],
     ["n",    'n','n'],
     ["o",    'o','o'],
     ["p",    'p','p'],
     ["q",    'q','q'],
     ["r",    'r','r'],
     ["s",    's','s'],
     ["t",    't','t'],
     ["u",    'u','u'],
     ["v",    'v','v'],
     ["w",    'w','w'],
     ["x",    'x','x'],
     ["y",    'y','y'],
     ["z",    'z','z'],

//     ["ñ",    'ñ','ñ'],   I don't think syn is creating the events for this correctly

       // these work for keydown but not for keypress with syn, and I don't have a numpad to test manually
//     ["[num0]",    'num0','num0'],
//     ["[num1]",    'num1','num1'],
//     ["[num2]",    'num2','num2'],
//     ["[num3]",    'num3','num3'],
//     ["[num4]",    'num4','num4'],
//     ["[num5]",    'num5','num5'],
//     ["[num6]",    'num6','num6'],
//     ["[num7]",    'num7','num7'],
//     ["[num8]",    'num8','num8'],
//     ["[num9]",    'num9','num9'],
//     ["*",    '*','*'],
//     ["+",    '+','+'],
//     ["[subtract]",  '-','num_subtract'], // special for num subtract
//     ["[decimal]",   '.','num_decimal'],  // special for num decimal
//     ["[divide]",    '/','num_divide'],   // special for num divide

     ["[f1]",    'f1','f1'],
     ["[f2]",    'f2','f2'],
     ["[f3]",    'f3','f3'],
     ["[f4]",    'f4','f4'],
     ["[f5]",    'f5','f5'],
     ["[f6]",    'f6','f6'],
     ["[f7]",    'f7','f7'],
     ["[f8]",    'f8','f8'],
     ["[f9]",    'f9','f9'],
     ["[f10]",    'f10','f10'],
     ["[f11]",    'f11','f11'],
     ["[f12]",    'f12','f12'],

     ["[num-lock]",    'num','num'],    // num lock
     ["[scroll-lock]",    'scroll','scroll'], // scroll lock

     ["-",    '-','-'],

     [";",    ';',';'],
     ["=",    '=','='],
     [",",    ',',','],

     [".",    '.','.'],
     ["/",    '/','/'],
     ["`",    '`','`'],
     ["[",    '[','['],
     ["\\",    '\\','\\'],
     ["]",    ']',']'],
     ["\'",    '\'','\'']
     //*/
]

module.exports = function() {

    Unit.test("Testing keysight", function(t) {
        this.timeout(15*1000)

        //*

        this.test("simple test", function(t) {
            var keypressIsntFiredFor = [
                '\b','shift','meta','alt','pause','caps','esc','pageup','pagedown','end','home',
                'left','up','right','down', 'print', 'insert', 'delete',
                "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10","f11","f12",
                'num','scroll',
            ]
            var testsWhereKeypressIsntFired = testSequence.filter(function(v) {
                return keypressIsntFiredFor.indexOf(v[2]) !== -1
            })

            this.count(testSequence.length*4 - 2*testsWhereKeypressIsntFired.length)

            var n=-1
            var event = function(event, type) {
                if(n > testSequence.length) {
                    t.ok(false)
                    return
                }

                if(event.type === 'keydown') {
                    t.eq(keysight(event).char, testSequence[n][1]) // keydown
                    t.eq(keysight(event).key, testSequence[n][2]) // keydown
                } else {
                    if(testSequence[n][3] !== undefined) {
                        var testChar = testSequence[n][3]
                        var testKey = testSequence[n][4]
                    } else {
                        var testChar = testSequence[n][1]
                        var testKey = testSequence[n][2]
                    }
                    t.eq(keysight(event).char, testChar) // keypress
                    t.eq(keysight(event).key, testKey) // keypress
                }
            }

            var firstElement = document.body.children[0]
            var element = document.createElement("input")
            document.body.insertBefore(element, firstElement)
            var element2 = document.createElement("div")
            element2.style.color = 'white'
            document.body.insertBefore(element2, firstElement)

            var keydownChar, keydownKey, kepressChar, keypressKey;
            var updateOutput = function() {
                element2.innerText = "Keydown.char: "+d(keydownChar)+", Keydown.key: "+d(keydownKey)
                                  +", Keypress.char: "+d(kepressChar)+", Keypress.key: "+d(keypressKey)
            }
            var d = function(key) {  // display key
                if(key in {'\b':1,'\n':1,'\t':1}) {
                    key = JSON.stringify(key)
                    key = key.substr(1,key.length-2)
                    return key
                } else {
                    return key
                }
            }

            element.addEventListener("keydown", function(e) {
                keydownChar = keysight(e).char
                keydownKey = keysight(e).key
                if(keydownKey in keysight.unprintableKeys) {
                    kepressChar = keypressKey = ''
                }

                updateOutput()

                // ignore keydown events for option buttons that are only trying to modify a character
                if(keysight(e).key === 'shift' && n+1<testSequence.length && testSequence[n+1][0] !== '[shift][shift-up]') return;

                n++
                t.log(testSequence[n])
                event(e)
            })
            element.addEventListener("keypress", function(e) {
                kepressChar = keysight(e).char
                keypressKey = keysight(e).key

                updateOutput()

                event(e)
            })

            for(var r=0; r<testSequence.length; r++) {
                try {
                    if(testSequence[r][0] === "[") {
                        syn.key(element, '[') // syn.type doesn't handle open brackets well
                    } else {
                        syn.type(element, testSequence[r][0])
                    }
                } catch(e) {
                    if(testSequence[r][0] === '\t') {
                        // ignore -
                    } else {
                        throw e
                    }
                }
            }
        })

        //*/

    }).writeHtml($("#results")[0])

}