# AJAX HTML Refresher

Little jQuery plugin which allows you to easily load AJAX HTML to your HTML.

## Dependencies

Depends on jQuery.

## Basic usage

See the `example` directory for a basic example.

## Options

### HTML element options

#### data-ar-url

#### data-ar-action (optional)

#### data-ar-interval (optional)

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