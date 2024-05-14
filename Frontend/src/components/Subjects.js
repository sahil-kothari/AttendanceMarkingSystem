import React from "react";
const Subjects = ({ day, timeTable, setTimeTable }) => {
  return (
    <>
      {timeTable?.slots.map(([start, end], index) => {
        return (
          <th key={index}>
            <input
              value={timeTable.subjects[day][index]}
              style={{ width: "200px" }}
              type="text"
              id={day + start}
              onChange={(e) => {
                setTimeTable((prev)=>{
                  let newTimeTable = {...prev}
                  newTimeTable.subjects[day][index] = e.target.value
                  return newTimeTable
                })
              }}
            />
          </th>
        );
      })}
    </>
  );
};

export default Subjects;
