import React, { Component } from 'react';
import './App.css';


class AddToken extends Component {

  _addTokenId = async (e) => {
    await this.setState({ id: e.target.value })
  } 

  handleAddTokenId = async () => {
    this.setState({ showIds: false })
    await this.state.ids.push(this.state.id)
    this.setState({ showIds: true })
  }

  _addDistributionRate = async (e) => {
    await this.setState({ rate: e.target.value })
  } 

  handleDistributionRate = async () => {
    this.setState({ showRate: false })
    await this.state.rates.push(this.state.rate)
    this.setState({ showRate: true })
  }

  captureFile(event) {
    console.log('File loader ...')
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      ids: [],
      rates: [],
    }
    this.captureFile = this.captureFile.bind(this);
  }

  render() {
    return (
      <div className="content">
        <h2>コンテンツを追加</h2>
        <div className="row">
          <div className="col-sm-12">
            <h4>コンテンツ</h4>
            <form 
              onSubmit={(event) => {
              event.preventDefault()
              this.props.onSubmit(this.state.buffer, this.state.ids, this.state.rates)}}>
              <input type="file" onChange={this.captureFile} />
              <input 
                className="btn btn-primary btn-sm"
                type="submit" />
            </form>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            <h4>参照したコンテンツ</h4>
              { this.state.showIds ? 
                <span>
                  { this.state.ids.map((id, key) => {
                    return (
                      <span key={key}>  [{id}] </span>
                    )
                  })}
                </span>
                : <></>
              }
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-sm pr-sm-2">
            <input 
            id="tokenId" 
            type="number" 
            placeholder="参照したコンテンツのID"
            min="1" 
            onChange={this._addTokenId}/>
            <button 
              className="btn btn-primary btn-sm"
              onClick={this.handleAddTokenId}>
              追加
            </button> 
          </div>  
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            <h4>参照したコンテンツへの分配率</h4>
              { this.state.showRate ? 
                <span>
                  { this.state.rates.map((rate, key) => {
                    return (
                      <span key={key}>  [{rate}] </span>
                    )
                  })}
                </span>
                : <></>
              }
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col-sm pr-sm-2">
            <input 
            id="distributionRate" 
            type="number" 
            placeholder="参照したコンテンツへの分配率"
            min="1" 
            pattern="[0-100]" 
            onChange={this._addDistributionRate}/>
            <button 
              className="btn btn-primary btn-sm"
              onClick={this.handleDistributionRate}>
              追加
            </button>
          </div>  
        </div>
      </div>
    );
  }
}

export default AddToken;