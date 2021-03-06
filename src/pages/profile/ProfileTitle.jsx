import React, {useState, useEffect} from "react";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Container, Image, Form, Modal, Row, Col} from "react-bootstrap";
import {
  API_GET_USER_INFO,
  API_GET_USER_UPDATE,
  API_GET_USER_PWD_UPDATE,
  API_GET_USER_UPDATE_PHOTO,
  IMAGE_URL,
} from "../../apis";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const ProfileTitle = () => {
  const [userInfo, setUserInfo] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPwd, setShowPwd] = useState(false);
  const handleClosePwd = () => setShowPwd(false);
  const handleShowPwd = () => setShowPwd(true);

  useEffect(() => {
    handleGetUserInfo();
  }, []);
  const handleGetUserInfo = () => {
    API_GET_USER_INFO(localStorage.getItem("id")).then((result) => {
      setUserInfo(result?.data);
    });
  };
  const navigate = useNavigate();

  const [editProfileForm, setEditProfileForm] = useState({
    firstName: userInfo?.firstName,
    lastName: userInfo?.LastName,
  });
  const [editPwdForm, setEditPwdForm] = useState({
    password1: "",
    password2: "",
  });

  useEffect(() => {
    setEditProfileForm({
      firstName: userInfo?.firstName,
      lastName: userInfo?.LastName,
    });
  }, [userInfo?.firstName, userInfo?.LastName]);

  const userUpdate = (e) => {
    e.preventDefault();
    API_GET_USER_UPDATE(localStorage.getItem("id"), editProfileForm)
      .then(() => {
        Swal.fire("สำเร็จ!", "เปลี่ยนแปลงข้อมูลสำเร็จ!", "success").then(() => {
          handleClose();
          handleGetUserInfo();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error?.error,
          text: error?.message,
        });
      });
  };
  const userPwdUpdate = (e) => {
    e.preventDefault();
    API_GET_USER_PWD_UPDATE(editPwdForm)
      .then(() => {
        Swal.fire("สำเร็จ!", "เปลี่ยนแปลงรหัสผ่านสำเร็จ!", "success").then(() => {
          handleClose();
          handleGetUserInfo();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error?.error,
          text: error?.message,
        });
      });
  };
  const userUpdatePhoto = (e) => {
    // console.log(e.target.files[0]);
    API_GET_USER_UPDATE_PHOTO(localStorage.getItem("id"), e.target.files[0])
      .then(() => {
        Swal.fire("สำเร็จ!", "เปลี่ยนแปลงข้อมูลสำเร็จ!", "success").then(() => {
          handleClose();
          handleGetUserInfo();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error?.error,
          text: error?.message,
        });
      });
  };
  return (
    <div className="profile-title text-uppercase">
      <div className="profile-title-bg scroll-num py-5">
        <Container className="text-center">
          <Image
            src={
              userInfo?.picture
                ? IMAGE_URL + userInfo?.picture
                : "https://chiccarrent.com/files/images/default-placeholder.png"
            }
            alt={userInfo?.firstName + " " + userInfo?.LastName}
            className="about-team-circle"
          />
          <p className="h1 pt-4">{userInfo?.firstName + " " + userInfo?.LastName}</p>
          <p className="h1 pt-2">{userInfo?.email}</p>
          <div className="pt-2">
            <Button variant="light" className="text-dark" onClick={handleShow}>
              EDIT <FontAwesomeIcon icon={faEdit} />
            </Button>
          </div>
        </Container>

        <Modal
          size="md"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="d-flex justify-content-center profile-popup-edit"
          // bsPrefix="profile-popup-edit"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Container className="text-center">
              <div className="avatar-upload">
                <div className="avatar-edit">
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => userUpdatePhoto(e)}
                  />
                  <label for="imageUpload"></label>
                </div>
                <div className="avatar-preview">
                  <div
                    id="imagePreview"
                    style={{
                      backgroundImage: `url(
                        ${
                          userInfo?.picture
                            ? IMAGE_URL + userInfo?.picture
                            : "https://chiccarrent.com/files/images/default-placeholder.png"
                        }
                        )`,
                    }}
                  ></div>
                </div>
              </div>
              {!showPwd ? (
                <Form className="text-left">
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>
                      <h4>
                        ชื่อ<span style={{color: "red"}}>*</span>
                      </h4>
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="ชื่อ"
                      value={editProfileForm.firstName}
                      onChange={(e) =>
                        setEditProfileForm({
                          ...editProfileForm,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>
                      <h4>
                        นามสกุล<span style={{color: "red"}}>*</span>
                      </h4>
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="นามสกุล"
                      value={editProfileForm.lastName}
                      onChange={(e) =>
                        setEditProfileForm({...editProfileForm, lastName: e.target.value})
                      }
                    />
                  </Form.Group>

                  <Row>
                    <Col xs="12">
                      <button
                        type="button"
                        style={{width: "100%"}}
                        className="mx-0 btn btn-success about-talk-with-us-btn-success"
                        onClick={() => handleShowPwd()}
                      >
                        เปลี่ยนรหัสผ่าน
                      </button>
                    </Col>
                    <Col sm="6">
                      <div
                        style={{width: "100%"}}
                        className="btn btn-lg btn-danger btn-block text-uppercase mb-3"
                        onClick={handleClose}
                      >
                        <h4 className="m-0">CANCLE</h4>
                      </div>
                    </Col>
                    <Col sm="6">
                      <button
                        style={{width: "100%"}}
                        className="btn btn-lg btn-success btn-block text-uppercase mb-3 btn btn-success about-talk-with-us-btn-success"
                        onClick={(e) => userUpdate(e)}
                      >
                        <h4 className="m-0">OK</h4>
                      </button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <Form className="text-left">
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>
                      <h4>
                        Password<span style={{color: "red"}}>*</span>
                      </h4>
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      value={editPwdForm.password1}
                      onChange={(e) =>
                        setEditPwdForm({
                          ...editPwdForm,
                          password1: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>
                      <h4>
                        Re Password<span style={{color: "red"}}>*</span>
                      </h4>
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      value={editPwdForm.password2}
                      onChange={(e) =>
                        setEditPwdForm({...editPwdForm, password2: e.target.value})
                      }
                    />
                  </Form.Group>

                  <Row>
                    <Col sm="6">
                      <div
                        style={{width: "100%"}}
                        className="btn btn-lg btn-danger btn-block text-uppercase mb-3"
                        onClick={handleClosePwd}
                      >
                        <h4 className="m-0">CANCLE</h4>
                      </div>
                    </Col>
                    <Col sm="6">
                      <button
                        style={{width: "100%"}}
                        className="btn btn-lg btn-success btn-block text-uppercase mb-3 btn btn-success about-talk-with-us-btn-success"
                        onClick={(e) => userPwdUpdate(e)}
                      >
                        <h4 className="m-0">OK</h4>
                      </button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ProfileTitle;
