class Form extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
        <form>

            <Select/>
        </form>
        );
    }
}
class Select extends React.Component{
    
    render(){
        return(
            <select>
                <option value="NZ">NZ</option>
                <option value="Kuait">Kuait</option>

            </select>
        );
    }
}
let domContainer = document.getElementById('like_button_container');
ReactDOM.render(<Form stuff="Me" />, domContainer);
export default Form;
