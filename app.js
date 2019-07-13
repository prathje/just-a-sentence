function copyText(textToCopy) {

    var myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = textToCopy;

    document.body.appendChild(myTemporaryInputElement);

    myTemporaryInputElement.select();
    document.execCommand("Copy");

    document.body.removeChild(myTemporaryInputElement);
};


var app = new Vue({
    el: '#app',
    data: {
        current: '',
        history: [],
        historyString: ''
    },
    methods: {
        onEnter: function() {
            this.history.push(this.current);
            this.current = '';
            this.historyString = (this.history.map(
                function (s) {
                    if (s == "") {
                        return "\n";
                    } else if (s.endsWith('.') || s.endsWith('!') || s.endsWith('?') || s.endsWith(':')) {
                        return s;
                    } else {
                        return s + ".";
                    }
                }
            ).join(' '));
            localStorage.history = JSON.stringify(this.history);
            localStorage.current = this.current;
            localStorage.historyString = this.historyString;
        },
        copy: function () {
            copyText(this.historyString);
        },
        copyAndDelete: function () {
            copyText(this.historyString);
            this.current = '';
            this.history = [];
            this.historyString = '';
            localStorage.history = JSON.stringify(this.history);
            localStorage.current = this.current;
            localStorage.historyString = this.historyString;
        }
    },
    mounted() {
        if (localStorage.current) {
            this.current = localStorage.current;
        }

        if (localStorage.history) {
            this.history = JSON.parse(localStorage.history);
        }
    },
    watch: {
        current(newCurrent) {
            localStorage.current = newCurrent;
        }
    }
});
