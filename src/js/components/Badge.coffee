import React from 'react'

Badge = (props) ->
  <span className={"badge badge-#{props.level} ml-1"} key={props.name}>
    {props.text}
  </span>

export default Badge
