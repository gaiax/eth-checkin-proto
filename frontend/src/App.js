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
import CreateUser from './CreateUser.js'
import VisiterList from './VisiterList.js'

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
    const admin = await placeList.methods.getAdmin(this.state.account).call()
    this.setState({ admin })
    await this.loadPlaceInfo();
    await console.log('Place information loaded')
    await this.loadCheckinInfo();
    await console.log('Checkin information loaded')
    await this.loadUserInfo();
    await console.log('User information loaded')
  }

  async loadPlaceInfo() {
    //登録した場所をブロックチェーンから読み込む
    const placeCount = await placeList.methods.getNumberOfPlace().call()
    this.setState({ placeCount })
    for (var i = 0; i < placeCount; i++) {
      const place = await placeList.methods.places(i).call()
      const numberOfVisiter = await placeList.methods.getNumberOfVisiters(place.id).call()
      const newplace = Object.assign(place, numberOfVisiter);
      this.setState({
        places: [...this.state.places, newplace]
      })
    }
    // 位置情報を獲得する
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
      }, 
      async () => {
        //自分に近いものだけ表示
        const nearplace = await this.state.places.filter(item => 
          Number(item.latitude) > this.state.latitude - 1.01
          && Number(item.latitude) < this.state.latitude + 1.01
        );
        this.setState({
          nearplaces: nearplace
        })
        await console.log(this.state.latitude)
        await console.log(this.state.longitude)
      })
    );

    //場所のオーナー用の場所の情報
    const placeforowner = this.state.places.filter(item => 
      item.owner === this.state.account
    );
    this.setState({
      placeinfo: placeforowner
    }) 
  }

  async loadCheckinInfo() {
    //Checkinしたユーザーの情報をブロックチェーンから読み込む
    const userCount = await placeList.methods.getNumberOfCheckin().call()
    this.setState({ userCount })
    const now = new Date();
    const limitTime = new Date(now);
    limitTime.setHours(limitTime.getHours() - 12)
    this.setState({ now, limitTime })
    
    //ユーザー用のチェックインリスト
    for (var l = 0; l < userCount; l++) {
      const checkin = await placeList.methods.getCheckinListForUser(l, this.state.account).call()
      if (checkin[0] !== "0") {
        checkin.checkintime  = new Date(checkin.checkintime * 1000)
        this.setState({
          checkinListForUser: [...this.state.checkinListForUser, checkin]
        })
      }
    }
    await this.state.checkinListForUser.sort(function(a,b){return b.checkintime - a.checkintime;})

    //上位３０件に絞る
    const limit = await this.state.checkinListForUser.slice(0,30);
    this.setState({
      checkinListForUser: limit
    })
    
    //check-inしている人のリスト
    if (this.state.checkinListForUser.length > 0) {
      const now = new Date();
      const limitTime = new Date(now);
      limitTime.setHours(limitTime.getHours() - 12)
      if (this.state.checkinListForUser[0].checkintime > limitTime) {
        for (var n = 0; n < userCount; n++) {
          const checkin = await placeList.methods.getCheckinListForOwner(n, this.state.checkinListForUser[0].placeid).call()
          if (checkin[0] !== "0") {
            const checkinTime = new Date(checkin.checkintime * 1000)
            const limitTime = new Date();
            limitTime.setHours(limitTime.getHours() - 12)
            if (checkinTime > limitTime) {
              checkin.checkintime  = new Date(checkin.checkintime * 1000)
              const userInfo = await placeList.methods.users(checkin.user).call()
              const newCheckin = Object.assign(checkin, userInfo);
              this.setState({
                visiterList: [...this.state.visiterList, newCheckin]
              }
            )}
          }  
        }
        await this.state.visiterList.sort(function(a,b){return b.checkintime - a.checkintime;})
      }
    }

    //場所のオーナー用のチェックインリスト
    if (this.state.placeinfo.length > 0) {
      for (var o = 0; o < userCount; o++) {
        const checkin = await placeList.methods.getCheckinListForOwner(o, this.state.placeinfo[0].id).call()
        if (checkin[0] !== "0") {
          checkin.checkintime  = new Date(checkin.checkintime * 1000)
          const userInfo = await placeList.methods.users(checkin.user).call()
          const newCheckin = Object.assign(checkin, userInfo);
          this.setState({
            checkinListForOwner: [...this.state.checkinListForOwner, newCheckin]
          }
        )}
      }
      await this.state.checkinListForOwner.sort(function(a,b){return b.checkintime - a.checkintime;})
    }
    //24時以内のチェックインユーザーの表示
    // const now = new Date();
    // const newDate = new Date(now);
    // newDate.setDate(newDate.getDate() - 1)
    // const checkinForOwnerLimitedBy24hours = this.state.checkinListForOwner.filter(item => 
    //   item.checkintime > newDate
    // );
    // this.setState({
    //   checkinListForOwner: checkinForOwnerLimitedBy24hours
    // })

    //管理者用のチェックインリスト
    if (this.state.account === this.state.admin) {
      for (var m = 0; m < userCount; m++) {
        const checkin = await placeList.methods.getAllCheckinList(m, this.state.account).call()
        checkin.checkintime  = new Date(checkin.checkintime * 1000)
        if (checkin[0] !== "0") {this.setState({
          allCheckinList: [...this.state.allCheckinList, checkin]
        })}
      }
      await this.state.allCheckinList.sort(function(a,b){return b.checkintime - a.checkintime;})
    }
    
    this.setState({ loading: false })
  }
  
  async loadUserInfo() {
    const userInfo = await placeList.methods.users(this.state.account).call()
    this.setState({ userInfo })
  }

  async listenCheckinEvents() {
    const checkinEvent = await placeList.events.CheckIn({}, {
      fromBlock: 0,
      toBlock: 'latest',
    })
    console.log(checkinEvent)
    //イベントのSubscribe(必要時にみる)
    //event.on("data", (data) => console.log("data", data))
  }

  async listenCreatePlaceEvents() {
    const createPlaceEvent = await placeList.events.CreatePlace({}, {
      fromBlock: 0,
      toBlock: 'latest',
    })
    await console.log(createPlaceEvent)
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
      allCheckinList: [],
      checkinListForUser: [],
      checkinListForOwner: [],
      visiterList: [],
      userInfo: [],
      numberOfVisiter: [],
      now: '',
      limitTime: '',
      latitude: null,
      longitude: null,
      loading: true,
    }
    this.createPlace = this.createPlace.bind(this)
    this.userCheckIn = this.userCheckIn.bind(this)
    this.createUser = this.createUser.bind(this)
    this.position = this.position.bind(this)
  }
  
  // 場所を作成する関数
  createPlace = async (name, ipfsHash) => {
    console.log('on Submit ...')
    this.setState({ loading: true })
    this.setState({ places: [] })
    this.setState({ nearplaces: [] })
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const latitude = String(this.state.latitude);
    const longitude = String(this.state.longitude);
    await ipfs.files.add(ipfsHash, async (error, result) => {
      if(error) { console.error(error)
        return
      }
      this.state.placeList.methods.createPlace(name, result[0].hash, latitude, longitude).send({ from: this.state.account })
    }) 
    await this.listenCreatePlaceEvents()
    await this.loadPlaceInfo()
    return this.setState({ loading: false })
  }
  // Checkinする関数
  userCheckIn = async (placeId) => {
    this.setState({ loading: true })
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ allCheckinList: [] })
    this.setState({ checkinListForUser: [] })
    this.setState({ visiterList: [] })
    const latitude = String(this.state.latitude);
    const longitude = String(this.state.longitude);
    await this.state.placeList.methods.userCheckIn(placeId, latitude, longitude).send({ from: this.state.account })
    .once('receipt', (receipt) => {  })
    await this.listenCheckinEvents() //イベント
    await this.loadCheckinInfo() //リロード
    return this.setState({ loading: false })
  }

  createUser = async (userName, ipfsHash) => {
    console.log('on Submit ...')
    this.setState({ loading: true })
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    await ipfs.files.add(ipfsHash, async (error, result) => {
      if(error) { console.error(error)
        return
      }
      await this.state.placeList.methods.createUser(userName, result[0].hash).send({ from: this.state.account })    
    }) 
    .once('receipt', (receipt) => {  })
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
      <Navbar className="navbar" bg="light" variant="light" >
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
                <Nav.Item>
                  <Nav.Link eventKey="third">場所の登録</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="forth">ユーザー登録</Nav.Link>
                </Nav.Item>
                { this.state.account === this.state.admin ?
                  <Nav.Item>
                    <Nav.Link eventKey="fifth">管理者用</Nav.Link>
                  </Nav.Item> 
                  : 
                  <></> 
                }
              </Nav>
            </Col>             
              <>
              <Col sm={9}>
                { this.state.loading ? <h3 className="loader">loading...</h3> :
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Row>
                      <Col sm={6}>
                        <PlaceList
                          placeList={this.state.placeList}
                          places={this.state.nearplaces}
                          userCheckIn={this.userCheckIn}
                        />
                      </Col>
                      <Col sm={6}>
                        <CheckinList 
                          checkinsForUser={this.state.checkinListForUser}
                          places={this.state.places}
                        />
                      </Col>
                    </Row>   
                    <Row>
                      <Col sm={12}>
                        { this.state.checkinListForUser.length > 0 ? 
                          <>
                            { this.state.checkinListForUser[0].checkintime > this.state.limitTime ? 
                              <VisiterList 
                                visiterList={this.state.visiterList}
                                checkinsForUser={this.state.checkinListForUser}
                                places={this.state.places}
                              /> : 
                            <></>
                            }
                          </> : 
                        <></> }
                      </Col>
                    </Row> 
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">    
                    <Row>
                      <Col sm={6} >
                        <PlaceInfo
                          placeinfo={this.state.placeinfo}
                        />
                      </Col>
                      <Col sm={6} >
                        <CheckinInfo 
                          checkinsForOwner={this.state.checkinListForOwner}
                        />
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">    
                    <Row>
                      <Col>
                        <AddPlace 
                          createPlace={this.createPlace}
                          position={this.position}
                        />
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">    
                    <Row>
                      <Col>
                        <CreateUser 
                          createUser={this.createUser}
                          userInfo={this.state.userInfo}
                        />
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fifth">
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
                </Tab.Content>}
              </Col>
              </>
          </Row>
        </Tab.Container>
      </>
    );
  }
}
export default App;
