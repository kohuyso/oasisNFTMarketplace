import React, { useState, useCallback, useEffect, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useAddress } from "@thirdweb-dev/react";
import Style from "../styles/account.module.css";
import images from "@/images";
import Form from "@/accountPage/Form/Form";
import { Footer, Header } from "@/components/componentsIndex";
import AlertComponent from "@/components/AlertComponent/AlertComponent";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
import GuestError from "@/components/GuestError/GuestError";
const account = () => {
  const { api_getOneAccount } = useContext(Oasis_APIContext);
  const address = useAddress();
  const message = "Bạn cần kết nối với ví điện tử";
  const [fileUrl, setFileUrl] = useState(images.avatar1);
  const [openAlert, setOpenAlert] = useState(false);
  const [account, setAccount] = useState({ avatar: images.avatar1 });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setOpenAlert(address);
      api_getOneAccount(address).then((item) => {
        console.log(item);
        if (item) {
          console.log(item);
          setAccount(item);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [address]);

  // useEffect(() => {
  //   api_getOneAccount(address).then((item) => {
  //     console.log(item);
  //     if (item) {
  //       console.log(item);
  //       setAccount(item);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      console.log(account);
      setFileUrl(account?.avatar);
    }

    return () => {
      isMounted = false;
    };
  }, [account]);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = new FileReader();
    file.onload = () => {
      console.log(file.result);
      setFileUrl(file.result);
    };
    file.readAsDataURL(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div style={{ backgroundColor: "rgb(250, 249, 246)" }}>
      <Header />
      {address ? (
        <div className={Style.account}>
          <div className={Style.account_info}>
            <h1>Thông tin tài khoản</h1>
          </div>

          <div className={Style.account_box}>
            <div className={Style.account_box_img} {...getRootProps()}>
              <input {...getInputProps()} />
              <Image
                src={fileUrl || images.avatar1}
                alt="account upload"
                width={150}
                height={150}
                className={Style.account_box_img_img}
              />
              <p className={Style.account_box_img_para}>
                Thay đổi ảnh đại diện
              </p>
            </div>
            <div className={Style.account_box_from}>
              <Form fileUrl={fileUrl} accountData={account} />
            </div>
          </div>
        </div>
      ) : (
        <GuestError />
      )}
      <Footer theme="dark" />
    </div>
  );
};

export default account;
