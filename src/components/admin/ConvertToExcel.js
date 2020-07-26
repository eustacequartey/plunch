import React from "react";
import { JsonToExcel } from "react-json-excel";

const ConvertToExcel = () => {
  const className = "class-name-for-style";
  const filename = "Excel-file";
  const fields = {
    index: "Index",
    guid: "GUID",
  };
  const style = {
    padding: "5px",
  };
  const data = [
    { index: 0, guid: "asdf231234" },
    { index: 1, guid: "wetr2343af" },
  ];
  const text = "Convert Json to Excel";

  return (
    <>
      <JsonToExcel
        data={data}
        className={className}
        filename={filename}
        fields={fields}
        style={style}
        text={text}
      />
    </>
  );
};

export default ConvertToExcel;
