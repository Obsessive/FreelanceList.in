import '../scss/index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import SearchInput from 'grommet/components/SearchInput';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Toast from 'grommet/components/Toast';
import CreateListinLayer from './components/CreateListinLayer';
import FeedbackLayer from './components/FeedbackLayer';
import Lists from './components/Lists';
import { processStatus } from 'grommet/utils/Rest';
import 'whatwg-fetch';
var ReactGA = require('react-ga');
ReactGA.initialize('UA-60584820-6');
// providerList should handle its data?
// var providerData = [];

// seekerList should handle its data?
// var seekerData = [];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isFeedbackLayerActive:false,
      isCreateListinLayerActive: false,
      isPendingApprovalToastActive: false,
      seekerData:[],
      providerData:[],
      cities:['Mumbai','Bangalore','Any'],
      city:'Any'
    };
    ReactGA.set({ page: "/" });
    ReactGA.pageview("/");
    // this._getData();
  }

  componentDidMount () {
    const options = { method: 'GET' };
    fetch(`http://data.freelancelist.in/seeking?{"$sort": {"timestamp": -1},"approved":1}`, options,this)
    .then(processStatus)
    .then(response => response.json())
    .then(result =>{
      //keep for data manipulation
      // seekerData=result;
      this.setState({seekerData:result});
    })
    .catch(error => console.log(error));
    fetch(`http://data.freelancelist.in/providing?{"$sort": {"timestamp": -1},"approved":1}`, options)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      //keep this for data manipulation
      // providerData=result;
      this.setState({providerData:result});
    })
    .catch(error => console.log(error));
  }


  _onClose(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ isCreateListinLayerActive: false,isFeedbackLayerActive:false,isPendingApprovalToastActive:false });
  }

  _openCreateListinLayer(type) {
    if (type == 'seeker') {
      this.setState({ isCreateListinLayerActive: true, type: 'seeker', heading: 'Find Someone', title: 'Find someone to work with you on your project' });
      ReactGA.event({
        category: 'Layer',
        action: 'Opened Seeker Create listing layer'
      });
    } else {
      this.setState({ isCreateListinLayerActive: true, type: 'provider', heading: 'Find Projects', title: 'Find projects to work on/with' });
      ReactGA.event({
        category: 'Layer',
        action: 'Opened Provider Create listing layer'
      });
    }
  }

  _openFeedbackLayer() {
    this.setState({ isFeedbackLayerActive: true });
    ReactGA.event({
      category: 'Layer',
      action: 'Opened Feedback layer'
    });
  }

  _createNewSeekerListin(newdata) {
    this.state.seekerData.unshift(newdata);
    var data = JSON.stringify(newdata);
    var headers = { 'Content-Type': 'application/json' };
    const options = { method: 'POST', headers, body: data };
    fetch(`http://data.freelancelist.in/seeking`, options, this)
      .then(processStatus)
      .then(response => console.log(result))
      .then(result => console.log(result))
      .catch(error => this.setState({ result: undefined, error: error }));
    this.setState({ isCreateListinLayerActive: false, isPendingApprovalToastActive: true });
    ReactGA.event({
      category: 'Listing',
      action: 'Created new seeker listing '
    });
  }

  _createNewProviderListin(newdata) {
    this.state.providerData.unshift(newdata);
    var data = JSON.stringify(newdata);
    var headers = { 'Content-Type': 'application/json' };
    const options = { method: 'POST', headers, body: data };
    fetch(`http://data.freelancelist.in/providing`, options, this)
      .then(processStatus)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log(error));
    this.setState({ isCreateListinLayerActive: false, isPendingApprovalToastActive: true });
    ReactGA.event({
      category: 'Listing',
      action: 'Created new provider listing '
    });
  }

  _createNewFeedback(newdata) {
    var data= JSON.stringify( newdata ) ;
    var headers={'Content-Type':'application/json'};
    const options = { method: 'POST',headers,body: data };
    fetch(`http://data.freelancelist.in/feedback`, options,this)
    .then(processStatus)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error));
    this.setState({ isFeedbackLayerActive: false });
    ReactGA.event({
      category: 'Feedback',
      action: 'Created new feedback '
    });
  }

  _citySelect(data) {
    this.setState({city:data.suggestion});
  }

  render() {
    var CreateListin = null;
    if (this.state.isCreateListinLayerActive) {
      if(this.state.type=='seeker')
        CreateListin = (<CreateListinLayer onSubmit={this._createNewSeekerListin.bind(this)} type={this.state.type} title={this.state.title} heading={this.state.heading} onClose={this._onClose.bind(this)}/>);
      else
        CreateListin = (<CreateListinLayer onSubmit={this._createNewProviderListin.bind(this)} type={this.state.type} title={this.state.title} heading={this.state.heading} onClose={this._onClose.bind(this)}/>);
    } else {
      CreateListin = null;
    }
    var FeedbackLayerHook = null;
    if (this.state.isFeedbackLayerActive) {
      FeedbackLayerHook = (<FeedbackLayer onSubmit={this._createNewFeedback.bind(this)} heading='Feedback' title='Tell us how to improve' onClose={this._onClose.bind(this)} />);
    }
    var PendingApprovalToastHook = null;
    if(this.state.isPendingApprovalToastActive) {
      PendingApprovalToastHook = (<Toast status="ok" onClose={this._onClose.bind(this)}>Your listing will be approved and posted shortly. </Toast>);
    }
    return (
      <App inline={false} centered={false}>

        <Header size="large" justify="between" colorIndex="neutral-3-t" pad={{ "horizontal": "medium" }}>
          <Title pad={{ "horizontal": "medium" }}>
            FreelanceList.in (Beta)
          </Title>
          <SearchInput value={this.state.city} onSelect={this._citySelect.bind(this)} suggestions={this.state.cities} iconAlign="start" inline={true}  placeHolder="City" />
          <Box colorIndex="neutral-2">
          <Menu label="Create List.in" dropAlign={{ "right": "right" }} dropColorIndex="neutral-2" >
            <Anchor onClick={this._openCreateListinLayer.bind(this,'seeker')} href="#" className="active">
              Seeking (to hire)
            </Anchor>
            <Anchor onClick={this._openCreateListinLayer.bind(this)} href="#">
              Providing (a Service)
            </Anchor>
            <Anchor onClick={this._openFeedbackLayer.bind(this)} href="#">
              Feedback
            </Anchor>
          </Menu>
          </Box>
        </Header>
        <Lists city={this.state.city} providerData={this.state.providerData} seekerData={this.state.seekerData}/>
        {CreateListin}
        {FeedbackLayerHook}
        {PendingApprovalToastHook}
      </App>
    );
  }
};

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);

document.body.classList.remove('loading');
