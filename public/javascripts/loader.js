var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader(props) {
        _classCallCheck(this, Loader);

        var _this = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(Loader, [{
        key: "handleClick",
        value: function handleClick() {

            // fetch("http://157.245.170.229/Countries")
            // .then(response => JSON.stringify(response))
            // .then(data => localStorage.setItem('Country', data));
            $.get("http://157.245.170.229/Countries/", function (response) {

                var obj = JSON.parse(response);
                obj.forEach(function (element) {
                    var test1 = JSON.stringify(element);
                    localStorage.setItem("Country", test1);
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                {
                    onClick: this.handleClick
                },
                "Store Data"
            );
        }
    }]);

    return Loader;
}(React.Component);

var domContainer = document.getElementById('loader_container');
ReactDOM.render(React.createElement(Loader, null), domContainer);