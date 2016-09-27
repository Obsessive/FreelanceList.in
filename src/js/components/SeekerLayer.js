import React, { Component } from 'react';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
// import MapIcon from 'grommet/components/icons/base/MapLocation';
import Card from 'grommet/components/Card';
// import Status from 'grommet/components/icons/Status';
import Timestamp from 'grommet/components/Timestamp';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
// import FormField from 'grommet/components/FormField';
import KeyboardAccelerators from 'grommet/utils/KeyboardAccelerators';
import Markdown from 'grommet/components/Markdown';
// import NextIcon from 'grommet/components/icons/base/Next';
// import PreviousIcon from 'grommet/components/icons/base/Previous';

export default class SeekerLayer extends Component {

  constructor() {
    super();
  }

  componentDidMount () {
    this._keys = {left: this.props.onPreviousButton, right: this.props.onNextButton};
    KeyboardAccelerators.startListeningToKeyboard(this, this._keys);
    // load index from location
    const index = parseInt(window.location.hash.slice(1), 10);
    this.setState({ index: index || 0 });
  }

  componentWillUnmount () {
    KeyboardAccelerators.stopListeningToKeyboard(this, this._keys);
  }

  render() {

    return (
      <Layer onClose={this.props.onClose} closer={true}
        align="left" a11yTitle={'ok'}>
        <Box pad={{ vertical: 'large', horizontal: 'small' }}>
          <Form>
          <input type="text" value={this.props.data.email} />
            <Card contentPad="none" label={this.props.data.city} heading={this.props.data.title} description={<Markdown content={this.props.data.description} />} />
            <Label size="small">Posted: <Timestamp value={this.props.data.timestamp} /></Label>
            <Box direction="row" alignContent="center">
              <Box  flex={true} align="start">
                <Button margin="small" onClick={this.props.onPreviousButton} > Previous </Button>
              </Box>
              <Box flex={false} align="start">
                <Button onClick={this.props.onNextButton} > Next </Button>
              </Box>
            </Box>

          </Form>
        </Box>
      </Layer>
    );
  }
};
