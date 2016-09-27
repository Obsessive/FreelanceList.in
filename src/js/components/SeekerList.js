import React, { Component } from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import SeekerLayer from './SeekerLayer';

export default class SeekerList extends Component {

  constructor(props) {
    super(props);
    this.state = { isLayerActive: false };
  }
  _onClose(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ isLayerActive: false });
  }
  _DetailViewOpen(id) {
    var currentSeekerItem = this.props.seekerData[id];
    this.currentSeekerTitle = currentSeekerItem.title;
    this.currentSeekerCity = currentSeekerItem.city;
    this.setState({ isLayerActive: true, id: id });
  }
  _nextListing() {
    if ((this.state.id != null) && (this.props.seekerData.length - 1 > this.state.id)) {
      console.log('not null');
      var id = this.state.id;
      id = id + 1;
      this.setState({ id: id });
      console.log(this.state.id);

    } else {
      console.log('null');
    }
  }
  _previousListing() {
    if ((this.state.id != null) && (this.state.id != 0)) {
      console.log('not null');
      var id = this.state.id;
      id = id - 1;
      this.setState({ id: id });
      console.log(this.state.id);

    } else {
      console.log('null');
    }
  }

  render() {
    var activeLayer = null;
    if (this.state.isLayerActive) {
      activeLayer = (<SeekerLayer onPreviousButton={this._previousListing.bind(this)} onNextButton={this._nextListing.bind(this)} data={this.props.seekerData[this.state.id]} onClose={this._onClose.bind(this)}/>);
    } else {
      activeLayer = null;
    }
    return (
      <List separator="right">
        {this.props.seekerData.map((Data, i) => {
          if (this.props.city == Data.city || this.props.city == '') {
            return (<ListItem onClick={this._DetailViewOpen.bind(this, i)} key={i}>
              <span className="secondary">{Data.title}</span>
            </ListItem>);
          }
        })}
        {activeLayer}
      </List>
    );
  }
};
