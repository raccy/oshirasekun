import React from 'react'
import Badge from './Badge'

Footer = ({badgeList, closable, handleClose}) ->
  badgeElementList = badgeList.map ({name, props...}) ->
    <Badge {props...} key={"badge-#{name}"}/>

  closeElement = if closable
    <span>
      <button className="btn btn-primary" type="button" onClick={handleClose}>
        <i className="fa fa-close" />
        閉じる
      </button>
    </span>
  else
    <span />

  <footer role="footer">
    <hr />
    <div className="d-flex justify-content-between">
      <div className="footer-left text-left"/>
      <div className="fotter-center text-center">
        {closeElement}
      </div>
      <div className="footer-right text-right badges">
        {badgeElementList}
      </div>
    </div>
  </footer>

export default Footer
