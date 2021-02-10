import React, { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { faEye, faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";

import { API_GET_SHARING, IMAGE_URL } from "../../apis";
import { useNavigate } from "react-router-dom";

const SheetThree = () => {
  const navigate = useNavigate();

  const [sharing, setSharing] = useState(null);
  useEffect(() => {
    API_GET_SHARING().then((result) => {
      setSharing(result?.data);
    });
  }, []);
  return (
    <div className="sheet-three">
      {sharing ? (
        <Swiper
          autoplay={1000}
          slidesPerView={"auto"}
          spaceBetween={50}
          loop={true}
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 2,
            },
          }}
        >
          {sharing?.data?.map(
            (
              {
                id,
                title,
                view,
                favorite,
                sharingPicture,
                firstName,
                lastName,
                userPicture,
                content,
              },
              idx
            ) => (
              <SwiperSlide>
                <div
                  className="mobile-padding pl-lg-5 px-md-5 py-5"
                  onClick={() => navigate("/sharing/" + id)}
                >
                  <Card className="box-card-shadow">
                    <Card.Body className="image">
                      <Card.Img
                        src={
                          sharingPicture
                            ? IMAGE_URL + sharingPicture
                            : "https://chiccarrent.com/files/images/default-placeholder.png"
                        }
                        style={{ height: "349px" }}
                        alt={title}
                        className="card-img-top"
                      />
                    </Card.Body>
                    <Card.Body>
                      <Card.Title className="text-overflow-1">{title}</Card.Title>
                      <Card.Text className="subtitle-text">{content}</Card.Text>
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
                      <Card.Text className="mr-auto ">
                        <span className="d-flex justify-content-between">
                          <span style={{ color: "#26BEB4" }}>
                            <FontAwesomeIcon icon={faEye} />
                            {view}
                          </span>
                          <span style={{ color: "#26BEB4" }}>
                            <FontAwesomeIcon icon={faHeart} />
                            {favorite}
                          </span>
                        </span>
                      </Card.Text>
                    </Card.Body>

                  </Card>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      ) : null}
      {/* <Swiper
        spaceBetween={50}
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }}
      >
        {sharing?.data?.map(
          (
            {id, title, view, favorite, sharingPicture, firstName, lastName, userPicture},
            idx
          ) => (
            <SwiperSlide>
              <div className="mobile-padding pl-lg-5 px-md-5 py-5">
                <Card className="box-card-shadow">
                  <Card.Body className="image">
                    <Card.Img src="image/image7.png" alt="" className="card-img-top" />
                  </Card.Body>
                  <Card.Body>
                    <Card.Title>HOW TO BA คนไข้ที่มีพฤติกรรมดื่มสุราหนัก</Card.Title>
                    <Card.Subtitle>Lorem ipsum dolor sit amet</Card.Subtitle>
                    <Card.Text className="subtitle-text">
                      Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet
                      consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor
                      sit amet consecteturLorem ipsum dolor sit amet consecteturLorem
                      ipsum dolor sit amet consecteturLorem ipsum dolor sit amet
                      consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor
                      sit amet consectetur
                    </Card.Text>
                    <div className="user">
                      <span className="mr-1">
                        <Image
                          roundedCircle
                          src="image/image6.png"
                          alt=""
                          className="card-img-top"
                        />
                      </span>
                      <span className="pl-1">user</span>
                    </div>
                    <div>
                      <span className="mr-1">
                        <i className="fa fa-eye"></i> 7998
                      </span>
                      <span>
                        <i className="fa fa-comments-o"></i> 30{" "}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper> */}

      {/* <Row className="m-0">
          <div lg="6" md="6" sm="12" xs="12" className="mobile-padding py-5">
            <Card className="box-card-shadow">
              <Card.Body className="image">
                <Card.Img src="image/image7.png" alt="" className="card-img-top" />
              </Card.Body>
              <Card.Body>
                <Card.Title>
                  HOW TO BA คนไข้ที่มีพฤติกรรมดื่มสุราหนัก
                </Card.Title>
                <Card.Subtitle>Lorem ipsum dolor sit amet</Card.Subtitle>
                <Card.Text>Lorem ipsum dolor sit amet, consectetur</Card.Text>
                <div className="user">
                  <span className="mr-1">
                    <Image
                      roundedCircle
                      src="image/image6.png"
                      alt=""
                      className="card-img-top"
                    />
                  </span>
                  <span className="pl-1">user</span>
                </div>
                <div>
                  <span className="mr-1">
                    <i className="fa fa-eye"></i> 7998
                  </span>
                  <span>
                    <i className="fa fa-comments-o"></i> 30{" "}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div lg="6" md="6" sm="12" xs="12" className="mobile-padding py-5">
            <Card className="box-card-shadow">
              <Card.Body className="image">
                <Card.Img src="image/image8.png" alt="" className="card-img-top" />
              </Card.Body>
              <Card.Body>
                <Card.Title>
                  HOW TO BA คนไข้ที่มีพฤติกรรมดื่มสุราหนัก
                </Card.Title>
                <Card.Subtitle>Lorem ipsum dolor sit amet</Card.Subtitle>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur
                </Card.Text>
                <div className="user">
                  <span className="mr-1">
                    <Image
                      roundedCircle
                      src="image/image9.png"
                      alt=""
                      className="card-img-top"
                    />
                  </span>
                  <span className="pl-1">user</span>
                </div>
                <div>
                  <span className="mr-1">
                    <i className="fa fa-eye"></i> 7998
                  </span>
                  <span>
                    <i className="fa fa-comments-o"></i> 30{" "}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Row> */}
    </div>
  );
};
export default SheetThree;
