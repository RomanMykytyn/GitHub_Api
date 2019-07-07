import React from 'react';
const Octokit = require('@octokit/rest');
import PaginationBlock from './pagination';
import parseData from './parseData';

const octokit = Octokit();

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      listResult: {},
      paginationData: [],
      currentPage: 1,

    };
    this.handlerInput = this.handlerInput.bind(this);
    this.handlerSearch = this.handlerSearch.bind(this);
    this.choiseElement = this.choiseElement.bind(this);
    this.handlerPagination = this.handlerPagination.bind(this);
  }

  handlerSearch() {
    console.log(this.searchString);

    if (this.searchString) {
      let q = this.searchString.split(' ').join('+') + '+type:org';
      console.log(q);
      octokit.search.users({q})
        .then(res => {
          console.log(res);
          this.setState({
            listResult: res,
            paginationData: parseData(res.headers.link),
            currentPage: 1,
          });
          console.log(res.headers.link);
          console.log(parseData(res.headers.link));
        })
    }
  }

  handlerInput(event) {
    this.searchString = event.target.value;
  }

  choiseElement(el) {
    this.element ? this.element.classList.remove('selected') : null;
    this.element = document.getElementById(el.target.id);
    document.getElementById(el.target.id).classList.add('selected');
    this.props.choiseElement(el.target.id);
  }

  handlerPagination(event) {
    let q = event.target.value;
    console.log(q);
    octokit.request(q)
      .then(res => {
        console.log(res);
        let numberPage = res.url.match(/\d+/g);
        this.setState({
          listResult: res,
          paginationData: parseData(res.headers.link),
          currentPage: Number(numberPage[numberPage.length-1]),
        });
      })
  }

  render () {
    let total = this.state.listResult.data;
    if (total) {
      let startNumber = (this.state.currentPage * 30 - 29).toString();
      console.log(startNumber);
      var resultSearch = <div><p>Results: {total.total_count}   Page: {this.state.currentPage}</p>
        <ol start={startNumber}>{this.state.listResult.data.items.map(el =>
          (<li key={el.login}><span className='itemSearch' id={el.login} onClick={this.choiseElement}>
            {el.login}</span></li>))}</ol></div>;
    }
    else {
      var resultSearch = null;
    }
    

    return (
      <div className='search'>
        <div className='searchField'>
          <input type='text' placeholder='Enter search string.' onChange={this.handlerInput} required />
          <button className='btn' onClick={this.handlerSearch}>OK</button>
        </div>
          <div className='resultSearch'>
            {resultSearch}
            <PaginationBlock paginationData={this.state.paginationData} handlerPagination={this.handlerPagination} />
        </div>
      </div>
    );
  }
}

export default Search;
