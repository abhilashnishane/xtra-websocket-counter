import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import openSocket from "socket.io-client";
import profile from '../../assets/images/profile.jpg';
import hostImg from '../../assets/images/host-img.png';
// const ENDPOINT = "http://localhost:8000";
const ENDPOINT = "https://xtralive.herokuapp.com";


export default function Participant() {
  const socket = openSocket(ENDPOINT, { transports: ['websocket'] });
  const [email, setEmail] = useState("user11@example.com");
  const [timerval, setTimerval] = useState("__");


  useEffect(() => {

    socket.emit('join', { email: email, user_type: 'participant' });

    socket.on('counter_started', (data) => {
      setTimerval(data.msg);
    });

    socket.on('counter', (data) => {
      setTimerval(data.msg);
    });

    socket.on('counter_ended', (data) => {
      setTimerval(data.msg);
    });

    return () => socket.disconnect();

  }, []);


  return (
    <Container fluid>
      <Row>
        <Col md="1" className="p-0">
          <div className="pro-img-container">
            <img src={profile} className="img-fluid" />
            <div className="pcpent-name">John Cena</div>
          </div>
          <div className="pro-img-container">
            <img src={profile} className="img-fluid" />
            <div className="pcpent-name">John Cena</div>
          </div>
          <div className="pro-img-container">
            <img src={profile} className="img-fluid" />
            <div className="pcpent-name">John Cena</div>
          </div>
        </Col>
        <Col md="11" className="p-0">
          <div className="host-large-c">
            <img src={hostImg} className="img-fluid host-large-img" />
            <div className="host-bottom-bar">
              <div className="pcpent-name">Host</div>
              <Button color="secondary" className="pcpent-countdown">{timerval}</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
