import React, {useState, useEffect} from "react";
import {
  Container,
  Card,
  InputGroup,
  FormControl,
  Row,
  Col,
  Pagination,
  Media,
} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {faEye, faHeart, faSearch, faHeartBroken} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
  API_GET_LEARNING,
  API_fAVORITE_E_lEARNING,
  API_UN_fAVORITE_E_lEARNING,
  API_DEL_ELEARNING_BY_ID,
  IMAGE_URL,
} from "../../apis";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const LeaningDetail = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [learning, setLearning] = useState(null);

  useEffect(() => {
    API_GET_LEARNING(search, page).then((result) => {
      setLearning(result?.data);
    });
  }, [search, page]);

  const handleFav = (id) => {
    API_fAVORITE_E_lEARNING(id)
      .then(() => {
        API_GET_LEARNING(search, page).then((result) => {
          setLearning(result?.data);
        });
      })
      .catch();
  };
  const handleUnFav = (id) => {
    API_UN_fAVORITE_E_lEARNING(id)
      .then(() => {
        API_GET_LEARNING(search, page).then((result) => {
          setLearning(result?.data);
        });
      })
      .catch();
  };

  const handleDel = (id) => {
    API_DEL_ELEARNING_BY_ID(id)
      .then(() => {
        API_GET_LEARNING(search, page).then((result) => {
          setLearning(result?.data);
        });
      })
      .catch(() => {
        API_GET_LEARNING(search, page).then((result) => {
          setLearning(result?.data);
        });
      });
  };

  return (
    <div>
      <Container className="title mb-5">
        <Row>
          <Col lg="8">
            <Card.Title>E - Leaning</Card.Title>
            <Card.Subtitle>เรียนรู้ผ่านระบบออนไลน์</Card.Subtitle>
          </Col>
          <Col lg="4" className="align-self-center">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text variant="outline-secondary" id="basic-addon1">
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search..."
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container className="detail learning">
        <Row>
          <Col xs="12" lg="12">
            <Card.Subtitle className="scroll">
              {learning?.totalRecord} E-learning
            </Card.Subtitle>
          </Col>
        </Row>{" "}
        <Container fluid>
          <Row className="py-5">
            {learning?.data?.map(
              (
                {
                  id,
                  title,
                  view,
                  favorite,
                  elearningPicture,
                  createAt,
                  firstName,
                  lastName,
                  userPicture,
                  content,
                  isFavorite,
                  userId,
                },
                idx
              ) => (
                <Col xl="4" lg="4" md="6" xs="12" className="mobile-padding py-5">
                  <Card>
                    {/* {/* {+localStorage.getItem("id") === userId ||
                    +localStorage.getItem("isAdmin") === 1 ? (
                      <div className="btn-cancel-card" onClick={() => handleDel(id)}>
                        <i class="fa fa-times-circle"></i>
                      </div>
                    ) : null} */}
                    <div onClick={() => navigate(`/e-leaning/${id}`)}>
                      <Card.Img
                        src={
                          elearningPicture
                            ? IMAGE_URL + elearningPicture
                            : "https://chiccarrent.com/files/images/default-placeholder.png"
                        }
                        alt={title}
                      />
                      <Card.Body onClick={() => navigate(`/e-leaning/${id}`)}>
                        <Card.Title>
                          <Media>
                            <Card bsPrefix="date" className="absolute">
                              <Card.Title>{moment(createAt).format("DD")}</Card.Title>
                              <Card.Subtitle>
                                {moment(createAt).format("MMM")}
                              </Card.Subtitle>
                            </Card>
                            <Card className="date">
                              <Card.Title>xx</Card.Title>
                              <Card.Subtitle></Card.Subtitle>
                            </Card>
                            <Media.Body>
                              <p>
                                <b className="text-overflow-1" style={{color: "#000"}}>{title}</b>
                              </p>
                            </Media.Body>
                          </Media>
                        </Card.Title>
                        <Card.Text className="subtitle-text">{content}</Card.Text>
                      </Card.Body>
                    </div>
                    <Card.Footer>
                      <Card.Text>
                        <span>
                          <span style={{color: "#26BEB4"}} className="mr-3">
                            <FontAwesomeIcon className="pr-2" icon={faEye} /> {view}
                          </span>
                          <span style={{color: "#26BEB4"}}>
                            {isFavorite ? (
                              <i
                                className="fa fa fa-heart pr-2"
                                onClick={() => handleUnFav(id)}
                              ></i>
                            ) : (
                              <i
                                className="fa fa fa-heart-o pr-2"
                                onClick={() => handleFav(id)}
                              ></i>
                            )}
                            {favorite}
                          </span>
                        </span>
                      </Card.Text>
                    </Card.Footer>
                  </Card>
                  {/* </NavLink> */}
                </Col>
              )
            )}
          </Row>
        </Container>
        <div>
          {page > 1 ? (
            <Pagination className="my-5" style={{float: "right"}}>
              {page > 1 && <Pagination.First onClick={() => setPage(1)} />}
              {page > 1 && <Pagination.Prev onClick={() => setPage((e) => (e -= 1))} />}
              {page > 1 && (
                <Pagination.Item onClick={() => setPage((e) => (e -= 1))}>
                  {page - 1}
                </Pagination.Item>
              )}
              {<Pagination.Item active>{page}</Pagination.Item>}
              {page < learning?.totalPage && (
                <Pagination.Item onClick={() => setPage((e) => (e += 1))}>
                  {page + 1}
                </Pagination.Item>
              )}
              {page < learning?.totalPage && (
                <Pagination.Next onClick={() => setPage((e) => (e += 1))} />
              )}
              {page < learning?.totalPage && (
                <Pagination.Last onClick={() => setPage(learning?.totalPage)} />
              )}
            </Pagination>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default LeaningDetail;
