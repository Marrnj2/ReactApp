class Loader extends React.Component{
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        
        fetch("http://157.245.170.229/Countries")
        .then(response => JSON.stringify(response))
        .then(data => localStorage.setItem('Country', data));
        // country = $.get("157.245.170.229/Countries", (response) =>{
        //     console.log(response);
        // });
    }
    render(){
        return(
            <button
            onClick={this.handleClick}
            >Store Data</button>
        );
    }
}
let domContainer = document.getElementById('loader_container');
ReactDOM.render(<Loader/>, domContainer);