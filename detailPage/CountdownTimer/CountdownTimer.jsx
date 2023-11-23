import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ endTime }) => {
  return (
    <div style={{ marginLeft: "0.3rem" }}>
      <Countdown
        date={Date.now() + (endTime * 1000 - Date.now())}
        autoStart={true}
      />
    </div>
  );
};

export default CountdownTimer;
