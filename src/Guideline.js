import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import initialCheckInImage from './images/initial-check-in-image.png'
import checkInImage from './images/check-in-image.png'
import placeInfo from './images/place-info.png'

class Guideline extends Component {
    
    render() {
      return (
        <Container>
          <Row>
            <Col sm={12}>
              <h1>Guideline</h1>
                <p>Ethereumを使ったチェックインアプリのプロトタイプです。</p>
                <br/>
                <hr/>
              <h2>使い方</h2>
                <h3>STEP 1</h3>
                  <p>タブの「1. ユーザ登録」を開き、ユーザーの名前とユーザーのアイコンを登録します。</p>
                  <br/>
                  <hr/>  
                <h3>STEP 2</h3>
                  <p>ユーザーの登録が終わったら、タブの「2. チェックイン」を開きます。<br/>
                    場所一覧からチェックインしたい場所を選択し、「Check-in」のボタンを押してチェックインします。<br/>
                  </p>
                  <p className="small"> *場所の一覧を表示するために位置情報を取得する必要があるため、ブラウザの位置情報取得を許可し、「システム環境設定」→「セキュリティーとプライバシー」→「位置情報サービスを有効にする」で位置情報を取得できる状態に設定しておいてください。<br/>
                    位置情報が取得できていて場所の一覧が表示されない場合は近くにCheck-inする場所がないので「場所の登録」から行いましょう。
                  </p>
                  <img className="image-guideline" src={initialCheckInImage} alt="initialCheckInImage" />
                  <p>右半分のCheck-in Listが自分が今までにCheck-inした場所を表示しています。<br/>
                    「Welcome to ~~」 以下には12時間以内に同じ場所にチェックインした人のリストが表示されます。
                  </p>
                  <img className="image-guideline" src={checkInImage} alt="checkInImage" />
                  <br/>
                  <hr/>
                <h3>場所の登録</h3>
                  <p>自分で場所の登録を行いたい場合は、タブの「場所の登録」を開きます。<br/>
                    場所の名前を記入し、場所のアイコンをアップロードしたら「登録」を押します。<br/>
                    登録する際は、位置情報が取得できているか確認してから登録を行うようにして下さい。<br/>
                    位置情報が取得でいていないと場所一覧に表示されなくなります
                  </p>  
                  <br/>
                  <hr/>
                <h3>場所の確認</h3>
                  <p>タブの「場所の確認」を開くと、登録した場所と、その場所にcheck-inしたユーザーの情報をみることができます。<br/></p>
                  <img className="image-guideline" src={placeInfo} alt="placeInfo" />
                  <br/>
                  <hr/>
            </Col>
          </Row>        
        </Container>
      );
    }
  }
  
  export default Guideline;