import React, { Component } from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import ProviderLayer from './ProviderLayer';

export default class ProviderList extends Component {

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

  _nextListing() {
    if ((this.state.id != null) && (this.props.providerData.length - 1 > this.state.id)) {
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
      var id = this.state.id;
      id = id - 1;
      this.setState({ id: id });
      console.log(this.state.id);

    }
  }

  _DetailViewOpen(id) {
    var currentProviderItem = this.props.providerData[id];
    this.currentProviderTitle = currentProviderItem.title;
    this.currentProviderCity = currentProviderItem.city;
    this.setState({ isLayerActive: true, id: id });
  }

  render() {
    var activeLayer = null;
    if (this.state.isLayerActive) {
      activeLayer = (<ProviderLayer onPreviousButton={this._previousListing.bind(this)} onNextButton={this._nextListing.bind(this)} data={this.props.providerData[this.state.id]} onClose={this._onClose.bind(this)}/>);
    } else {
      activeLayer = null;
    }
    return (
      <List separator="left">
        {this.props.providerData.map((Data, i) => {
          if (this.props.city == Data.city || this.props.city == 'Any') {
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
