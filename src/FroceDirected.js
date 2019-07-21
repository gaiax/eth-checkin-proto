import React, { Component } from 'react';
import './App.css';
import { Graph } from 'react-d3-graph';
import AddContent from './AddContent'

const myConfig = {
  nodeHighlightBehavior: true, //sourceの上にカーソルが置かれた際にsourceとtargetがひかる
  linkHighlightBehavior: true, //矢印がひかる
  //focusAnimationDuration: 0.75,
  highlightOpacity: 0.2, //sourceの上にカーソルが置かれた際に関係しないものを薄くする、0だと何も見えない
  directed: true, // sourceからtargetに矢印が伸びる
  d3: {
    "alphaTarget": 1,
    "gravity": -500,
    "linkLength": 100,
    "linkStrength": 1
  },
  node: {
      color: 'lightgreen',
      size: 120,
      highlightStrokeColor: 'blue'
  },
  link: {
      highlightColor: 'lightblue'
  }
};

class ForceDirected extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      nodeId: '',
      ids: [],
      button: true,
    }
    this.onClickNode = this.onClickNode.bind(this)
    this.addReference = this.addReference.bind(this)
    //this.onMouseOverNode = this.onMouseOverNode.bind(this)
  }

  async onClickNode(nodeId) {
    await this.setState({ button: true })
    await this.setState({ nodeId })
    await this.setState({ show: true });
  }

  async addReference() {
    await this.state.ids.push(this.state.nodeId)
    await this.setState({ button: false })
  } 

  render() {
    return (
      <div className="content">
        <h2 className="title">Rereference Mapping</h2>
        <div className="row">
          <div className="tokenMap col-sm-8">
            { this.props.data.nodes.length !== 0 ?
              <Graph
                id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
                data={this.props.data}
                config={myConfig}
                onClickNode={this.onClickNode}
              /> 
              : 
              <></>
            }
          </div>
          <div className="col-sm-3">
            { this.state.show ? 
              <div className="card-detail bg-dark text-white" >
                <div className="card-header">
                  Name :<a href= {`https://ipfs.io/ipfs/${this.props.tokenData[Number(this.state.nodeId)-1].tokenURI}`} className="card-link">{this.props.tokenData[Number(this.state.nodeId)-1].tokenName}</a>
                </div>
                <div className="card-body">
                  <p className="card-text">Rereferenced Token Ids: 
                      { this.props.tokenData[Number(this.state.nodeId)-1].referencedTokenIds.map((id, key) => {
                      return (
                        <span key={key}> [{id}] </span>
                      )
                    })}
                  </p>
                </div>
                <form className="row payment-form" 
                  onSubmit={(event) => {
                    event.preventDefault()
                    console.log("form submitting...")
                    this.props.payment(this.state.nodeId, this.state.value)
                }}>
                  <div className="col-sm-7 col-sm pr-sm-2">
                    <input
                      className="amount-input"
                      type="number"
                      pattern="[0-9]"
                      step="0.000001"
                      placeholder="Ether Amount"
                      onChange={(e) => this.setState({ value: e.target.value}) }
                      required />  
                  </div>
                  <div className="col-sm-5 col-sm-auto pl-sm-0">
                    <button type="submit" className="btn btn-primary btn-block btn-sm">支払う</button>
                  </div>
                </form>
                { this.state.button ? 
                  <button type="submit" className="btn btn-primary btn-block btn-sm" onClick={this.addReference}>追加</button> :
                  <button type="submit" className="btn btn-primary btn-block btn-sm" disabled >追加</button>
                }
              </div>
              : 
              <></>}
          </div>
        </div>
        <hr/> 
        <div className="row">
          <div className="col-sm-12">
            <AddContent 
              onSubmit = {this.props.onSubmit}
              ids = {this.state.ids}
            />
          </div> 
        </div>   
      </div>
    );
  }
}

export default ForceDirected;


