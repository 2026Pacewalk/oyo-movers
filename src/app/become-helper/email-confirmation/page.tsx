import { Container } from "react-bootstrap";
import "./confimation.scss";
import { verifyEmail } from "@/lib/serverAction/becomeMoverActions";
import EmailConfirmForm from "./EmailConfirmForm";
import Link from "next/link";

const ConfirmatiomEmail = async ({ searchParams }: any) => {
  const token = searchParams?.token;
  const name = searchParams?.name;
  const redirectUrl = `/become-helper?token=${token}&name=${name}`;
  const verifyUserEmail = await verifyEmail({ token: token });
  return (
    <Container className="py-3">
      <EmailConfirmForm data={verifyUserEmail} url={redirectUrl} />
      <div className="confirmationEmail">
        <h2>Thank you for confirm your email</h2>
        <p>
          you will be redirect in few seconds or
          <Link href={redirectUrl} className="createButton">
            {" Click here"}
          </Link>
          , to continue complete your profile{" "}
        </p>
      </div>
    </Container>
  );
};

export default ConfirmatiomEmail;
