import React, { Component } from 'react'
import web3 from './web3.js'
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
import FilteredCheckinList from './FilteredCheckinList'
import AddPlace from './AddPlace.js'
const placeList = new web3.eth.Contract(PLACE_LIST_ABI, PLACE_LIST_ADDRESS)
class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  async loadBlockchainData() {   
    this.setState({ placeList })
    
    //登録した場所をブロックチェーンから読み込む
    const placeCount = await placeList.methods.placeCount().call()
    this.setState({ placeCount })
    for (var i = 1; i <= placeCount; i++) {
      const place = await placeList.methods.places(i).call()
      this.setState({
        places: [...this.state.places, place]
      })
    }
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
    // 位置情報を獲得する
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
      }), 
      err => console.log(err)
    );
    this.state.checkins.sort(function(a,b){return b.checkintime - a.checkintime;})
    this.setState({ loading: false })
    this.setState({ filtering: false })
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      placeCount: 0,
      places: [],
      placeid: '',
      userCount: 0,
      checkins: [],
      filtering: true,
      filteredCheckins: [],
      latitude: null,
      longitude: null,
      loading: true,
    }
    this.createPlace = this.createPlace.bind(this)
    this.userCheckIn = this.userCheckIn.bind(this)
    this.handleFilterVal = this.handleFilterVal.bind(this)
    this.position = this.position.bind(this)
  }
  // 場所を作成する関数
  createPlace = async (name) => {
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ loading: true })
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
      }), 
      err => console.log(err)
    );
    const latitude = String(this.state.latitude);
    const longitude = String(this.state.longitude);
    this.state.placeList.methods.createPlace(name, latitude, longitude).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  // Checkinする関数
  userCheckIn = async (placeId) => {
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ loading: true })
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
      }), 
      err => console.log(err)
    );
    const latitude = String(this.state.latitude);
    const longitude = String(this.state.longitude);
    this.state.placeList.methods.userCheckIn(placeId, latitude, longitude).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  // placeidでフィルターをかける関数
  handleFilterVal(val) {
    const now = new Date()
    const within24hour = new Date(now)
    within24hour.setDate(within24hour.getDate() - 1);
    const line = this.state.checkins.filter((item) => (
       item.placeid.indexOf( val ) >= 0
       && item.checkintime > within24hour  
    ));
    this.setState({
      filteredCheckins: line,
      filtering: true
    });
    
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
                  <Nav.Link eventKey="first">ユーザー画面</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">管理者画面</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Tab 3</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    <Col sm={6}>
                      <PlaceList
                        places={this.state.places}
                        userCheckIn={this.userCheckIn}
                        handleRefrsh={this.handleRefrsh} 
                      />
                    </Col>
                    <Col sm={6}>
                      { this.state.filtering
                        ?<FilteredCheckinList 
                          filteredCheckins={this.state.filteredCheckins}
                          handleFilterVal={this.handleFilterVal}
                        />
                        :<CheckinList 
                          checkins={this.state.checkins}
                          handleFilterVal={this.handleFilterVal}
                        />
                      }
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
                      <PlaceList
                        places={this.state.places}
                        userCheckIn={this.userCheckIn}
                        handleRefrsh={this.handleRefrsh} 
                      />
                    </Col>
                    <Col sm={6} >
                      {
                        this.state.filtering
                        ?<FilteredCheckinList 
                          filteredCheckins={this.state.filteredCheckins}
                          handleFilterVal={this.handleFilterVal}
                          />
                        :<CheckinList 
                          checkins={this.state.checkins}
                          handleFilterVal={this.handleFilterVal}
                          />
                      }
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }
}
export default App;
