import React, {useEffect} from "react";
import {useState} from "react";
import {Container, Image, Form, Row, Col, Badge} from "react-bootstrap";
import CKEditor from "ckeditor4-react";

import {
  API_CREATE_SHARING,
  API_GET_TAGS,
  API_UPDATE_SHARING_PHOTO,
  IMAGE_URL,
} from "../../apis";

import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Typeahead} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const CreateTitle = () => {
  const [sharingData, setSharingData] = useState({
    title: "",
    content: "",
    isDraft: "true",
    tags: [],
    type: "",
  });

  const [typeData] = useState({
    data: [
      {id: 1, title: "คําแนะนําแบบสั้น ( BA )"},
      {id: 2, title: "คำปรึกษาแบบสั้น ( BI )"},
      {id: 3, title: "ฝึกสติแบบสั้น ( MBBI )"},
      {id: 4, title: "สติบําบัด ( MBTC )"},
    ],
  });
  const [tagData, setTagData] = useState(null);
  const [imgData, setImgData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API_GET_TAGS()
      .then((e) => {
        setTagData(e?.data);
      })
      .catch();
  }, []);
  const createSharing = () => {
    API_CREATE_SHARING(sharingData)
      .then((e) => {
        // console.log(e);
        Swal.fire("สำเร็จ!", "สร้างแชร์สำเร็จ!", "success").then(() => {
          // console.log(imgData);
          if (imgData) {
            API_UPDATE_SHARING_PHOTO(e?.data?.id, imgData)
              .then((e) => {
                // console.log(e);
                Swal.fire("สำเร็จ!", "บันทึกรูปแชร์สำเร็จ!", "success").then(() =>
                  navigate(-1)
                );
              })
              .catch((e) =>
                Swal.fire({
                  icon: "error",
                  title: e?.response?.data?.error,
                  text: e?.response?.data?.message,
                })
              );
          } else {
            navigate(-1);
          }
        });
      })
      .catch((e) => {
        // console.log(e);
        Swal.fire({
          icon: "error",
          title: e?.response?.data?.error,
          text: e?.response?.data?.message,
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
              onMouseOver={() => setSharingData({...sharingData, isDraft: "true"})}
              onClick={() => {
                createSharing();
              }}
            >
              บันทึกแบบร่าง
            </div>
            <div
              className="share"
              onMouseOver={() => setSharingData({...sharingData, isDraft: "false"})}
              onClick={async () => {
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
                    onChange={(e) => setImgData(e.target.files[0])}
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
              <div
                style={{
                  textAlignLast: "center",
                }}
              >
                <Image
                  src={
                    imgData
                      ? URL.createObjectURL(imgData)
                      : "https://chiccarrent.com/files/images/default-placeholder.png"
                  }
                  style={{
                    maxWidth: "500px",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Container>

      <Container className="px-0">
        <div className="box-sheare detail">
          <Col xs="12">
            <Row>
              <Col md="12">
                <div className="header">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>ชื่อแชร์</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ชื่อแชร์"
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
          </Col>
        </div>
      </Container>

      <div className="tag">
        <Container>
          <div>
            <h1>ติด Tag ให้แชร์</h1>
          </div>
        </Container>
        <Container className="input-tag">
          {/* <Badge pill variant="primary">
            Primary
          </Badge> */}
          {/* <Form> */}
          {/* <Form.Group controlId="formBasicEmail"> */}
          {/* <Form.Label>รายละเอียดย่อของแชร์ (0/300)</Form.Label> */}
          {/* <Form.Control type="text" as="textarea" /> */}
          {/* </Form.Group> */}
          {/* </Form> */}
          <Form.Group style={{marginTop: "20px"}}>
            {/* <Form.Label>รายละเอียดย่อของแชร์</Form.Label> */}
            <Typeahead
              id="basic-typeahead-multiple"
              labelKey="name"
              multiple
              onChange={(e) => setSharingData({...sharingData, tags: e})}
              options={tagData?.data}
              labelKey="title"
              placeholder="เลือก TAG"
              selected={sharingData.tag}
            />
          </Form.Group>
        </Container>
      </div>

      <div className="tag">
        <Container>
          <div>
            <h1>ติด TYPE ให้แชร์</h1>
          </div>
        </Container>
        <Container className="input-tag">
          {/* <Badge pill variant="primary">
            Primary
          </Badge> */}
          {/* <Form> */}
          {/* <Form.Group controlId="formBasicEmail"> */}
          {/* <Form.Label>รายละเอียดย่อของแชร์ (0/300)</Form.Label> */}
          {/* <Form.Control type="text" as="textarea" /> */}
          {/* </Form.Group> */}
          {/* </Form> */}
          <Form.Group style={{marginTop: "20px"}}>
            {/* <Form.Label>รายละเอียดย่อของแชร์</Form.Label> */}
            <Typeahead
              id="basic-typeahead"
              labelKey="name"
              onChange={(e) => setSharingData({...sharingData, type: e[0]?.id})}
              options={typeData?.data}
              labelKey="title"
              placeholder="เลือก TYPE"
              selected={sharingData?.type?.id}
            />
          </Form.Group>
        </Container>
      </div>
    </div>
  );
};

export default CreateTitle;
