import {faBook, faFolder, faMailBulk, faShare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import ProfileMenuMyShare from "./ProfileMenuMyShare";
import ProfileMenuFolder from "./ProfileMenuFolder";
import ProfileMenuSharing from "./ProfileMenuSharing";
import ProfileMenuLeaning from "./ProfileMenuLeaning";

const ProfileMenu = () => {
  const [navActive, setNavActive] = useState(1);
  const handleNavActive = (ele) => setNavActive(ele);
  return (
    <div className="profile-menu text-uppercase">
      <div className="h2">
        <Col className="profile-menu-bg text-center">
          <Row>
            <Col
              xs="3"
              className={`py-2 ${navActive === 1 ? "profile-menu-active" : ""}`}
              onClick={() => handleNavActive(1)}
            >
              <Row className="align-items-center justify-content-center">
                <Col md="12">
                  <FontAwesomeIcon icon={faMailBulk} />
                </Col>
                <Col md="12">
                  <p className="m-0">แชร์ของฉัน</p>
                </Col>
              </Row>
            </Col>
            <Col
              xs="3"
              className={`py-2 ${navActive === 2 ? "profile-menu-active" : ""}`}
              onClick={() => handleNavActive(2)}
            >
              <Row className="align-items-center justify-content-center">
                <Col md="12">
                  <FontAwesomeIcon icon={faFolder} />
                </Col>
                <Col md="12">
                  <p className="m-0">แบบร่าง</p>
                </Col>
              </Row>
            </Col>
            <Col
              xs="3"
              className={`py-2 ${navActive === 3 ? "profile-menu-active" : ""}`}
              onClick={() => handleNavActive(3)}
            >
              <Row className="align-items-center justify-content-center">
                <Col md="12">
                  <FontAwesomeIcon icon={faShare} />
                </Col>
                <Col md="12">
                  <p className="m-0">Sharing ที่ถูกใจ</p>
                </Col>
              </Row>
            </Col>
            <Col
              xs="3"
              className={`py-2 ${navActive === 4 ? "profile-menu-active" : ""}`}
              onClick={() => handleNavActive(4)}
            >
              <Row className="align-items-center justify-content-center">
                <Col md="12">
                  <FontAwesomeIcon icon={faBook} />
                </Col>
                <Col md="12">
                  <p className="m-0">E Learning ที่ถูกใจ</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </div>
      {navActive === 1 ? <ProfileMenuMyShare /> : ""}
      {navActive === 2 ? <ProfileMenuFolder /> : ""}
      {navActive === 3 ? <ProfileMenuSharing /> : ""}
      {navActive === 4 ? <ProfileMenuLeaning /> : ""}
    </div>
  );
};

export default ProfileMenu;
