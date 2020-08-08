import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Chirp } from "../App";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";

const AllChirps: React.FC<AllChirpProps> = (props) => {
    const [chirpers, setChirp] = useState<Chirp[]>([]);
    let getChirps = async () => {
        try {
            let res = await fetch("/getall/", {
                method: "GET",
            });
            let chirpMore = await res.json();
            let chirpObj: Chirp[] = [];

            for (const chirp in chirpMore) {
                if (!chirp.includes("nextid")) {
                    chirpObj.push({
                        id: chirp,
                        header: chirpMore[chirp].header,
                        img_src: chirpMore[chirp].img_src,
                        message: chirpMore[chirp].message,
                        _created: chirpMore[chirp]._created,
                    });
                }
            }

            setChirp(chirpObj);
        } catch (e) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        getChirps();
    }, []);
    return (
        <>
            {chirpers.map((chirp) => (
                <Card
                    key={chirp.id}
                    id={chirp.id}
                    className="text-center shadow-lg col-10 col-lg-5 p-0 my-5"
                >
                    <Card.Header
                        className={
                            "w-100 row justify-content-center m-0 display-4 font-weight-bold"
                        }
                    >
                        {chirp.header}
                    </Card.Header>
                    <Card.Body className={"row w-100 justify-content-center m-0"}>
                        <Col xs={10} md={8} xl={6} className={"my-2 order-1 display-img"}>
                            <Image
                                src={chirp.img_src}
                                className={"shadow-sm "}
                                id={"img_src"}
                                width="100%"
                                height="100%"
                                rounded
                            />
                        </Col>

                        <Col className={"mt-5 mb-2 order-2"} xs={12} md={10}>
                            <p className={"font-italic"}> {chirp.message}</p>
                        </Col>
                    </Card.Body>
                    <Card.Footer className=" d-flex justify-content-between m-0 w-100">
                        <div className={"my-auto text-muted small font-italic"}>
                            {chirp._created}
                        </div>{" "}
                        <div>
                            <Link
                                to={`/chirp/${chirp.id}/admin`}
                                className={"btn btn-sm btn-secondary shadow-sm my-auto"}
                            >
                                Admin Options
                            </Link>
                        </div>
                    </Card.Footer>
                </Card>
            ))}
        </>
    );
};

export default AllChirps;

interface AllChirpProps {}
