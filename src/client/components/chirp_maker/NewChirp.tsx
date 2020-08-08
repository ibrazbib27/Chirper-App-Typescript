import * as React from "react";
import * as moment from "moment";

import * as $ from "jquery";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Chirp } from "../App";
import ModalConfirmation from "../modal/ModalConfirmation";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export interface NewChirpProps
    extends RouteComponentProps<{ id: null | string }> {}

export interface ModalObj {
    header: string;
    body: string;
}
const NewChirp: React.FC<NewChirpProps> = (props) => {
    const renderTooltipTitle = (props: any) => (
        <Tooltip id="button-tooltip_title" {...props}>
            Enter chirp title here
        </Tooltip>
    );
    const renderTooltipImg = (props: any) => (
        <Tooltip id="button-tooltip_img" {...props}>
            The image url the that you enter must end with one of the following: .gif,
            .jpg, .jpeg, and .png. An invalid entry of a url will return an error
            message and will not be processed on submission or update to the chirp. In
            order to upload an new image you must click the "Upload Image" button
            after filling out the url field.
        </Tooltip>
    );
    const renderTooltipMes = (props: any) => (
        <Tooltip id="button-tooltip_mes" {...props}>
            Enter chirp message here
        </Tooltip>
    );

    const modalText: ModalObj[] = [
        {
            header: "Update Confirmation",
            body: "Are you sure you would like to makes changes to this chirp?",
        },
        {
            header: "Delete Confirmation",
            body: "Are you sure you would like to delete this chirp?",
        },
    ];

    const [chirp, setChirp] = useState<Chirp>({
        id: "",
        header: "",
        img_src: "",
        message: "",
        _created: "",
    });
    let getChirp = async () => {
        try {
            let res = await fetch(`/api/${props.match.params.id}/admin`, {
                method: "GET",
            });
            let chirpMore = await res.json();
            let myChirp = JSON.parse(JSON.stringify(chirpMore));
            setChirp({
                id: props.match.params.id,
                header: myChirp.header,
                img_src: myChirp.img_src,
                message: myChirp.message,
                _created: myChirp._created,
            });
        } catch (e) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        if (props.match.params.id) getChirp();
    }, []);

    let handleUpload = () => {
        const img: HTMLImageElement = document.getElementById(
            "img_src"
        ) as HTMLImageElement;
        const imgUrl: HTMLInputElement = document.getElementById(
            "img_upload"
        ) as HTMLInputElement;
        if (
            imgUrl.value.endsWith(".gif") ||
            imgUrl.value.endsWith(".jpg") ||
            imgUrl.value.endsWith(".jpeg") ||
            imgUrl.value.endsWith(".png")
        )
            img.src = imgUrl.value;
        else alert("Error: The url you entered is not a valid Image url.");

        return false;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (props.match.params.id === undefined) postFunc();
    };

    let chirpForm = () => {
        let form = $(`#chirp_form`).serializeArray();
        let formData: any = {};
        formData.header = form[0].value;
        let imgElement: HTMLImageElement = document.getElementById(
            "img_src"
        ) as HTMLImageElement;
        formData.img_src = imgElement.src;
        formData.message = form[2].value;
        formData._created = moment().format("LLL").toString();
        return formData;
    };
    let postFunc = async () => {
        let formData: any = chirpForm();

        try {
            await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(formData),
            });
            props.history.push("/");
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <>
            <Card className="text-center shadow-lg col-12 col-sm-10 col-lg-8 p-0">
                <Form
                    noValidate
                    onSubmit={handleSubmit}
                    id={"chirp_form"}
                    className={"m-0"}
                >
                    <Card.Header className={"w-100 row justify-content-center m-0"}>
                        <Form.Group className={"my-2 col-12"}>
                            <Form.Label>
                                <b>{
                                    props.match.params.id === undefined
                                        ? "Title"
                                        : "Edit Title"
                                }</b>
                            </Form.Label>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipTitle}
                            >
                                <Form.Control
                                    type="text"
                                    name={"header"}
                                    className={"shadow-sm"}
                                    id={"title"}
                                    defaultValue={
                                        props.match.params.id === undefined ? "" : chirp.header
                                    }
                                    required
                                    autoFocus
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Card.Header>
                    <Card.Body className={"row w-100 justify-content-center m-0"}>
                        <Col xs={8} md={6} className={"my-2 order-1 display-img"}>
                            <Image
                                src={
                                    props.match.params.id === undefined
                                        ? "https://www.evolvefish.com/assets/images/Decals/EF-VDC-00035(Black).jpg"
                                        : chirp.img_src
                                }
                                className={"shadow-sm display-img"}
                                id={"img_src"}
                                width="100%"
                                height="100%"
                                rounded
                            />
                        </Col>
                        <Col className={" my-4 order-2"} xs={12} md={10}>
                            <Form.Group className={"my-2 w-100"}>
                                <Form.Label>
                                    <b>{
                                        props.match.params.id === undefined
                                            ? "Image Url"
                                            : "Edit Image Url"
                                    }</b>
                                </Form.Label>
                                <InputGroup className={"shadow-sm"}>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipImg}
                                    >
                                        <Form.Control
                                            defaultValue={
                                                props.match.params.id === undefined
                                                    ? "https://www.evolvefish.com/assets/images/Decals/EF-VDC-00035(Black).jpg"
                                                    : chirp.img_src
                                            }
                                            name={"img_src"}
                                            type="url"
                                            id={"img_upload"}
                                        />
                                    </OverlayTrigger>
                                    <InputGroup.Append>
                                        <Button
                                            onClick={handleUpload}
                                            variant={"primary"}
                                            size={"sm"}
                                        >
                                            Upload Image
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        <Col className={"my-2 order-3 "} xs={12} md={10}>
                            <Form.Group>
                                <Form.Label>
                                    <b>{
                                        props.match.params.id === undefined
                                            ? "Message"
                                            : "Edit Message"
                                    }</b>
                                </Form.Label>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipMes}
                                >
                                    <Form.Control
                                        as="textarea"
                                        defaultValue={
                                            props.match.params.id === undefined ? "" : chirp.message
                                        }
                                        name={"message"}
                                        className={"shadow-sm"}
                                        id={"message"}
                                    />
                                </OverlayTrigger>
                            </Form.Group>
                        </Col>
                    </Card.Body>
                    <Card.Footer
                        className={
                            props.match.params.id === undefined
                                ? "row mx-0 w-100 justify-content-center"
                                : "row mx-0 w-100 justify-content-between"
                        }
                    >
                        {" "}
                        {props.match.params.id === undefined ? (
                            <div className={"col"}>
                                <Button type="submit" className="shadow-sm" variant="success">
                                    Create Chirp
                                </Button>
                            </div>
                        ) : (
                            <>
                                <ModalConfirmation
                                    chirp_obj={chirpForm}
                                    mod_obj={modalText}
                                    location={props.location}
                                    match={props.match}
                                    history={props.history}
                                />
                            </>
                        )}{" "}
                    </Card.Footer>
                </Form>
            </Card>
        </>
    );
};
export default NewChirp;
