import React, {useState, useEffect} from "react";
import {Container, ListGroup, Button, Card} from "react-bootstrap";
import {API_GET_FAQ} from "../../apis";
const Frequently = () => {
  const [faqData, setFaqData] = useState(null);
  useEffect(() => {
    API_GET_FAQ().then((result) => {
      console.log(result);
      setFaqData(result?.data);
    });
  }, [faqData]);
  return (
    <div className="frequently text-uppercase">
      <Container fluid className="m-0 p-0">
        <ListGroup horizontal>
          <ListGroup.Item
            className="start hide-short-desc"
            style={{
              backgroundImage: "url('/image/frequently-doctor.svg')",
            }}
          ></ListGroup.Item>
          <ListGroup.Item className="end">
            <Card>
              <Card.Body>
                <Card.Title>FREQUENTLY ASKED QUESTIONS</Card.Title>
                <br />
                {faqData?.data?.map(({id, question, answer}) => (
                  <div key={id}>
                    <Card.Subtitle>{question}</Card.Subtitle>
                    <Card.Text>{answer}</Card.Text>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </div>
  );
};

export default Frequently;
