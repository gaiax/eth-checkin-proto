import React, { Component } from 'react'
import web3 from './web3.js'
import ipfs from "./ipfs.js";
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from 'react-bootstrap/Navbar'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { PLACE_LIST_ABI, PLACE_LIST_ADDRESS } from './config'
import PlaceList from './PlaceList'
import CheckinList from './CheckinList'
import CheckinInfo from './CheckinInfo'
import AddPlace from './AddPlace.js'
import PlaceInfo from './PlaceInfo.js'
import Admin from './Admin.js'
// import Map from './Map.js'
// import {
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";

const placeList = new web3.eth.Contract(PLACE_LIST_ABI, PLACE_LIST_ADDRESS)

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  
  async loadBlockchainData() {   
    this.setState({ placeList }) 
    //Metamaskのアドレスを取得
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const admin = await placeList.methods.admin.call()
    this.setState({ admin })
    //////////////////////////////////////////////////////////////////////////////
    this.aboutPlaceInfo();
    //////////////////////////////////////////////////////////////////////////////
    this.aboutCheckinInfo();
  }

  async aboutPlaceInfo() {
    //登録した場所をブロックチェーンから読み込む
    const placeCount = await placeList.methods.placeCount().call()
    this.setState({ placeCount })
    for (var i = 1; i <= placeCount; i++) {
      const place = await placeList.methods.places(i).call()
      this.setState({
        places: [...this.state.places, place]
      })
    }
    // 位置情報を獲得する
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
      }, 
      () => {
        //自分に近いものだけ表示
        const nearplace = this.state.places.filter(item => 
          Number(item.latitude) > this.state.latitude - 0.01
          && Number(item.latitude) < this.state.latitude + 0.01
        );
        this.setState({
          nearplaces: nearplace
        })
        console.log(this.state.latitude)
        console.log(this.state.longitude)
      })
    );

    //場所を登録した人への場所の情報
    const placeforowner = this.state.places.filter(item => 
      item.owner === this.state.account
    );
    this.setState({
      placeinfo: placeforowner
    }) 
  }

  async aboutCheckinInfo() {
    //Checkinしたユーザーの情報をブロックチェーンから読み込む
    const userCount = await placeList.methods.userCount().call()
    this.setState({ userCount })
    for (var k = 1; k <= userCount; k++) {
      const checkin = await placeList.methods.checkins(k).call()
      checkin.checkintime  = new Date(checkin.checkintime * 1000)
      this.setState({
        checkins: [...this.state.checkins, checkin]
      })
    }
    await this.state.checkins.sort(function(a,b){return b.checkintime - a.checkintime;})

    //ユーザー用のチェックインデータ
    const checkinForUser = await this.state.checkins.filter(item => 
      item.user === this.state.account
    );
    //上位３０件に絞る
    const limit = checkinForUser.slice(0,30);
    this.setState({
      checkinsForUser: limit
    })

    //場所管理者用のチェックインデータ 
    if (this.state.placeinfo.length === 0 ) { return this.setState({ loading: false }) }
    const checkinForOwner = await this.state.checkins
    .filter(item => 
      item.placeid === this.state.placeinfo[0].id
    );
    this.setState({
      checkinsForOwner: checkinForOwner
    })
    //24時以内のチェックインユーザーの表示
    const now = new Date();
    const newDate = new Date(now);
    newDate.setDate(newDate.getDate() - 1)
    const checkinForOwnerLimitedBy24hours = this.state.checkinsForOwner.filter(item => 
      item.checkintime > newDate
    );
    this.setState({
      checkinsForOwner: checkinForOwnerLimitedBy24hours
    })
    this.setState({ loading: false })
  }
  

  async listenForEvents() {
    const event = await placeList.events.UserCheckIn({}, {
      fromBlock: 0,
      toBlock: 'latest',
    })
    console.log(event)
    //イベントのSubscribe(必要時にみる)
    //event.on("data", (data) => console.log("data", data))
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      admin: '',
      placeCount: 0,
      places: [],
      nearplaces: [],
      placeinfo: [],
      userCount: 0,
      checkins: [],
      checkinsForUser: [],
      checkinsForOwner: [],
      // filtering: true,
      latitude: null,
      longitude: null,
      loading: true,
    }
    this.createPlace = this.createPlace.bind(this)
    this.userCheckIn = this.userCheckIn.bind(this)
    this.position = this.position.bind(this)
  }
  
  // 場所を作成する関数
  createPlace = async (name, ipfsHash) => {
    console.log('on Submit ...')
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ loading: true })
    const latitude = String(this.state.latitude);
    const longitude = String(this.state.longitude);
    ipfs.files.add(ipfsHash, async (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      this.state.placeList.methods.createPlace(name, result[0].hash, latitude, longitude).send({ from: this.state.account })
      return this.setState({ loading: false })
    }) 
  }
  // Checkinする関数
  userCheckIn = async (placeId) => {
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ loading: true })
    this.setState({ checkins: [] })
    this.setState({ checkinsForUser: [] })
    const latitude = String(this.state.latitude);
    const longitude = String(this.state.longitude);
    await this.state.placeList.methods.userCheckIn(placeId, latitude, longitude).send({ from: this.state.account })
    .once('receipt', (receipt) => {  })
    await this.listenForEvents() //イベント
    await this.aboutCheckinInfo() //リロード
    return this.setState({ loading: false })
  }
  
  // 位置情報を確認する関数（たまにGeoglapic APIが作動しなくなるため）
  position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
      }), 
      err => console.log(err)
    );
    console.log(this.state.latitude)
    console.log(this.state.longitude)
  }

  render() {
    return (
      <>
      <Navbar className="navbar">
        <Navbar.Brand href="https://www.gaiax.co.jp/">Gaiax</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://gaiax-blockchain.com/">| BlockchainBiz</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
      <Tab.Container defaultActiveKey="first">
          <Row className="body-container">
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">チェックイン</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">場所の管理</Nav.Link>
                </Nav.Item>
                { this.state.account === this.state.admin ?
                  <Nav.Item>
                    <Nav.Link eventKey="third">管理者用</Nav.Link>
                  </Nav.Item> 
                  : 
                  <></> 
                }
              </Nav>
            </Col>
              { this.state.loading ? <p>loading</p> : 
              <>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Row>
                        <Col sm={6}>
                          <PlaceList
                            places={this.state.nearplaces}
                            userCheckIn={this.userCheckIn}
                          />
                        </Col>
                        <Col sm={6}>
                          <CheckinList 
                            checkinsForUser={this.state.checkinsForUser}
                            places={this.state.places}
                          />
                        </Col>
                      </Row>    
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">    
                      <Row>
                        <Col sm={6} >
                          <AddPlace 
                            createPlace={this.createPlace}
                            position={this.position}
                          />
                          <PlaceInfo
                            placeinfo={this.state.placeinfo}
                          />
                        </Col>
                        <Col sm={6} >
                          <CheckinInfo 
                            checkinsForOwner={this.state.checkinsForOwner}
                            handleFilterVal={this.handleFilterVal}
                          />
                        </Col>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      { this.state.account === this.state.admin ? (
                      <>
                        <Admin 
                          places = {this.state.places}
                          checkins = {this.state.checkins}
                        />
                      </>) : (
                      <>
                      </>)}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </>}
          </Row>
        </Tab.Container>
      </>
    );
  }
}
export default App;
