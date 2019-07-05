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
      listMembers: {},

    };
    this.choiseElement = this.choiseElement.bind(this);
  }

  choiseElement(org) {
    octokit.orgs.get({org})
      .then(res => {
        octokit.orgs.listMembers({org})
          .then(res2 => {
            console.log(res);
            console.log(res2);
            this.setState({
              orgData: res,
              listMembers: res2,
            });
          });
      });

  }

  render () {
    return (
      <div className='main'>
        <Search choiseElement={this.choiseElement} />
        {this.state.orgData.data ? <View orgData={this.state.orgData} listMembers={this.state.listMembers} /> : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
