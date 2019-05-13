import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Admin extends Component {
    
    render() {
      return (
        <Container>
          <Row>
            <Col sm={6}>
              <h2>Place List</h2>
              { this.props.places.map((place, key) => {
                return(
                  <div key={key}>
                    <p className="content">ID：{place.id}</p>
                    <p className="content">オーナー：{place.owner}</p>
                    <p className="content">名前：{place.name}</p>
                    <p className="content">緯度：{place.latitude}</p>
                    <p className="content">経度：{place.longitude}</p>
                    <img src= {`https://ipfs.io/ipfs/${place.ipfsHash}`} alt=""></img>
                  </div>
                )
              })}
            </Col>
            <Col sm={6}>
              <h2>Check-in List</h2>
              { this.props.checkins.map((checkin, key) => {
                return(
                  <div key={key}>
                    <p className="content">場所：{this.props.places[Number(checkin.placeid) -1].name}</p>
                    <p className="content">ユーザー:{checkin.user}}</p>
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
  
  export default Admin;