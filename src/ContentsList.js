import React, { Component } from 'react';
import './App.css';

class ContentsList extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h2 className="title">コンテンツ一覧</h2>
        <div className="row">
          <div className="contents-list col-sm-12">
            { this.props.tokenData.map((item, key) => {
              return (
                <div className="card border-info text-black" key={key} >
                  <div className="card-header">
                    <a href= {`https://ipfs.io/ipfs/${item.tokenURI}`} className="card-link">{item.tokenName}</a>
                  </div>
                  <div className="card-body">
                    <p className="card-text">参照先: 
                      { item.referencedTokenIds.map((id, key) => {
                        return (
                          <span key={key}> [{id}] </span>
                        )
                      })}
                    </p>
                  </div>
                  <div className="card-footer"><small className="text-muted">Token ID: {item.tokenID}</small></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>  
    );
  }
}

export default ContentsList;