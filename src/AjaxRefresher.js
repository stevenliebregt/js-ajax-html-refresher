class AjaxRefresher {
    constructor(object, options) {
        this.fresh = true;
        this.url = object.data('ar-url');
        this.action = object.data('ar-action') || 'replace';
        this.interval = object.data('ar-interval') || 1000; // 1 second default.
        this.target = object;
        this.setOptions(options);
        this.fetchData();
    }

    setOptions(options) {
        if (typeof options === 'undefined') {
            return;
        }

        this.processor = options.processor;
    }

    fetchData() {
        let self = this;

        $.ajax({
            url: self.url,
            type: 'get',
            dataType: 'html'
        }).done(function(data) {
            self.handleData(data);
        });

        setTimeout(this.fetchData.bind(this), this.interval);
    }

    handleData(data) {
        let $data = $(data);

        // Let user processor alter data.
        if (typeof this.processor !== 'undefined') {
            this.processor($data);
        }

        // Place the data in the DOM.
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

export default AjaxRefresher