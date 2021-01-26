import React, { Component } from "react";
import { Row, Col, Card, Image, Container } from "react-bootstrap";

class SheetOne extends Component {
  render() {
    return (
      <div className="sheet-one">
        <div className="file-green back">
          <Container  className="btn-sheet" style={{position: "absolute",top:"2rem"}}>

              <button className="blue-green">
                OUR INNOVATION
                </button>
              <button className="blue-green">
                OUR MISSION
                </button>
  
          </Container>

          <Container>
            <Row className="m-0 p-0">
              <Col lg="6">
                <Card.Title>4 INNOVATIONS IN BPSC</Card.Title>
                <div className="subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore ...
                </div>
              </Col>
              <Col lg="6" className="box-set">
                <Row className="m-0">
                  <Col lg="6" md="6" xs="6" className="pt-3">
                    <Card>
                      <center className="align-self-center p-1">
                        <Image src="/image/advice1.png" />
                        <br />
                        <p style={{ fontSize: "x-small", margin: "unset" }}>BRIEF ADVICE</p>
                        <p style={{ fontSize: "x-small", margin: "unset" }}>(BA)</p>
                      </center>
                    </Card>
                  </Col>
                  <Col lg="6" md="6" xs="6" className="pt-3">
                    <Card>
                      <center className="align-self-center p-1">
                        <Image src="/image/together1.png" />
                        <br />
                        <p style={{ fontSize: "x-small", margin: "unset" }}>BRIEF ADVICE</p>
                        <p style={{ fontSize: "x-small", margin: "unset" }}>(BA)</p>
                      </center>
                    </Card>
                  </Col>
                  <Col lg="6" md="6" xs="6" className="pt-3">
                    <Card>
                      <center className="align-self-center p-1">
                        <Image src="/image/patches1.png" />
                        <br />
                        <p style={{ fontSize: "x-small", margin: "unset" }}>BRIEF ADVICE</p>
                        <p style={{ fontSize: "x-small", margin: "unset" }}>(BA)</p>
                      </center>
                    </Card>
                  </Col>
                  <Col lg="6" md="6" xs="6" className="pt-3">
                    <Card>
                      <center className="align-self-center p-1">
                        <Image src="/image/medical-report1.png" />
                        <br />
                        <p style={{ fontSize: "x-small", margin: "unset" }}>BRIEF ADVICE</p>
                        <p style={{ fontSize: "x-small", margin: "unset" }}>(BA)</p>
                      </center>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default SheetOne;
