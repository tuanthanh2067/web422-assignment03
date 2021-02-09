import React from "react";
import { Card, Button } from "react-bootstrap";

const About = () => {
  return (
    <Card>
      <Card.Header as="h5">About me</Card.Header>
      <Card.Body>
        <Card.Title>Tuan Thanh Tan</Card.Title>
        <Card.Text>
          I have a couple of small projects using React. I'm trying to learn
          both front-end and back-end development to build a social media app
          like Facebook and a chat app
        </Card.Text>
        <Button variant="primary" href="https://github.com/tuanthanh2067">
          Github
        </Button>
        <Button
          variant="warning"
          href="https://www.linkedin.com/in/tuan-thanh-tan-aa980419a/"
          className="ml-2"
        >
          LinkedIn
        </Button>
      </Card.Body>
    </Card>
  );
};

export default About;
