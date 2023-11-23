import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";

import Style from "./Form.module.css";
import { Button } from "@/components/componentsIndex";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
import { useAddress } from "@thirdweb-dev/react";
import AlertComponent from "@/components/AlertComponent/AlertComponent";

const Form = ({ fileUrl, accountData }) => {
  const { api_updateAccount } = useContext(Oasis_APIContext);
  const address = useAddress();

  const [name, setName] = useState(accountData.name || "");
  const [email, setEmail] = useState(accountData.email || "");
  const [description, setDescription] = useState(accountData.description || "");
  const [fbLink, setFbLink] = useState(accountData.link || "");
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Tên người dùng</label>
            <input
              type="text"
              placeholder={accountData?.name || "Tên người dùng"}
              className={Style.Form_box_input_userName}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                type="text"
                placeholder={accountData?.email || "Email"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Mô tả</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder={accountData?.description || "Mô tả"}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            ></textarea>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input
                  type="text"
                  placeholder={accountData?.link || "facebook.com"}
                  onChange={(e) => {
                    setFbLink(e.target.value);
                  }}
                  value={fbLink}
                />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Địa chỉ ví</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder={accountData._id || "address"}
                value={address}
              />
              <div
                className={Style.Form_box_input_box_icon}
                onClick={() => copyAddress}
              >
                <MdOutlineContentCopy onClick={() => copyAddress()} />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button
              btnName="Cập nhập thông tin"
              handleClick={() => {
                event.preventDefault();
                api_updateAccount(
                  address,
                  name,
                  email,
                  description,
                  fbLink,
                  fileUrl
                );
                setAlertMessage({
                  message: "Cập nhật thông tin thành công",
                  type: 2,
                });
                setOpenAlert(true);
              }}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
      {openAlert ? (
        <AlertComponent
          setOpenAlert={setOpenAlert}
          alertMessage={alertMessage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Form;
