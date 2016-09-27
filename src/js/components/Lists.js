import React, { Component } from 'react';
import SeekerList from './SeekerList';
import ProviderList from './ProviderList';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Heading from 'grommet/components/Heading';
export default class Lists extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Split fixed={true} showOnResponsive="both">
        <Box  separator="right">
          <Heading align="center" tag="h1" id="seekerheading">
            Seeking
          </Heading>
          <SeekerList city={this.props.city} seekerData={this.props.seekerData} />
        </Box>

        <Box>
          <Heading align="center" tag="h1">
            Providing
          </Heading>
          <ProviderList city={this.props.city} providerData={this.props.providerData} />
        </Box>
      </Split>
    );
  }
};
