import React, {useState, useEffect} from "react";
import {Container, Row, Col, Pagination, Card} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {faEye, faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {API_GET_GALLERY, API_DELETE_GALLERY, IMAGE_URL} from "../../apis";
import {useNavigate} from "react-router-dom";

const GalleryCard = () => {
  const [gallery, setGallery] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    API_GET_GALLERY(page).then((result) => {
      setGallery(result?.data);
    });
  }, [page]);

  const handleDel = (id) => {
    API_DELETE_GALLERY(id)
      .then(() => {
        API_GET_GALLERY(page).then((result) => {
          setGallery(result?.data);
        });
      })
      .catch(() => {
        API_GET_GALLERY(page).then((result) => {
          setGallery(result?.data);
        });
      });
  };

  return (
    <div className="sharing-page">
      <Container className="detail">
        <Row className="py-5">
          {gallery?.data?.map(({id, title, content, photo}) => (
            <Col
              lg="3"
              md="4"
              sm="6"
              className="mb-5"
              onClick={() => navigate(`/gallery/${id}`)}
              key={id}
            >
              <Card className="box-card-shadow">
                <Card.Body className="image">
                  <Card.Img
                    src={
                      photo
                        ? IMAGE_URL + photo
                        : "https://chiccarrent.com/files/images/default-placeholder.png"
                    }
                    alt={title}
                    className="card-img-top"
                  />
                </Card.Body>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text className="subtitle-text">{content}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div>
          {gallery?.totalPage > 1 ? (
            <Pagination className="my-5" style={{float: "right"}}>
              {page > 1 && <Pagination.First onClick={() => setPage(1)} />}
              {page > 1 && <Pagination.Prev onClick={() => setPage((e) => (e -= 1))} />}
              {page > 1 && (
                <Pagination.Item onClick={() => setPage((e) => (e -= 1))}>
                  {page - 1}
                </Pagination.Item>
              )}
              {<Pagination.Item active>{page}</Pagination.Item>}
              {page < gallery?.totalPage && (
                <Pagination.Item onClick={() => setPage((e) => (e += 1))}>
                  {page + 1}
                </Pagination.Item>
              )}
              {page < gallery?.totalPage && (
                <Pagination.Next onClick={() => setPage((e) => (e += 1))} />
              )}
              {page < gallery?.totalPage && (
                <Pagination.Last onClick={() => setPage(gallery?.totalPage)} />
              )}
            </Pagination>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default GalleryCard;
