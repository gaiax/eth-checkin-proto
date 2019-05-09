import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class CheckinList extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
        val: ''
      }
    }
  
    _filterVal = e => {
      this.setState({ val: e.target.value })
    } 
  
    handleSetFilter = async () => {
      this.props.handleFilterVal(this.state.val)
    }
  
    render() {
      return (
        <Container>
          <Row>
            <Col sm={7}>
              <h2>Check-in List</h2>
            </Col>
            <Col sm={{ span: 3, offset: 1 }}>
              <input
                type="text"
                defaultValue=""
                placeholder="これいらないね"
                onKeyUp={this._filterVal}
              />
              <Button 
                ariant="outline-primary" 
                onClick={this.handleSetFilter}>
                Filter
              </Button> 
            </Col>
          </Row>  
          <Row>
            <Col sm={12}>
              { this.props.checkinsForUser.map((checkin, key) => {
                return(
                  <div key={key}>
                    <p className="content">場所：{checkin.placeid}</p>
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
  
  export default CheckinList;
  