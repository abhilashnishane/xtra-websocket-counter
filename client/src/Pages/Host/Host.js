import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import openSocket from "socket.io-client";
import profile from '../../assets/images/profile.jpg';
import hostImg from '../../assets/images/host-img.png';
// const ENDPOINT = "http://localhost:8000";
const ENDPOINT = "https://xtralive.herokuapp.com";

export default function Host() {
  const socket = openSocket(ENDPOINT, { transports: ['websocket'] });
  const [email, setEmail] = useState("user1@example.com");

  useEffect(() => {

    socket.emit('join', { email: email, user_type: 'host' });

  }, []);

  function startCounter(timerVal) {
    let data = { email: email, user_type: 'host', time_val: timerVal };
    socket.emit('counter_activated', data);
  }

  return (
    <Container fluid className="main-c">

      <Row>
        <Col md="6" className="p-0 video-col">
          <div className="host-large-c host-view">
            <img src={hostImg} className="img-fluid host-large-img" />
            <div className="pcpent-name">John Cena</div>
          </div>
        </Col>
        <Col md="6" className="p-0 video-col">
          <div className="host-large-c host-view">
            <img src={hostImg} className="img-fluid host-large-img" />
            <div className="pcpent-name">John Cena</div>
          </div>
        </Col>
        <Col md="6" className="p-0 video-col">
          <div className="host-large-c host-view">
            <img src={hostImg} className="img-fluid host-large-img" />
            <div className="pcpent-name">John Cena</div>
          </div>
        </Col>
        <Col md="6" className="p-0 video-col">
          <div className="host-large-c host-view">
            <img src={hostImg} className="img-fluid host-large-img" />
            <div className="pcpent-name">John Cena</div>
          </div>
        </Col>
      </Row>

      <Row className="host-bottom-bar">
        <Col md="12" className="host-btn-container">
          <Button color="secondary" className="counter-btn" onClick={() => startCounter(5)}>5 s</Button>
          <Button color="secondary" className="counter-btn" onClick={() => startCounter(15)}>15 s</Button>
          <Button color="secondary" className="counter-btn" onClick={() => startCounter(30)}>30 s</Button>
          <Button color="secondary" className="counter-btn" onClick={() => startCounter(45)}>45 s</Button>
        </Col>
      </Row>

    </Container>
  )
}
