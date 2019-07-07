import React from 'react';
const Octokit = require('@octokit/rest');
const octokit = Octokit();


class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      orgData: {},

    };
    this.handlerButton = this.handlerButton.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.login !== prevProps.login) {
      this.updateData();
    }
  }

  updateData() {
    let username = this.props.login;
    octokit.users.getByUsername({username})
      .then(res => {
        console.log(res);
        this.setState({
          orgData: res,
        });
      });
  }

  handlerButton(event) {
    this.props.close(event);
  }

  render () {
    if (this.props.type === 'modal') {
      var buttonClass = 'modalInfo';
    }
    else{
      var buttonClass = 'basicOrg2';
    }
    return (
      <div className={this.props.type}>
      {this.state.orgData.data ?
        <div className={buttonClass}>
          <img width='175' height='175' src={this.state.orgData.data.avatar_url} />
          <div className='description'>
            <p>{this.state.orgData.data.name}</p>
            <p>Description: {this.state.orgData.data.description}</p>
            <p>Created at: {this.state.orgData.data.created_at}</p>
            <p>E-mail: {this.state.orgData.data.email}</p>
            <p>Public repos: {this.state.orgData.data.public_repos}</p>
            <a href={this.state.orgData.data.html_url}>{this.state.orgData.data.html_url}</a>
          </div>
          {this.props.type === 'modal' &&
            <button className='btnClose' value='close' onClick={this.handlerButton}>Close.</button>}
        </div> : 'Loading.'}
      </div>
    )
  }
}

export default Card;
