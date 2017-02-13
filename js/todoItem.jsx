import React from 'react';
import classNames from 'classnames';
class  TodoItem extends React.Component{
		constructor(props){
			super(props);
			this.state={
				editingClass:false
			}
		}
		// 双击修改样式
	editTodo(){
		this.setState({
			editingClass:true
		});
	}
	onBlur(){
		this.setState({
			editingClass:false
		})

	}
	componentDidUpdate() {
		this.refs.eadText.focus();
		this.props.todo.text = this.refs.eadText.value;
		this.props.saveTodo;
	}
	render(){
		// 样式
		let liClass=classNames(
			{
				completed:this.props.status,
				editing:this.state.editingClass
			}
		)
		return(
			<div>
				<li className={liClass}>
					<div className="view">
						<input className="toggle" type="checkbox"  onChange={this.props.changeStatus} checked={this.props.status} />
						<label onDoubleClick={this.editTodo.bind(this)}>{this.props.text}</label>
						<button className="destroy" onClick={this.props.delTodo}></button>
					</div>
					<input ref="eadText" className="edit" defaultValue={this.props.text} onBlur={this.onBlur.bind(this)}/>
				</li>
			</div>
		)
	}
}
export default TodoItem
