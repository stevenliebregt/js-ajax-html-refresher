# AJAX HTML Refresher

Little jQuery plugin which allows you to easily load AJAX HTML to your HTML.

## Dependencies

Depends on jQuery.

## Installation

Install it using NPM.

`npm i ajax-html-refresher`

## Basic usage

```html
<!doctype html>
<html>
<head>
    <title>Page title</title>
</head>
<body>
<div class="ajax-refresh"
     data-ar-url="/some/request">
    <img src="loading.gif">
</div>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="../dist/ajax-html-refresher.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $('.ajax-refresh').AjaxRefresher();
    });
</script>
</body>
</html>
```
See the `example` directory for an example with a bit more features.

## Options

### HTML element options

HTML element options must be set on the element that you will use to create the `AjaxRefresher`.

#### data-ar-url

The URL used to fetch the data.

#### data-ar-action (optional)

**default:** replace

The action to use to handle the data, by default this is `replace`. The different options are:

| option            | description |
| ----------------- | ----------- |
| replace           | Replaces the HTML in the target with the newly fetched data |
| append            | Appends the HTML to the target |
| prepend           | Prepends the HTML to the target |
| replace-append    | Replaces the HTML the first time, then appends it on subsequent passes |
| replace-prepend   | Replaces the HTML the first time, then prepends it on subsequent passes |

#### data-ar-interval (optional)

**default:** 1000

The interval on which the data will be fetched. Should be expressed in milliseconds.

### JavaScript options

You can also add some extra options when initializing the object to alter the behavior of the refresher.

#### processor(data)

The `processor` method is called after the data has been fetched, with the fetched data as it's parameter. You can then
use the `processor` to alter the data. For example, you can change a specific class element to display the current date.

**Let's say this is what your URL returns.**
```html
<div>
    <p><b class="date"></b></p>
    <p>The rest of my content...</p>
</div>
```

And you want the selector `b.date` to contain the current date, then you create the following processor in the initializer.

```js 
$('.ajax-refresher').AjaxRefresher({
    processor: function (data) {
        data.find('b.date').html(new Date().toISOString());
    }
});
```

Since the data is a reference, you will only need to edit it and it will now show the date instead of an empty tag.

#### handler(target, $data, action)

The `handler` method is used to place the data into the page, it gets the following arguments:

**target**

The element used to create the `AjaxRefresher`.

**$data**

A jQuery object representing the fetched or processed data.

**action**

The action set on the element.

```js
$('.ajax-refresher').AjaxRefresher({
    handler: function (target, $data, action) {
        console.log('I only want to log it', $data);
    }
});
```

The above would not show on the page, but instead log everything to the console.