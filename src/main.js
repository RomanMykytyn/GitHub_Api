import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search';
import View from './view';
const Octokit = require('@octokit/rest');

const octokit = Octokit();


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      orgData: {},


    };
    this.choiseElement = this.choiseElement.bind(this);
  }

  choiseElement(org) {
    octokit.orgs.get({org})
      .then(res => {
        this.setState({
          orgData: res, 
        });
      });

  }

  render () {
    return (
      <div className='main'>
        <Search choiseElement={this.choiseElement} />
        {this.state.orgData.data ? <View orgData={this.state.orgData} /> : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
