import React from 'react';
import Paper from 'material-ui/Paper';
import './style.css'

const projects = [
	{
		id: 1,
		name: "Wordpress Website",
		openJobs: 4,
		hourCost: 300,
	},
	{
		id: 2,
		name: "React App",
		openJobs: 5,
		hourCost: 200,
	},
	{
		id: 3,
		name: "Ecommerce website",
		openJobs: 7,
		hourCost: 400,
	},
	{
		id: 4,
		name: "Wordpress Website",
		openJobs: 4,
		hourCost: 200,
	},
	{
		id: 5,
		name: "React Redux App",
		openJobs: 4,
		hourCost: 300,
	}
]


class ProjectList extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			projects
		}

	}


	render() {
		return(
			<Paper className="ProjectList-container" >
				{this.state.projects.map(project => {
					return(
			      <div className="ProjectList-item" key={project.id}>
			      	<span className="ProjectList-item-name">{project.name}</span>
			      	<div className="ProjectList-item-details">
			      		<div>
			      			<span>{project.openJobs} jobs open</span>
			      		</div>
			      		<div >
			      			<span>{project.hourCost} &#8377; / hour</span>
			      		</div>
			      	</div>
			      </div>
					)
				})}
			</Paper>
		)
	}
}

export default ProjectList