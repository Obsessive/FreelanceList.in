import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
import { fetchProjects } from './actions'


class ProjectList extends React.Component {

	componentDidMount(){
		this.props.fetchProjects()
	}

	render() {

		return(
			<Paper className="ProjectList-container">
				{Object.keys(this.props.projects.list).map(key => {
					let project = this.props.projects.list[key]
					return(
						<Link to={`/projects/${project.id}`} key={key} style={{textDecoration: 'none' }}>
				      <div className="ProjectList-item" >
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
		      	</Link>
					)
				})}
			</Paper>
		)
	}
}

const mapStateToProps = ({ projects }) => ({
	projects
})

const mapDispatchToProps = (dispatch) => ({
	fetchProjects: () => { dispatch(fetchProjects()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)