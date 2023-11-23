import { LineChart } from "@/detailPage/componentIndex";
import React from "react";
import Style from "../styles/predict.module.css";
import { Footer, Header } from "@/components/componentsIndex";

const predict = () => {
  return (
    <div style={{ backgroundColor: "rgb(250, 249, 246)" }}>
      <Header />
      <div className={Style.predict}>
        <div className={Style.predict_info}>
          <h1>Dự đoán biến động</h1>
        </div>
        <div className={Style.chart}>
          <LineChart />
        </div>
        <div className={Style.predict_box}>
          Biến động giá dự đoán ngày tiếp theo: -12$ (0.2%)
        </div>
        <div className={Style.alert}>
          Chú ý: Chức năng chỉ mang tính thao khảo để phòng ngừa rủi ro
        </div>
      </div>
      <Footer theme="dark" />
    </div>
  );
};

export default predict;
