import React from 'react';


class PaginationBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      paginationData: [],
      currentPage: 1,

    };
    //this.handlerInput = this.handlerInput.bind(this);

  }


  render () {
    if (this.props.paginationData !== {}) {
      return(
        <div>{Object.entries(this.props.paginationData).map(el =>
          (<button key={el[0]} value={el[1]} id={el[0]} onClick={this.handlerPagination}>{el[0]}</button>))}</div>
      )
    }
    else {
      return (null)
    }
  }
}

export default PaginationBlock;
