import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class PlaceInfo extends Component {

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
          <Col sm={12} >      
            <h2>登録した場所の情報</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            { this.props.placeinfo.map((place, key) => {
              return(
                <div className={["placeTemplate", "checkbox"]} key={key}>
                  <p className="content">名前：{place.name}</p>
                  <p className="content">オーナーアドレス{place.owner}</p>
                  <p className="content">緯度 : {place.latitude}</p>
                  <p className="content">経度 : {place.longitude}</p>
                  <img src= {`https://ipfs.io/ipfs/${place.ipfsHash}`} alt=""></img>
                </div>  
              )  
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PlaceInfo;