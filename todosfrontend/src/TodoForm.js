import React, {Component} from 'react';


class TodoForm extends Component{
    constructor(props){
        super(props);
        this.state = {inputValue: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e){            //function to handle state change of input value as soon as something is typed in the the input window
        this.setState(
        {inputValue: e.target.value}
        );
    }
    
    handleSubmit(){
        this.props.addTodo(this.state.inputValue);  //takes in inputValue and sends it to addTodo function in TodoList -> can access it via passed props (from parent to child!)
    }
    
    render(){
        return (
            <div>
                <input 
                    type="text" 
                    value={this.state.inputValue}
                    onChange = {this.handleChange}    //required to change to state of the input window
                />
                <button
                    onClick = {this.handleSubmit}  // on click handleSubmit function gets invoked -> this function calls addTodo function in TodoList to modify state of TodoList
                > 
                    Add Todo 
                </button>
            </div>
            );
    }
    
}



export default TodoForm;