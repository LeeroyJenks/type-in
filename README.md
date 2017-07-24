# type-in
A jQuery plugin that types in from one text to the next. Allows for multi-colored multi-element text.

## Demo
[plugins.getdans.info/type-in](http://plugins.getdans.info/type-in)

## Installation
Download from GitHub

### Requirements
jQuery

### Use
```html
<script>
    $(document).ready(function(){
        $('.display-word').typeIn({
            textClass: '.word'
        });
    });
</script>
```
### Description

You must call type-in on an empty container where you would like the words to appear. You **MUST** define a textClass in order for type-in to work. Each text must be within a `<span>` element within the container with the textClass. This allows for multi-colored phrases to be used. For example, if you want a phrase with two different colors, you can use<br>`<div class="textClass"><span>Phrase color one </span><span>phrase color two.</span></div>`.

### Example

```html
<div class="display-word"></div>
<ul>
    <li class="word"><span>Word 1.</span></li>
    <li class="word"><span>Phrase </span><span>one</span></li>
    <li class="word"><span>Word 2.</span></li>
    <li class="word"><span>Word 3.</span></li>
    <li class="word"><span>Word 4.</span></li>
</ul>

<script>
    $(document).ready(function(){
        $('.display-word').typeIn({
            textClass: '.word',
            startTime: 2000,
            interval: 2000,
            frames: 2
        });
    });
</script>
```

### Options

Options     | Definition
----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
`textClass` | **(required)**<br>Class of the word containers.<br>The words will appear in the order they are in the DOM.
`frames`    | type-in uses `requestAnimationFrame` to go through the possible string.<br>This is the number of frames type-in will go through before revealing the next letter.<br>`default: 0`
`startTime` | Delay before type-in starts, in milliseconds.<br>`default: 5000`
`interval`  | Time between when a word is revealed and when it is hidden again for the next word to be displayed.<br>`default: 5000`
