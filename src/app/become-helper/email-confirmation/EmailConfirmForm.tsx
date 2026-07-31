"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EmailConfirmForm = ({ data, url }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (data.status === 200) {
      setTimeout(() => {
        router.push(url);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default EmailConfirmForm;
