var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Delete = function (_React$Component) {
    _inherits(Delete, _React$Component);

    function Delete(props) {
        _classCallCheck(this, Delete);

        var _this = _possibleConstructorReturn(this, (Delete.__proto__ || Object.getPrototypeOf(Delete)).call(this, props));

        _this.state = { value: '' };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(Delete, [{
        key: 'handleChange',
        value: function handleChange() {
            this.setState({ value: event.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            // console.log(this.state.value)
            //   fetch("http://157.245.170.229/Countries/" + this.state.value,{
            //     method: 'DELETE',
            //     headers:{
            //        'Content-Type': 'apllication/json'
            //     },
            //     body: JSON.stringify({
            //         name: this.state.value
            //     })
            //   }).then(console.log(this.state.value));
            $.ajax({
                url: "http://157.245.170.229/Countries/" + this.state.value,
                type: 'DELETE',
                success: function success(result) {
                    console.log("Removed");
                },
                statusCode: {
                    400: function _() {
                        console.log("Country not found");
                    }
                }
            });
            localStorage.removeItem(this.state.value);
            console.log("end loop");

            event.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                React.createElement(
                    'label',
                    null,
                    'Delete Country:',
                    React.createElement('input', { value: this.state.value, onChange: this.handleChange, type: 'text' })
                ),
                React.createElement('input', { type: 'submit', value: 'Submit' })
            );
        }
    }]);

    return Delete;
}(React.Component);

var domContainer = document.getElementById('delete_container');
ReactDOM.render(React.createElement(Delete, null), domContainer);