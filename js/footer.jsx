import React from 'react'
class Footer extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<footer className="footer">
					<span className="todo-count"><strong>{this.props.leftNum}</strong> item left</span>
					<ul className="filters">
						<li>
							<a className="selected" href="#/">All</a>
						</li>
						<li>
							<a href="#/active">Active</a>
						</li>
						<li>
							<a href="#/completed">Completed</a>
						</li>
					</ul>
					<button className="clear-completed" onClick={this.props.clearCompleted}>Clear completed</button>
				</footer>
			</div>
		)
	}
}
export default Footer;
