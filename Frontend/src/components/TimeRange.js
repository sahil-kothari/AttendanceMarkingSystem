import React from "react";
const TimeRange = ({ start, end, index, setTimeTable }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "200px"
      }}
    >
      <input
        value={start}
        onChange={(e) => {
          setTimeTable((prev)=>{
            let newTimeTable = {...prev}
            newTimeTable.slots[index][0] = e.target.value
            return newTimeTable;
          })
        }}
        id={index + start}
        type="time"
      />

      <input
        value={end}
        onChange={(e) => {
          setTimeTable((prev)=>{
            let newTimeTable = {...prev}
            newTimeTable.slots[index][1] = e.target.value
            return newTimeTable;
          });
        }}
        id={index + end}
        type="time"
      />
    </div>
  );
};

export default TimeRange;
