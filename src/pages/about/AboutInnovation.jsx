import React from "react";
import { Col, Container, Image, Row, Media, Card } from "react-bootstrap";

const AboutInnovation = () => {
  return (
    <div className="about-innovation">
      <div className="scroll-num py-5 header">
        <Container className="text-center">
          <p className="title">นวัตกรรม BPSC</p>
          <p className="title">สร้างความเปลี่ยนแปลงในระบบการรักษา</p>
        </Container>
      </div>
      <div className="mt-5 detail">
        <Container className="text-center">
          <Row>
            <Col lg="3" md="3" sm="6">
                <Card.Img src="image/about/innovation-1.png" />
            </Col>
            <Col lg="3" md="3" sm="6">
                <Card.Img src="image/about/innovation-2.png" />
            </Col>
            <Col lg="3" md="3" sm="6">
                <Card.Img src="image/about/innovation-3.png" />
            </Col>
            <Col lg="3" md="3" sm="6">
                <Card.Img src="image/about/innovation-4.png" />
            </Col>
          </Row>
        </Container>
        <Container>
        <div className="f-gradient" style={{textAlign: "center", width: "75%"}}>
            “ เราไม่ได้ทำเพียงรักษาโรค<br></br>เรารักษาคนทั้งคน ให้เขากลับไปเป็นกำลังสำคัญของคนในครอบครัว ”
          </div>
        </Container>
      </div>
    </div>
  );
};
export default AboutInnovation;
