import React from "react";
import { Container } from "react-bootstrap";
import ProfileCard from "@/components/ProfileCard";

const Profile = async () => {
  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <Container>
        <h4 className="mt-4">Profile Info</h4>
        <ProfileCard />
      </Container>
    </div>
  );
};

export default Profile;
