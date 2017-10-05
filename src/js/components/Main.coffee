import R from 'ramda'
import React from 'react'
import Auth from './Auth'

Footer = ({mainMode, inputtable, handleAuth}) ->
  content = R.cond([
    [R.equals('loading'), (_s) -> (
      <div className="alert alert-info" role="alert">
        <strong>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
        </strong>
        準備中です。しばらくお待ちください。
      </div>
    )],
    [
      R.equals('auth'),
      (_s) -> (<Auth inputtable={inputtable} onSubmit={handleAuth} />)
    ],
    [
      R.equals('news'),
      (_s) -> (<div>ニュース(未完成)</div>)
    ],
    [R.T, (_s) -> (
      <div className="alert alert-danger" role="alert">
        <strong>
          <i className="fa fa-exclamation-circle"></i>
        </strong>
        不明な状態です。管理者に問い合わせてください。
      </div>
    )]
  ])(mainMode)
  (
    <main role="main">
      <div className="container-fluid">
        {content}
      </div>
    </main>
  )

export default Footer