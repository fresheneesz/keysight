
`keysight`
=====

A translator for javascript keyboard events to and from consistent and familiar charaacter and key representations.
Take your `keydown`, `keypress`, and `keyup` events and reliably tranlate them into keyboard keys and characters.
Its lightweight at 1.06KB minified and gzipped.

Example
=======

```javascript
myCanvas.addEventListener("keydown", function(event) {
    var key = keysight(event).key
    if(key === 'w') {
        goUp()
    } else if(key === '\n') {
        confirm()
    } else if(key === 'shift') {
        if(event.location === 1) { // left shift
            shiftDown()
        } else {                   // right shift
            shiftUp()
        }
    } else if(key === '\b') {
        event.preventDefault()     // prevent changing pages
    } else {
        var char = keysight(event).char
        if(char === 'r') {
            reload()
        } else if(char === 'R') {
            secondaryReload()
        }
    }
})
textfield.addEventListener("keypress", function(e) {
    var validChars = ['0','1','2','3','4','5']

    var char = keysight(event).char
    if(validChars.indexOf(char) === -1))
        event.preventDefault()  // prevent the character from being input
})
```

Motivation
==========

Mapping browser keyboard events to actual characters has always been a struggle because of browser inconsistencies, and inconsistencies
between 'keydown' and 'keypress' events. No library seems to have existed to solve this problem, so I created one.

Install
=======

```
npm install keysight
// or
bower install keysight
```


Usage
=====

Accessing keysight:
```javascript
// node.js
var keysight = require('keysight')

// amd
require.config({paths: {keysight: '../dist/keysight.umd.js'}})
require(['keysight'], function(keysight) { /* your code */ })

// global variable
<script src="keysight.umd.js"></script>
keysight; // keysight.umd.js can define keysight globally if you really
          //   want to shun module-based design
```

Using keysight:

**`keysight(event)`** - Takes in a keyboard event from `keypress`, `keyup`, or `keydown` and returns an object that has the following properties:
* **`key`** - The keyboard key pressed. Does not take into account shift, so for example if you type 'A', this will contain 'a'.
* **`char`** - The character created by the key press. Takes into account shift, so if you type 'A', this will contain 'A'.
           Note that in cases where there are multiple keys that give the same character, the simpler character is used (eg. if the `key` is "num_enter", `char` will be "\n")

## Special Key and character strings

The `key` and `char` values contain the actual character typed ('a', '$', '\t', etc) except in the following cases where the character isn't printable.
The string on the left is the string that represents the conceptual key/character on the right:

* \b - backspace key
* \n - enter key
* shift - the shift key
* meta - ctrl/cmd (here 'meta' is used since the character is named different things on mac vs windows)
* alt - alt key
* pause - pause key
* caps - caps lock key
* esc - escape key
* pageup
* pagedown
* end
* home
* left
* right
* up
* down
* print
* insert
* delete
* num0 - Number pad key 0. Note that the `char` value for this will be '0'.
* num1 - Number pad key 1. Note that the `char` value for this will be '1'.
* num2 - ...
* num3
* num4
* num5
* num6
* num7
* num8
* num9
* num_enter - Number pad enter key. Note that the `char` value for this will be '\n'.
* num_subtract - Number pad subtract key. Note that the `char` value for this will be '-'.
* num_decimal - Number pad decimal key. Note that the `char` value for this will be '.'.
* num_divide - Number pad divide key. Note that the `char` value for this will be '/'.
* f1 - function key 1
* f2 - ...
* f3
* f4
* f5
* f6
* f7
* f8
* f9
* f10
* f11
* f12
* print - print-screen key
* num - num-lock
* scroll - scroll-lock

## keypress vs keydown/keyup

In handling keyboard events, keydown/keyup is almost always the best choice.
However, there is at least one case where you want keypress over keydown/keyup: cases where copy/paste is used.
If you ctrl-v paste some text into a field, for example, a 'keydown' event will see 'shift' and 'v' pressed,
while a keypress handler will see the actual text you pasted in.

There may be other cases where keypress is necessary, but I'm not aware of them.

If you do use keypress, keep in mind that the `key` value is extrapolated from the `char` value, and so may not accurately represent the key pressed.
If you need accuracy for the `key`, use the 'keydown' event.

How to Contribute!
============

Anything helps:

* Creating issues (aka tickets/bugs/etc). Please feel free to use issues to report bugs, request features, and discuss changes
* Updating the documentation: ie this readme file. Be bold! Help create amazing documentation!
* Submitting pull requests.

How to submit pull requests:

1. Please create an issue and get my input before spending too much time creating a feature. Work with me to ensure your feature or addition is optimal and fits with the purpose of the project.
2. Fork the repository
3. clone your forked repo onto your machine and run `npm install` at its root
4. If you're gonna work on multiple separate things, its best to create a separate branch for each of them
5. edit!
6. If it's a code change, please add to the unit tests (at test/odiffTest.js) to verify that your change
7. When you're done, run the unit tests and ensure they all pass
8. Commit and push your changes
9. Submit a pull request: https://help.github.com/articles/creating-a-pull-request

Change Log
=========

* 0.0.1 - first commit!

Thanks
========

Thanks goes out to dmauro who's [Keypress module](https://github.com/dmauro/Keypress) is where I got most of the keymapping information from.

License
=======
Released under the MIT license: http://opensource.org/licenses/MIT
