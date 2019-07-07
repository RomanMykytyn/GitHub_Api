import React from 'react';
const Octokit = require('@octokit/rest');
import PaginationBlock from './pagination';
import List from './list';
import Card from './card';
import parseData from './parseData';
const octokit = Octokit();

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      listMembers: {},
      paginationData: {},
      currentPage: 1,
      totalPages: 1,
      followersView: false,
      followingView: false,
      loginForList: '',
      modalView: false,
      loginForModal: '',

    };
    this.handlerPagination = this.handlerPagination.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handlerButton = this.handlerButton.bind(this);
    this.handlerclick = this.handlerclick.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.orgData.data.login !== prevProps.orgData.data.login) {
      this.updateData();
    }
  }

  updateData() {
    let org = this.props.orgData.data.login;
    octokit.orgs.listMembers({org})
      .then(res => {
        console.log(res);
        let page = parseData(res.headers.link);
        let total = 1;
        if (page.last) {
          total = page.last.match(/\d+/g);
          total = Number(total[total.length-1])
        }
        this.setState({
          listMembers: res,
          paginationData: page,
          totalPages: total,
        });
      });
  }

  handlerPagination(event) {
    let q = event.target.value;
    console.log(q);
    octokit.request(q)
      .then(res => {
        console.log(res);
        let numberPage = res.url.match(/\d+/g);
        this.setState({
          listMembers: res,
          paginationData: parseData(res.headers.link),
          currentPage: Number(numberPage[numberPage.length-1]),
        });
      })
  }

  handlerButton(event) {
    if (event.target.id === 'followers') {
      this.setState({
        followers: true,
        following: false,
        loginForList: event.target.value,
      });
    }
    else {
      this.setState({
        followers: false,
        following: true,
        loginForList: event.target.value,
      });
    }
  }

  handlerclick(event) {
    if (event.target.value === 'close') {
      this.setState({
        modalView: false,
      });
    }
    else {
      this.setState({
        modalView: true,
        loginForModal: event.target.id,
      });
    }
  }

  render () {
    if (this.state.listMembers.data && this.state.listMembers.data.length === 0) {
      var list = "Members doesn't exist.";
    }
    else {
      var list = <div><p>Current page: {this.state.currentPage} Pages: {this.state.totalPages}</p>
      {this.state.listMembers.data ? this.state.listMembers.data.map(el =>
        (<div className='itemMembers' key={el.login}>
          <img width='50' height='50' src={el.avatar_url} />
          <p>{el.login}</p>
          <button value={el.login} id='followers' onClick={this.handlerButton}>Followers</button>
          <button value={el.login} id='following' onClick={this.handlerButton}>Following</button>
          {el.login === this.state.loginForList &&
          <>
            {this.state.followers ? <List end={el.followers_url} click={this.handlerclick} /> : null}
            {this.state.following ? <List end={el.following_url} click={this.handlerclick} /> : null}
          </>}
        </div>)) : 'Loading'}</div>
    }
    return (
      <div className='viewBox'>
        <div className='basicOrg'>
          <Card login={this.props.orgData.data.login} type='common' close={this.handlerclick} />
          <div className='listMembers'>
            {list}
            <PaginationBlock paginationData={this.state.paginationData} handlerPagination={this.handlerPagination} />
          </div>
          {this.state.modalView ? <Card login={this.state.loginForModal} type='modal' close={this.handlerclick} /> : null}
        </div>
      </div>
    );
  }
}

export default View;
