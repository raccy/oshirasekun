import React from 'react'

News = ({error, loaded, html}) ->
  if loaded
    <div className="news bg-light border border-dark rounded"
      dangerouslySetInnerHTML={__html: html} />
  else if error?
    <div className="alert alert-danger">
      お知らせの読み込みに失敗しました。
    </div>
  else
    <div className="alert alert-danger">
      お知らせが読み込まれていません。
    </div>

export default News
