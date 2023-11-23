import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ chartData }) => {
  console.log(chartData);
  const [initData, setInitData] = useState({
    series: [
      {
        name: "ETH",
        color: "#03045e",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        colors: ["#03045e", "transparent"],
      },
      title: {
        text: "Biểu đồ biến động giá",
        align: "left",
        colors: ["#03045e", "transparent"],
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });
  useEffect(() => {
    let priceHis = [];
    let dayHis = [];
    console.log(chartData);
    chartData?.forEach((element) => {
      priceHis.push(element.price);
      // let day = element.date.getMonth() + element.date.getDate();
      let dayNe = element.date;
      let dateObj = new Date(dayNe);
      let day = dateObj.getUTCDate();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let year = dateObj.getUTCFullYear();
      let dateData = year + "-" + month + "-" + day;
      dayHis.push(dateData);
    });

    console.log(priceHis + "..." + dayHis);

    setInitData({
      series: [
        {
          name: "ETH",
          color: "#03045e",
          data: priceHis,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          colors: ["#03045e", "transparent"],
        },
        title: {
          text: "Biểu đồ biến động giá",
          align: "left",
          colors: ["#03045e", "transparent"],
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: dayHis,
        },
      },
    });
  }, [chartData]);

  return (
    <ApexCharts
      options={initData.options}
      series={initData.series}
      type="line"
      height="370"
      width="100%"
      style={{ color: "#03045e" }}
    />
  );
};

export default LineChart;
