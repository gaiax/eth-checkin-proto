import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

class PlaceList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      placeid: '',
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={6} >      
            <h2>場所一覧</h2>
          </Col>
          <Col sm={{ span: 5, offset: 1 }} >
            <Button
              variant="outline-primary"
              onClick={(event) => {
                this.props.userCheckIn(this.state.placeid) }} >
              Check-in
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <ListGroup>
              { this.props.places.map((place, key) => {
                return(
                  <div className={["placeTemplate", "checkbox"]} key={key}>
                    <ListGroup.Item>
                      <input
                        type="radio"
                        name="radionutton"
                        id={place.id}
                        onClick={(event) => {
                          this.setState({ placeid: place.id })}}
                      />
                      <span> </span>
                      <img id="placeImage" src= {`https://ipfs.io/ipfs/${place.ipfsHash}`} alt=""></img>
                      <span className="content"> {place.name}</span>
                      <p></p>
                    </ListGroup.Item>
                  </div>  
                )
              })}
            </ListGroup>  
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
          <h2>訪問者</h2>
            { this.props.checkinList.map((checkin, key) => {
              return(
                <div className="checkinList" key={key}>
                  <p className="content">アドレス：{checkin.user}</p>
                  <p className="content">時間：{checkin.checkintime.toLocaleString()}</p>
                </div>
              )
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PlaceList;