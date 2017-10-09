import React from 'react'
import Badge from './Badge'

Footer = ({badgeList, closable}) ->
  badgeElementList = badgeList.map ({name, props...}) ->
    <Badge {props...} key={"badge-#{name}"}/>

  closeElement = if closable
    <div>
      <button className="btn btn-primary" type="button">
        <i className="fa fa-close" />
        閉じる
      </button>
    </div>
  else
    <div />

  <footer role="footer">
    <hr />
    <div className="d-flex justify-content-between">
      <div />
      {closeElement}
      <div className="badges">
        {badgeElementList}
      </div>
    </div>
  </footer>

export default Footer
