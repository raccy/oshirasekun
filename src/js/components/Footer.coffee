import React from 'react'
import Badge, {BadgeProps} from './Badge'

Footer = ({badgeList}) ->
  badgeElementList = badgeList.map ({name, props...}) ->
    <Badge {props...} key={"badge-#{name}"}/>

  <footer role="footer">
    <hr />
    <div className="badges text-right">
      {badgeElementList}
    </div>
  </footer>

export default Footer
