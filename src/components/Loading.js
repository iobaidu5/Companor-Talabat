import React from 'react'
import { PropagateLoader } from "react-spinners"

const Loading = () => {
  return (
    <PropagateLoader color="#ff5a00" cssOverride={{ display: "flex", justifyContent: "center", margin: "10px auto" }} />
  )
}

export default Loading