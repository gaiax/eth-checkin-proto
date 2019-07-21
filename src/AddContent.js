import React, { Component } from 'react';
import './App.css';

class AddContent extends Component {

  _addDistributionRate = async (e) => {
    await this.setState({ rate: e.target.value })
  } 

  _addName = async (e) => {
    await this.setState({ name: e.target.value })
  }

  handleReferenceData = async () => {
    this.setState({ showRate: false })
    await this.state.ids.push(this.state.id)
    await this.state.rates.push(this.state.rate)
    //フロントで表示するため
    await this.state.refsData.push({ids: this.state.id, rates: this.state.rate})
    this.setState({ showRate: true })
    console.log(this.state.ids)
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

  decorateData = async() => {
    await this.state.rates.push(this.state.rate)
    for (var i = 0; i < this.props.ids.length; i++) { 
      let rate = 'rate'+ i
      this.state.rates.push(this.state[rate])
    }
    console.log(this.state.rates)
  }
  
  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      ids: [],
      rates: [],
      refsData: [],
    }
    this.captureFile = this.captureFile.bind(this);
  }

  render() {
    return (
      <div className="add-content">
        <div className="row">
          <div className="col-sm-8">
            <h2 className="title">コンテンツを追加</h2>
          </div>  
          <div className="col-sm-4">
            <form 
              onSubmit={async(event) => {
              event.preventDefault()
              await this.decorateData()
              await this.props.onSubmit(this.state.buffer, this.state.name, this.props.ids, this.state.rates)
            }}>
              <input 
                className="btn btn-primary btn-sm"
                value="追加"
                type="submit" />
            </form>
          </div>  
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h4>コンテンツ</h4>
            <input type="file" onChange={this.captureFile} />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            <h4>名前</h4>
            <input type="text" onChange={this._addName} />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            <h4>参照データ</h4>
          </div>
        </div>
        <div className="row">
          <div align="center" className="col-sm-12 col-sm pr-sm-2">
            <table className="table table-for-ref table-sm ">
              <thead>
                <tr>
                  <th>参照したコンテンツ</th>
                  <th>コンテンツへの分配率</th>
                </tr>
              </thead>
              <tbody>       
                <tr>
                  <td>登録するコンテンツ</td>
                  <td>
                    <input 
                      id="" 
                      type="number" 
                      placeholder="分配率"
                      min="1" 
                      pattern="[0-100]" 
                      onChange={async(e) => await this.setState({ rate : e.target.value })}
                    /> 
                  </td>
                </tr>
              </tbody>
              { this.props.ids.map((id, key) => {
                const rate = 'rate'+key
                return (
                  <tbody key={key}>
                    <tr key={key}>
                      <td>{id}</td>
                      <td>
                        <input 
                          id="" 
                          type="number" 
                          placeholder="分配率"
                          min="1" 
                          pattern="[0-100]" 
                          onChange={async(e) => await this.setState({ [rate] : e.target.value }) }
                        /> 
                      </td>
                    </tr>
                  </tbody> 
                )
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AddContent;