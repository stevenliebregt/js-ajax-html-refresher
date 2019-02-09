class AjaxRefresher {
    /**
     * Create a new AjaxRefresher object.
     * @param object The jQuery element bound to this object.
     * @param options An object of options.
     */
    constructor(object, options) {
        object.data('AjaxRefresher', this);

        this.fresh = true;
        this.running = true;
        this.url = object.data('ar-url');
        this.action = object.data('ar-action') || 'replace';
        this.interval = object.data('ar-interval') || 1000; // 1 second default.
        this.target = object;
        this.setOptions(options);

        this.start();
    }

    /**
     * Sets the JavaScript options such as handlers and processors.
     * @param options An object of options.
     */
    setOptions(options) {
        if (typeof options === 'undefined') {
            return;
        }

        this.processor = options.processor;
        this.handler = options.handler;
    }

    /**
     * Starts the fetching of data.
     */
    start() {
        this.running = true;
        this.fetchData();
    }

    /**
     * Stops the fetching of data.
     */
    stop() {
        this.running = false;
    }

    /**
     * Starts fetching the data and setting an interval after the first execution.
     */
    fetchData() {
        if (this.running) {
            let self = this;

            $.ajax({
                url: self.url,
                type: 'get',
                dataType: 'html'
            }).done(function (data) {
                self.handleData(data);
            });

            setTimeout(this.fetchData.bind(this), this.interval);
        }
    }

    /**
     * Checks if user has defined processor or handler, otherwise acts as default.
     * @param data The data retrieved from the request.
     */
    handleData(data) {
        let $data = $(data);

        // Let user processor alter data.
        if (typeof this.processor !== 'undefined') {
            this.processor($data);
        }

        // Place the data in the DOM.
        if (typeof this.handler !== 'undefined') {
            this.handler(this.target, $data, this.action);
        } else {
            this.placeData($data);
        }
    }

    /**
     * Place the HTML data in the DOM.
     * @param $data The HTML element.
     */
    placeData($data) {
        switch (this.action) {
            case 'replace':
                this.target.html($data);
                break;
            case 'append':
                this.target.append($data);
                break;
            case 'prepend':
                this.target.prepend($data);
                break;
            case 'replace-append':
                if (this.fresh) {
                    this.target.html($data);
                    this.fresh = false;
                } else {
                    this.target.append($data);
                }
                break;
            case 'replace-prepend':
                if (this.fresh) {
                    this.target.html($data);
                    this.fresh = false;
                } else {
                    this.target.prepend($data);
                }
                break;
        }
    }
}

export default AjaxRefresher;