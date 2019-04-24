import React, { Component } from 'react'

class Form extends Component {
  _filterVal() {
    // refsを通してinput要素に入力された値を取得
    const val = this.refs.myinput.value;
    // propsを通して受け取ったonFilterVal()メソッド（handleFilterVal()メソッド）を実行
    this.props.onFilterVal(val);
  }
  render() {
    return (
      <div>
        
        {/* 配列を絞り込むための値を入力するためのinput要素 */}
        <input
          type="text"
          ref="myinput"
          defaultValue=""
          onKeyUp={this._filterVal.bind(this)}
        />
      </div>
    );
  }
}

export default Form;
