import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'

class AddPlace extends Component {

    constructor(props) {
        super(props) 
        this.state= {
          buffer: null,
        }
        this.captureFile = this.captureFile.bind(this);
        //this.onSubmit = this.onSubmit.bind(this); 
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
            <Container>
                <Row>
                    <Col sm={6} >
                        <h2>場所登録</h2>
                    </Col>
                    <Col sm={{ spam:3, offset:3 }} >
                        <Button
                            variant="outline-primary"
                            onClick={this.props.position}>
                            位置情報 
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.props.createPlace(this.place.value, this.state.buffer)
                    }}>
                        <input
                            id="newPlace"
                            type="text"
                            ref={(input) => {
                                this.place = input
                            }}
                            className="form-control"
                            placeholder="Add place..."
                            autoFocus={true}
                            required />
                        <input 
                            id="image"
                            type="file"  
                            className="form-control"
                            onChange={this.captureFile}
                             />
                        <input type="submit" value="登録" />
                    </form>
                </Row>
            </Container>
        )
    }
}

export default AddPlace;