import React from "react";

const iconPool = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      {...props}
      fill="#000000"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title></title>{" "}
        <g data-name="Layer 2" id="Layer_2">
          {" "}
          <path d="M18,18V5a3,3,0,0,0-3-3,3,3,0,0,0-3,3V6h2V5a1,1,0,0,1,1-1,1,1,0,0,1,.71.31A1,1,0,0,1,16,5V7H8V5a2.92,2.92,0,0,0-.87-2.11A2.94,2.94,0,0,0,5,2,3,3,0,0,0,2,5V6H4V5A1,1,0,0,1,5,4a1,1,0,0,1,.71.31A1,1,0,0,1,6,5V20H6c-.56,0-.8-.22-1.29-.71A3.56,3.56,0,0,0,2,18v2c.56,0,.8.22,1.29.71A3.56,3.56,0,0,0,6,22,3.56,3.56,0,0,0,8.7,20.71c.49-.49.73-.71,1.29-.71s.8.22,1.29.71a3.48,3.48,0,0,0,5.42,0c.49-.49.73-.71,1.3-.71s.8.22,1.29.71A3.57,3.57,0,0,0,22,22V20c-.56,0-.8-.22-1.29-.71A3.57,3.57,0,0,0,18,18Zm-2-3H8V13h8Zm0-6v2H8V9ZM14,20c-.56,0-.8-.22-1.29-.71A3.56,3.56,0,0,0,10,18a3.2,3.2,0,0,0-2,.65V17h8v1.65a6.48,6.48,0,0,0-.71.64C14.79,19.78,14.55,20,14,20Z"></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default iconPool;
