import React, { Component } from 'react'

class Guideline extends Component {
  
  handleOpen = async() => {
    this.setState({ show: true })
  }

  handleClose = async() => {
    this.setState({ show: false })
  }

  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="guide">
            <h1>Guideline</h1>
            { this.state.show ? 
              <>
                <p>EERC721を利用して、作成したコンテンツがどの作品を参照したのかを可視化できるようにしたアプリです。</p>
                <hr/>
                <h3>コンテンツの登録</h3>
                  <p>登録したいコンテンツファイルをアップロードし、コンテンツの名前を記入します。<br/>
                    参照したコンテンツがある場合は、マップで参照するコンテンツをクリックし「追加」を押します。<br/>
                    コンテンツ支払いの際の分配率を登録します。分配率は合計で100になるようにします。<br/>
                    全ての入力が終わったら「登録」を押します。</p>
                    <p className="small"> *参照したコンテンツがない場合は、分配率を空白にします。</p>
                  <hr/>  
                <h3>コンテンツへの支払い</h3>
                  <p>支払う先のコンテンツをマップでクリックします。<br/>
                    金額を入力し「支払い」を押すと、コンテンツと、その参照元のコンテンツの所有者に分配率に基づき支払いされます。</p>
                  <button className="btn btn-outline-info" onClick={this.handleClose}>閉じる</button> 
              </> : <>
                <button className="btn btn-outline-info" onClick={this.handleOpen}>開く</button> 
              </>
            }    
          </div>
        </div>
      </div>
    );
  }
}
  
export default Guideline;