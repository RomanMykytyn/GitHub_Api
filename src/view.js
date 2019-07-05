import React from 'react';
const Octokit = require('@octokit/rest');
import PaginationBlock from './pagination';
import parseData from './parseData';
const octokit = Octokit();

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      paginationData: [],
      currentPage: 1,

    };
    //this.handlerInput = this.handlerInput.bind(this);

  }


  render () {
    console.log('xxx');
    let page = parseData(this.props.listMembers.headers.link);
    if ( page !== this.state.paginationData ) {
      this.setState({
        paginationData: page,
      });
    }
    return (
      <div className='viewBox'>
        <div className='basicOrg'>
          <img width='175' height='175' src={this.props.orgData.data.avatar_url} />
          <div className='description'>
            <p>{this.props.orgData.data.name}</p>
            <p>Description: {this.props.orgData.data.description}</p>
            <p>Created at: {this.props.orgData.data.created_at}</p>
            <p>E-mail: {this.props.orgData.data.email}</p>
            <p>Public repos: {this.props.orgData.data.public_repos}</p>
            <a href={this.props.orgData.data.html_url}>{this.props.orgData.data.html_url}</a>
          </div>
          <div className='listMembers'>
            {this.props.listMembers.data.map(el =>
              (<div className='itemMembers' key={el.login}>
                <img width='50' height='50' src={el.avatar_url} />
                <p>{el.login}</p>
                <button value={el.login} id='followers' onClick={this.handlerButton}>Followers</button>
                <button value={el.login} id='following' onClick={this.handlerButton}>Following</button>
              </div>))}
            <PaginationBlock paginationData={this.state.paginationData} />
          </div>
        </div>
      </div>
    );
  }
}

export default View;
