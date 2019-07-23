import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class CheckinList extends Component {
  
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
              { this.props.checkinsForUser.length > 0 ? 
                <>
                  { this.props.checkinsForUser.map((checkin, key) => {
                    return(
                      <div className="checkinList" key={key}>
                        <p className="content">場所：{this.props.places[Number(checkin.placeid)-1].name}</p>
                        <p className="content">時間：{checkin.checkintime.toLocaleString()}</p>
                      </div>
                    )
                  })}
                </> : <>
              </>}
            </Col>
          </Row>        
        </Container>
      );
    }
  }
  
  export default CheckinList;
  