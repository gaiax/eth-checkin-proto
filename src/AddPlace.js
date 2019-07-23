import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

class AddPlace extends Component {

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
            <Container className="AddPlace">
                <Row>
                    <Col sm={6} >
                        <h2>場所登録</h2>
                    </Col>
                    <Col sm={{ spam:3, offset:3 }} >
                        <Button
                            variant="outline-info"
                            onClick={this.props.position}>
                            位置情報 
                        </Button>
                    </Col>
                </Row>
                <Form 
                    onSubmit={(event) => {
                    event.preventDefault()
                    this.props.createPlace(this.place.value, this.state.buffer)
                }}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>名前</Form.Label>
                        <Col sm={8}>
                            <Form.Control 
                                id="newPlace"
                                type="text"
                                ref={(input) => {
                                    this.place = input
                                }}
                                className="form-control"
                                placeholder="Add place..."
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
                            <Button variant="info" type="submit">登録</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default AddPlace;