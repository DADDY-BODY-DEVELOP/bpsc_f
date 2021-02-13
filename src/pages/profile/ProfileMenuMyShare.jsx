import React, {useState, useEffect} from "react";
import {Card, Col, Container, Image, Pagination, Row} from "react-bootstrap";

import {
  API_GET_MY_SHARING,
  API_fAVORITE_SHARING,
  API_UN_fAVORITE_SHARING,
  API_DELETE_SHARING,
  IMAGE_URL,
} from "../../apis";
import {useNavigate} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faHeart, faSearch, faHeartBroken} from "@fortawesome/free-solid-svg-icons";

const ProfileMenuMyShare = () => {
  const [favorite, setFavorite] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    API_GET_MY_SHARING(search, page).then((result) => {
      setFavorite(result?.data);
    });
  }, [search, page]);
  const navigate = useNavigate();

  const handleFav = (id) => {
    API_fAVORITE_SHARING(id)
      .then(() => {
        API_GET_MY_SHARING(search, page).then((result) => {
          setFavorite(result?.data);
        });
      })
      .catch();
  };

  const handleUnFav = (id) => {
    API_UN_fAVORITE_SHARING(id)
      .then(() => {
        API_GET_MY_SHARING(search, page).then((result) => {
          setFavorite(result?.data);
        });
      })
      .catch();
  };

  const handleDel = (id) => {
    API_DELETE_SHARING(id)
      .then(() => {
        API_GET_MY_SHARING(search, page).then((result) => {
          setFavorite(result?.data);
        });
      })
      .catch(() => {
        API_GET_MY_SHARING(search, page).then((result) => {
          setFavorite(result?.data);
        });
      });
  };

  return (
    <div className="profile-title-menu-my-share text-uppercase">
      <div className="profile-title-menu-my-share-bg scroll-num py-5">
        <Container className="detail">
          <Row className="py-5">
            {favorite?.data?.map(
              (
                {
                  id,
                  title,
                  view,
                  favorite,
                  sharingPicture,
                  createAt,
                  content,
                  firstName,
                  lastName,
                  userPicture,
                  isFavorite,
                  userId,
                },
                idx
              ) => (
                <Col
                  lg="3"
                  md="4"
                  sm="6"
                  className="mb-5"
                  // onClick={() => navigate("/sharing/" + id)}
                >
                  <Card className="box-card-shadow">
                    {+localStorage.getItem("id") === userId ||
                    +localStorage.getItem("isAdmin") === 1 ? (
                      <div className="btn-cancel-card" onClick={() => handleDel(id)}>
                        <i class="fa fa-times-circle"></i>
                      </div>
                    ) : null}
                    <Card.Body className="image">
                      <Card.Img
                        src={
                          sharingPicture
                            ? IMAGE_URL + sharingPicture
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
                    <Card.Footer>
                      <div className="user">
                        <span className="mr-1">
                          <Image
                            roundedCircle
                            src={
                              userPicture
                                ? IMAGE_URL + userPicture
                                : "https://chiccarrent.com/files/images/default-placeholder.png"
                            }
                            alt={title}
                            className="card-img-top"
                          />
                        </span>
                        <span className="pl-1">
                          {firstName} {lastName}
                        </span>
                      </div>
                      <div>
                        <span>
                          <span style={{color: "#26BEB4"}} className="mr-5">
                            <FontAwesomeIcon className="pr-2" icon={faEye} /> {view}
                          </span>
                          <span style={{color: "#26BEB4"}}>
                            {/* <FontAwesomeIcon
                              icon={isFavorite ? faHeart : faHeartBroken}
                            /> */}
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
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              )
            )}
          </Row>
          <div>
            <Pagination className="my-5" style={{float: "right"}}>
              {page > 1 && <Pagination.First onClick={() => setPage(1)} />}
              {page > 1 && <Pagination.Prev onClick={() => setPage((e) => (e -= 1))} />}
              {page > 1 && (
                <Pagination.Item onClick={() => setPage((e) => (e -= 1))}>
                  {page - 1}
                </Pagination.Item>
              )}
              {<Pagination.Item active>{page}</Pagination.Item>}
              {page < favorite?.totalPage && (
                <Pagination.Item onClick={() => setPage((e) => (e += 1))}>
                  {page + 1}
                </Pagination.Item>
              )}
              {page < favorite?.totalPage && (
                <Pagination.Next onClick={() => setPage((e) => (e += 1))} />
              )}
              {page < favorite?.totalPage && (
                <Pagination.Last onClick={() => setPage(favorite?.totalPage)} />
              )}
            </Pagination>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProfileMenuMyShare;
