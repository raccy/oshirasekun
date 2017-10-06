import React from 'react'

Badge = ({level, text}) ->
  <span className={"badge badge-#{level} ml-1"}>
    {text}
  </span>

export default Badge
