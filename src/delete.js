class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange() {
        this.setState({value: event.target.value})
    }
    handleSubmit(event){
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
        url:"http://157.245.170.229/Countries/"+ this.state.value,
        type: 'DELETE',
        success: (result) =>{
            console.log("Removed");
        },
        statusCode: {
            400: () =>{
                console.log("Country not found")
            }
        }
    });
        localStorage.removeItem(this.state.value);
      console.log("end loop");
      
      event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                     Delete Country:
                     <input value={this.state.value} onChange={this.handleChange}type="text"/> 
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


let domContainer = document.getElementById('delete_container');
ReactDOM.render(<Delete />, domContainer);
