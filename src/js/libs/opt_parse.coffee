import {app} from 'electron'
import Getopt from 'node-getopt'

package_info = "#{app.getName()} - version #{app.getVersion()}"
options = [
  ['c', 'config=FILE', 'config file'],
  ['d', 'debug', 'debug mode'],
  ['h', 'help', 'display this help'],
  ['v', 'version', 'show version']
]
helpTemplate = """
#{package_info}
Usage: oshirasekun [options]

[[OPTIONS]]
"""
appExit = (exitCode = 0) -> app.exit(exitCode)
displayVersionAndQuit = ->
  console.info(package_info)
  appExit()

getOpt = Getopt.create(options)
.bindHelp(helpTemplate)
.on('version', displayVersionAndQuit)

export default (argv = process.argv.slice(2)) ->
  getOpt.parse(argv)
