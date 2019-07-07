import React from 'react';
const Octokit = require('@octokit/rest');
import PaginationBlock from './pagination';
import parseData from './parseData';
const octokit = Octokit();


class List extends React.Component {
  constructor() {
    super();
    this.state = {
      list: {},
      paginationData: {},
      currentPage: 1,
      totalPages: 1,

    };
    this.handlerPagination = this.handlerPagination.bind(this);
    this.choiseElement = this.choiseElement.bind(this);
  }

  componentDidMount() {
    octokit.request(this.props.end)
      .then(res => {
        console.log(res);
        let numberPage = res.url.match(/\d+/g);
        let page = parseData(res.headers.link);
        let total = 1;
        if (page.last) {
          total = page.last.match(/\d+/g);
          total = Number(total[total.length-1])
        }
        this.setState({
          list: res,
          paginationData: page,
          totalPages: total,
        });
      })
  }

  handlerPagination(event) {
    let q = event.target.value;
    console.log(q);
    octokit.request(q)
      .then(res => {
        console.log(res);
        let numberPage = res.url.match(/\d+/g);
        this.setState({
          list: res,
          paginationData: parseData(res.headers.link),
          currentPage: Number(numberPage[numberPage.length-1]),
        });
      })
  }

  choiseElement(event) {
    this.props.click(event);
  }

  render () {
    var startNumber = (this.state.currentPage * 30 - 29).toString();
    return (
      <div>
        <p>Current page: {this.state.currentPage} Pages: {this.state.totalPages}</p>
        <div className='listForMember'>
        {this.state.list.data ?
        <ol start={startNumber}>{this.state.list.data.map(el =>
          (<li key={el.login}><span className='itemSearch' id={el.login} onClick={this.choiseElement}>
            {el.login}</span></li>))}
        </ol> :
          'Loading'}
        </div>
        {this.state.totalPages > 1 &&
          <PaginationBlock paginationData={this.state.paginationData} handlerPagination={this.handlerPagination} />}
      </div>
    )
  }
}

export default List;
