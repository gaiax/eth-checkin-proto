import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class CheckinInfo extends Component {

    constructor(props) {
      super(props)
      this.state = {
        val: ''
      }
    }
  
    render() {
      return (
        <Container>
          <Row>
            <Col sm={12}>
              <h2>Check-in List</h2>
            </Col>
          </Row>  
          <Row>
            <Col sm={12}>
              { this.props.checkinsForOwner.map((checkin, key) => {
                return(
                  <div className="checkinList" key={key}>
                    <p className="content">名前：{checkin.userName}</p>
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
  
  export default CheckinInfo;
  