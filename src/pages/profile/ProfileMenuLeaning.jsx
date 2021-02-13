import React, {useState, useEffect} from "react";
import {Card, Col, Container, Media, Pagination, Row} from "react-bootstrap";

import {API_GET_ELEARNING_SHARING, API_fAVORITE_E_lEARNING, IMAGE_URL} from "../../apis";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {faArrowRight, faHeart, faEye, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProfileMenuLeaning = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [learning, setLearning] = useState(null);
  useEffect(() => {
    API_GET_ELEARNING_SHARING(search, page).then((result) => {
      setLearning(result?.data);
    });
  }, [search, page]);

  const handleFav = (id) => {
    // API_fAVORITE_E_lEARNING(id)
    //   .then(() => {
    //     API_GET_ELEARNING_SHARING(search, page).then((result) => {
    //       setLearning(result?.data);
    //     });
    //   })
    //   .catch();
  };

  return (
    <div className="learning text-uppercase">
      <div className="profile-title-menu-my-share-bg scroll-num py-5">
        <Container>
          <Row>
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
                },
                idx
              ) => (
                <Col
                  xl="3"
                  lg="4"
                  md="6"
                  xs="12"
                  className="mobile-padding py-5"
                  // onClick={() => navigate("/e-leaning/" + id)}
                >
                  {/* <NavLink to={`/e-leaning/${id}`} className="p-0 nav-link"> */}
                  <Card>
                    <Card.Body className="image">
                      <img
                        src={
                          elearningPicture
                            ? IMAGE_URL + elearningPicture
                            : "https://chiccarrent.com/files/images/default-placeholder.png"
                        }
                        // style={{height: "359px"}}
                        alt={title}
                        className="card-img-top"
                      />
                    </Card.Body>
                    <Card.Body>
                      <Card.Title>
                        <Media>
                          <Card className="date absolute">
                            <Card.Title>{moment(createAt).format("DD")}</Card.Title>
                            <Card.Subtitle>
                              {moment(createAt).format("MMM")}
                            </Card.Subtitle>
                          </Card>
                          <Card className="date">
                            <Card.Title></Card.Title>
                            <Card.Subtitle></Card.Subtitle>
                          </Card>
                          <Media.Body>
                            <p>
                              <b style={{color: "#000"}}>{title}</b>
                            </p>
                          </Media.Body>
                        </Media>
                      </Card.Title>
                      <Card.Text className="subtitle-text">{content}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Text className="mr-auto ">
                        <span>
                          <span style={{color: "#26BEB4"}} className="mr-5">
                            <FontAwesomeIcon className="pr-2" icon={faEye} /> {view}
                          </span>
                          <span style={{color: "#26BEB4"}}>
                            {/* <FontAwesomeIcon
                              icon={isFavorite ? faHeart : faHeartBroken}
                            /> */}
                            {isFavorite ? (
                              <i className="fa fa fa-heart pr-2"></i>
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
          <div className="detail">
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
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProfileMenuLeaning;
