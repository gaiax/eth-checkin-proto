import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'

class AddPlace extends Component {
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
                        this.props.createPlace(this.place.value)
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
                    <input type="submit" hidden={true} />
                    </form>
                </Row>
            </Container>
        )
    }
}

export default AddPlace;