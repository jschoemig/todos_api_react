import React, {Component} from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import * as apiCalls from './api';  // copies everything over from helper document api.js

//import fetch from 'cross-fetch';  //that caused an error: have to ignor yellow triangle


class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        };
        this.addTodo = this.addTodo.bind(this);
    }
    
    componentWillMount(){
        this.loadTodos();
    }
    
    async loadTodos(){
        let todos = await apiCalls.getTodos();  //the function waits till fetch in getTodos has returned -- either successfully or not
        this.setState({todos});                  //since it is an asyn function it does not return a promise, but the array itself. Hence don't need .then anymore
    }
    
    async addTodo(val){          // takes in value from input
        let newTodo = await apiCalls.createTodo(val);
        this.setState({todos: [...this.state.todos, newTodo]});
    }
    
    async deleteTodo(id){
        await apiCalls.removeTodo(id);                                  //with the delete function we're not expecting any answer to come back and to change our states
        const todos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({todos: todos});
    }
    
    async toggleTodo(todo){
        let updatedTodo = await apiCalls.updateTodo(todo);
        const todos = this.state.todos.map(t => 
            (t.id === updatedTodo._id)          // forEach todo id: is it part of the response of the put request??
            ? {...t, completed: !t.completed}   // true: updated completed key of selected todo 
            : t                                 // false: just but the todo item as it is in the newarry
            );
        this.setState({todos: todos});

        
    }
    
    render(){
        const todos = this.state.todos.map((t) => (
            <TodoItem
                key={t._id}
                {...t}
                onDelete = {this.deleteTodo.bind(this, t._id)}   //have to bind it here - and not above - because this should refer to each item individually
                onToggle = {this.toggleTodo.bind(this,t)}        // include entire todo array (t) because not only id but as completed is required this time
            />
            ));
        return(                                         //only allowed to return one item -> hence have to wrap everything in the div 
            <div>
                <h1> TodoList! </h1>
                <TodoForm addTodo = {this.addTodo} />
                <ul>
                    {todos}
                </ul>
            </div>
        );
    }
}

export default TodoList;