"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import CreateUpdateProfileForm from "./ProfileForm";
import ResetPasswordForm from "./ResetPasswordForm";
import "./accountSetting.scss"


const AccountTabs = () => {
  const [key, setKey] = useState<string>("resetPas");

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k: any) => setKey(k)} className="mb-3 accountTabs">
      {/* <Tab eventKey="home" title="User Profile">
        <CreateUpdateProfileForm />
      </Tab> */}
      <Tab eventKey="resetPas" title="Change Password">
        <ResetPasswordForm />
      </Tab>
    </Tabs>
  );
};

export default AccountTabs;
