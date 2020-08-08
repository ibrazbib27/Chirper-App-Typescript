import * as React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

interface FooterProps {}

const About: React.FC<FooterProps> = (props) => {
    return (
        <Jumbotron className={"text-center col-10 col-lg-6 shadow-lg bg-secondary text-white"}>
            <h1>Who Are We?</h1>
            <p className={"mt-5"}>
                The Chirper App is a social media platform designed for users to use to
                express themselves.
            </p>
        </Jumbotron>
    );
};

export default About;
