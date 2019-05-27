import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class VisiterList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      placeid: '',
      placeList: '',
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}>
          <h2>Welcome to {this.props.places[Number(this.props.checkinsForUser[0].placeid)-1].name} </h2>
            { this.props.visiterList.map((checkin, key) => {
              return(
                <div className="checkinList" key={key}>
                  <Card style={{ width: '12rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Text>
                        <span>名前：{checkin.userName}</span>
                      </Card.Text>
                      <small className="text-muted">{checkin.checkintime.toLocaleString()}</small>
                    </Card.Body>
                  </Card>
                </div>
              )
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default VisiterList;