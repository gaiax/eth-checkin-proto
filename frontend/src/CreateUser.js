import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

class CreateUser extends Component {

  constructor(props) {
    super(props)
    this.state= {
      buffer: null,
    }
    this.captureFile = this.captureFile.bind(this);
  }

  captureFile(event) {
    console.log('File loader ...')
    event.preventDefault()
    //fileにアクセスする
    const file = event.target.files[0]
    //fileを読み込む
    const reader = new window.FileReader()
    //fileをipfsいアクセスできるArrayに追加する
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      //結果をBufferに入れ,ipfsにアクセスできるようにする
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  render(){
    return(
      <Container className="CreateUser">
        <Row>
          <Col sm={12}>
            <h2>ユーザー登録</h2>
          </Col>
        </Row>
        <Form
          onSubmit={(event) => {
          event.preventDefault()
          this.props.createUser(this.user.value, this.state.buffer)
        }}>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>名前</Form.Label>
            <Col sm={9}>
              <Form.Control 
                id="userName"
                type="text"
                ref={(input) => {
                    this.user = input
                }}
                className="form-control"
                placeholder="Type User Name..."
                autoFocus={true}
                required /> 
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={4}>イメージ画像</Form.Label>
            <Col sm={8}>
              <Form.Control 
                id="image"
                type="file"  
                className="form-control"
                onChange={this.captureFile}
                required /> 
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 3, offset: 9 }}>
              <Button type="submit">登録</Button>
            </Col>
          </Form.Group>
        </Form>       
      </Container>
    )
  } 
} 

export default CreateUser;