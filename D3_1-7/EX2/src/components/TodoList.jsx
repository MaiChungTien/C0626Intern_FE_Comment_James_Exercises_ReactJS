import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { 
        list: [],
        item: ""
     }
    handleChange = (event) => {
        this.setState({item: event.target.value})
    }
    handleAddItem =() => {
        this.setState({
            list: [...this.state.list, this.state.item],
            item:""
        })
    }
    render() { 
        console.log(this.state.list)
        return ( 
            <div className="todo-container">
                <h1>Todo List</h1>
                <span className="input-group">
                    <input type="text"
                           value={this.state.item}
                           onChange={this.handleChange}
                    />
                    <button onClick={this.handleAddItem}>Add</button>
                </span>
                <ul className="list">
                    {this.state.list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
         );
    }
}
 
export default TodoList;