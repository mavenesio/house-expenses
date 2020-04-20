import * as React from "react";

function CircleSolid(props) {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="circle"
      className="prefix__svg-inline--fa prefix__fa-circle prefix__fa-w-16"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
      />
    </svg>
  );
}

const MemoCircleSolid = React.memo(CircleSolid);
export default MemoCircleSolid;
