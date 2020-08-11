import * as React from "react";
import { useEffect, useState } from "react";
import * as moment from "moment";

import * as $ from "jquery";
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
            Enter chirp title here. The title must not be left blank and cannot exceed
            40 characters.
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
            Enter chirp message here. The message must not be left blank and cannot
            exceed 1000 characters.
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
    const [validated, setValidated] = useState(false);
    const isValidated = () => setValidated(true);
    const formElement: HTMLFormElement = document.getElementById(
        "chirp_form"
    ) as HTMLFormElement;
    const messageElement: HTMLTextAreaElement = document.getElementById(
        "message"
    ) as HTMLTextAreaElement;
    let messageLength: number;
    if (messageElement !== null) messageLength = messageElement.value.length;
    else messageLength = 0;
    const STARTING_LENGTH = 1000 - messageLength;
    const [textLength, setTextLength] = useState(STARTING_LENGTH);

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
        else
            alert(
                "Error: Your image can not be updated until you enter a valid image url."
            );

        return false;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextLength(1000 - e.currentTarget.value.length);
    };
    const findInvalid = () => {
        $(document).ready(function () {
            $('.form-control:invalid')[0].focus();
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.checkValidity() === true) {
            if (props.match.params.id === undefined) postFunc();
        }
        else
            findInvalid();

        isValidated();
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
                    validated={validated}
                    onSubmit={handleSubmit}
                    id={"chirp_form"}
                    className={"m-0"}
                >
                    <Form.Text
                        className={"font-italic small m-0"}
                        id={"required_warning"}
                        muted
                    >
                        ( <span className={"required"}></span> Indicates required )
                    </Form.Text>
                    <Card.Header className={"w-100 row justify-content-center m-0"}>
                        <Form.Group className={"my-2 col-12"}>
                            <Form.Label className={"required"}>
                                <b>
                                    {props.match.params.id === undefined ? "Title" : "Edit Title"}
                                </b>
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
                                    maxLength={40}
                                    required
                                    autoFocus
                                />
                            </OverlayTrigger>
                            <Form.Control.Feedback type="invalid">
                                Title must not be blank
                            </Form.Control.Feedback>
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
                                    <b>
                                        {props.match.params.id === undefined
                                            ? "Image Url"
                                            : "Edit Image Url"}
                                    </b>
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
                                <Form.Label className={"required"}>
                                    <b>
                                        {props.match.params.id === undefined
                                            ? "Message"
                                            : "Edit Message"}
                                    </b>
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
                                        onChange={handleChange}
                                        name={"message"}
                                        className={"shadow-sm"}
                                        id={"message"}
                                        maxLength={1000}
                                        required
                                    />
                                </OverlayTrigger>
                                <Form.Text className={"font-italic small text-left"} muted>
                                    You have {textLength} characters left.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid" className={"text-left"}>
                                    Message must not be blank
                                </Form.Control.Feedback>
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
                                    invalid={findInvalid}
                                    validate_form={isValidated}
                                    form_element={formElement}
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
