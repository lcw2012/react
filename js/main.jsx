import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './todoItem.jsx';
import Footer from './footer.jsx';
import { Router, Route, Link, hashHistory } from 'react-router';

class Main extends React.Component{
		constructor(props){
			super(props);
			this.state={
				todoList:[
					{id:this.getId,text:'css',status:true}
				]
			}
		}
		getId(){
			return Math.random().toString().substr(2)
		}
	addTodo(e){
		e.preventDefault();
			if(this.refs.todoText.value.length>0){
					this.state.todoList.push({id:this.getId(),text:this.refs.todoText.value,status:false});
					this.setState({});
					this.refs.todoText.value='';
			}
	}
	// 删除数据
	delTodo(todo){
		var index=this.state.todoList.indexOf(todo);
			this.state.todoList.splice(index,1);
		this.setState({});
	}
	// 修改
	changeStatus(todo){
		todo.status=!todo.status;
		this.setState({});
	}
	// 保存
	saveTodo(){
		this.setState({})
	}
	//清除已完成的数据
	clearCompleted(){
		let templist=this.state.todoList.filter((todo)=>{
			return todo.status==false;
		});
		this.setState({
			todoList:templist
		})
	}
	//全选切换
	changeToggleAll(status){
		this.state.todoList.filter(todo=>{
				todo.status=!status
		})
		this.setState({});
	}

	render(){
		//监视数据的变化
		console.log(this.props.params);
		let tempTodoList=[];
		switch(this.props.params.status){
			case 'active':
				tempTodoList=this.state.todoList.filter((todo)=>{
					return todo.status==false
				});
				break;
			case 'completed':
				tempTodoList=this.state.todoList.filter((todo)=>{
					return todo.status==true
				});
				break;
			default:
				tempTodoList=this.state.todoList;
				break;
		}
		// 统计数据
		let leftNum=this.state.todoList.filter((todo)=>{
				return todo.status==false;
		}).length;
		let toggleAll=!leftNum;
		return(
			<div>
				<header className="header">
					<h1>React</h1>
					<form onSubmit={this.addTodo.bind(this)}>
						<input ref='todoText' className="new-todo" placeholder="What needs to be done?" autoFocus=""/>
					</form>
				</header>
				<section className="main">
					<input className="toggle-all" onChange={this.changeToggleAll.bind(this,toggleAll)} type="checkbox" checked={toggleAll}  />
						<label htmlFor="toggle-all">Mark all as complete</label>
						<ul className="todo-list">
							{
								tempTodoList.map((todo)=>{
									return <TodoItem
										todo={todo}
										key={todo.id}
										status={todo.status}
										text={todo.text}
										saveTodo={this.saveTodo.bind(this)}
										delTodo={this.delTodo.bind(this,todo)}
										changeStatus={this.changeStatus.bind(this,todo)}
									></TodoItem>
								})
							}
						</ul>
				</section>
				<Footer
					leftNum={leftNum}
					clearCompleted={this.clearCompleted.bind(this)}
				></Footer>
			</div>
		)
	}
}

	ReactDOM.render(<Router history={hashHistory}>
		<Route path="/(:status)" component={Main}></Route>
	</Router>,document.getElementsByClassName('todoapp')[0]);
