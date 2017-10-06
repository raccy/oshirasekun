import R from 'ramda'
import React from 'react'
import Auth from './Auth'

Main = ({mainMode, inputtable, handleAuth}) ->
  content = switch mainMode
    when 'loading'
      <div className="alert alert-info" role="alert">
        <strong>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
        </strong>
        準備中です。しばらくお待ちください。
      </div>
    when 'auth'
      <Auth inputtable={inputtable} onSubmit={handleAuth} />
    when 'news'
      <div>ニュース(未完成)</div>
    else
      <div className="alert alert-danger" role="alert">
        <strong>
          <i className="fa fa-exclamation-circle"></i>
        </strong>
        不明な状態です。管理者に問い合わせてください。
      </div>

  <main role="main">
    <div className="container-fluid">
      {content}
    </div>
  </main>

export default Main
