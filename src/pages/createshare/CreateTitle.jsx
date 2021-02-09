import React from "react";
import {useState} from "react";
import {Container, Image, Form, Row, Col, Badge} from "react-bootstrap";
import CKEditor from "ckeditor4-react";

import {API_CREATE_SHARING, IMAGE_URL} from "../../apis";

import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const CreateTitle = () => {
  const [sharingData, setSharingData] = useState({
    title: "",
    content: "",
    isDraft: "true",
    tags: [{id: 1}],
  });
  const createSharing = () => {
    API_CREATE_SHARING(sharingData)
      .then((e) => {
        console.log(e);
        Swal.fire("สำเร็จ!", "สร้างแชร์สำเร็จ!", "success").then(() => {});
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: e?.error,
          text: e?.message,
        });
      });
  };
  return (
    <div>
      <div className="tab-btn mb-5">
        <Container>
          <div className="d-flex justify-content-end">
            <div
              className="save"
              onClick={() => {
                setSharingData({...sharingData, isDraft: "true"});
                createSharing();
              }}
            >
              บันทุกแบบล่าง
            </div>
            <div
              className="share"
              onClick={async () => {
                setSharingData({...sharingData, isDraft: "false"});
                createSharing();
              }}
            >
              เผยแพร่
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="title">
          <h1>เนื้อหาแชร์</h1>
        </div>
      </Container>
      <Container className="box-sheare">
        <Col xs="12">
          <Row>
            <Col xs="12">
              <div className="up-img">
                <div className="text-up">ภาพปก</div>
                <form
                // onSubmit={onSubmit}
                >
                  <input
                    id="file"
                    type="file"
                    // ref={fileInput}
                    // The onChange should trigger updates whenever
                    // the value changes?
                    // Try to select a file, then try selecting another one.
                    // onChange={forceUpdate}
                    // multiple
                  />
                  <label htmlFor="file">
                    <span
                      tabIndex="0"
                      className="btn-img"
                      role="button"
                      aria-controls="filename"
                    >
                      เลือกไฟล์
                    </span>
                  </label>
                </form>

                {/* <div className="scroll-img"> */}
                {/* <Image src="image/home/home1.png" />
            <Image src="image/home/home1.png" />
            <Image src="image/home/home1.png" />
            <Image src="image/home/home1.png" />
            <Image src="image/home/home1.png" />
            <Image src="image/home/home1.png" />
            <Image src="image/home/home1.png" />
            <Image src="image/home/home1.png" />
            <Image src="image/home/home1.png" /> */}
                {/* </div> */}
              </div>
            </Col>
            <Col md="12">
              <div className="views-img">
                <Image
                  src="image/home/home1.png"
                  style={{
                    maxWidth: "-webkit-fill-available",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Container>

      <Container className="px-0">
        <div className="box-sheare detail">
          <Row>
            <Col md="12">
              <div className="header">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>ชื่อแชร์(0/50)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setSharingData({...sharingData, title: e.target.value});
                    }}
                  />
                </Form.Group>
                {/* <Form.Group controlId="formBasicEmail">
                  <Form.Label>รายละเอียดย่อของแชร์ (0/300)</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    onChange={(e) => {
                      setSharingData({...sharingData, content: e.target.value});
                    }}
                  />
                </Form.Group> */}
              </div>
            </Col>
            <Col xs="12">
              <CKEditor
                onChange={(evt) => {
                  setSharingData({...sharingData, content: evt.editor.getData()});
                }}
                // onChange={(evt) => console.log(evt.editor.getData())}
                // data={this.state.events_detail_th}
                // onChange={this.onEditorTHChange}
                // config={{
                //   filebrowserBrowseUrl: 'http://localhost:3000/#/gallery/',
                // }}
              />
            </Col>
          </Row>
        </div>
      </Container>

      <div className="tag">
        <Container>
          <div>
            <h1>ติด Tag ให้แชร์</h1>
          </div>
        </Container>
        <Container className="input-tag">
          <Badge pill variant="primary">
            Primary
          </Badge>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>รายละเอียดย่อของแชร์ (0/300)</Form.Label>
              <Form.Control type="text" as="textarea" />
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default CreateTitle;
