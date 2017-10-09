import {readFile} from 'fs'
import {resolve, isAbsolute} from 'path'
import {URL} from 'url'
import _ from 'lodash'
import marked from 'marked'
import {newsLoad} from '../actions'

###
テキストのタイプ
- "plain" "text" "txt" プレーンテキスト
- "html" "htm" HTML
- "markdown" "md" Markdown converted by marked
- "asciidoc" "adoc" Asciidoc converted by Asciidoctor
- "review" "re" Re:VIEW converted by review.js
###

export default class News
  constructor: (@store) ->
    @html = undefined
    unsubscribe = @store.subscribe =>
      state = @store.getState()
      if state.news.show and not state.news.loaded and state.news.path?
        # 読込は一度のみ
        unsubscribe()
        @loadNews(state.news, state.config.dir)

  loadNews: ({path, type, encode}, configDir) ->
    fullPath = if path instanceof URL
      new URL(path, configDir)
    else
      resolve(configDir, path)

    readFile fullPath, encode, (err, data) =>
      if err
        @store.dispatch(newsLoad(err))
        return
      try
        @html = @convertHtml(data, type)
        if @html?
          @store.dispatch(newsLoad(@html))
        else
          throw new Error('HTML変換に失敗しました。')
      catch loadError
        @store.dispatch(newsLoad(loadError))

  convertHtml: (data, type) ->
    switch type
      when 'plain', 'text', 'txt'
        @plainToHtml(data)
      when 'html', 'htm'
        data
      when 'markdown', 'md'
        @markdownToHtml(data)
      when 'asciidoc', 'adoc'
        throw new Error('Asciidoc形式は未実装です。')
      when 'review', 're'
        throw new Error('Re:VIEW形式は未実装です。')
      else
        throw new Error('お知らせのテキストが不明なタイプです。')

  palinToHtml: (data) ->
    escapedText = _.escape(data)
    html = """
           <pre class="news-text">
           #{escapedText}
           </pre>
           """

  markdownToHtml: (text) ->
    marked(text)
