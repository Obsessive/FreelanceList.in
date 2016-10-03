import React, { Component } from 'react';
import Layer from 'grommet/components/Layer';
// import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
// import MapIcon from 'grommet/components/icons/base/MapLocation';
// import Card from 'grommet/components/Card';
// import Status from 'grommet/components/icons/Status';
// import Timestamp from 'grommet/components/Timestamp';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
// import SearchInput from 'grommet/components/SearchInput';

export default class FeedbackLayer extends Component {

  constructor() {
    super();
    this.state={
      title:'',
      description:'',
      city:'',
      cities:['Mumbai','Bangalore','Other']
    };
  }

  _onChange(event) {
    this.setState({title: event.target.value});
    console.log(this.state.title);
  }

  _validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _citySelect(data) {
    this.setState({city:data.suggestion});
  }

  _onSubmit(e) {
    e.preventDefault();
    var jstimestamp=new Date();
    console.log(jstimestamp);
    if(this._validateEmail(this.refs.email.value)) {
      console.log('Z: email is valid');
    }else{
      console.log('invalid');
      alert("Please veryify email address");
      return;
    }
    var newdata={email:this.refs.email.value,feedback:this.refs.feedback.value,city:this.refs.city.value,timestamp:jstimestamp};
    this.props.onSubmit(newdata);
  }

  _onClick() {

  }

  render() {
    return (
      <Layer onClose={this.props.onClose} closer={true}
        align="top" a11yTitle={'ok'}>
        <Box pad={{ vertical: 'large', horizontal: 'small' }}>
          <Form onSubmit={this._onSubmit.bind(this)}>
            <Heading align="center">{this.props.heading}</Heading>
            <Header align="center">{this.props.title}</Header>
            <FormField label="Feedback" htmlFor="item1" >
              <textarea ref="feedback" id="item1" rows="5" type="text" />
            </FormField>
            <FormField label="City" htmlFor="item1" >
              <select ref="city">
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              </select>
            </FormField>
            <FormField label="email" htmlFor="item1" >
              <input type="email" ref="email" id="email" />
            </FormField>
            <Button onClick={this._onClick.bind(this)} type="submit" label="Submit feedback" primary={true} strong={true} />
          </Form>
        </Box>
      </Layer>
    );


  }
};
