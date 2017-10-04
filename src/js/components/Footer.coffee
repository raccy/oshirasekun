import R from "ramda"
import React from "react"
import Badge, { BadgeProps } from "./Badge"

badgeContents = R.map((props) -> (
  <Badge {...props} />
))


Footer = ({badgeList}) -> (
  <footer role="footer">
    <hr />
    <div className="badges text-right">
      {badgeContents(badgeList)}
    </div>
  </footer>
)

export default Footer
