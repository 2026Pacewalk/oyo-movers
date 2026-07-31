"use client";
import { Card, ListGroup } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { PiAddressBookThin } from "react-icons/pi";
import { useUserData } from "../User/UserDataHook";
import "./profileCard.scss";
import Image from "../Image";

const ProfileCard = () => {
  const { user } = useUserData();

  return (
    <Card className="mt-4 profileCard">
      <div className="d-flex gap-3 profileCard__inner ">
        <Image
          src={user?.imgSrc ? user?.imgSrc : "/images/avtar.jpg"}
          alt="avtar"
          className="profileCard__inner__cardImg"
        />
        <div className="cardHead">
          <div className="d-flex justify-content-between ">
            <Card.Title className="mb-0">About</Card.Title>

          </div>

          <Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <div className="profileField">
                  <FaRegUser />
                  <h5>Name : </h5>
                </div>
                <p>{user?.name}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="profileField">
                  <MdOutlineMailOutline />
                  <h5> Email :</h5>
                </div>
                <p>{user?.email}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="profileField">
                  <MdOutlinePhoneInTalk />
                  <h5> Contact :</h5>
                </div>
                <p>{user?.phone}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="profileField">
                  <PiAddressBookThin />
                  <h5>Address :</h5>
                </div>
                <p> {user?.addresses?.length ? user?.addresses : "-"}</p>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
