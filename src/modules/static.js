// hack for webpack - require favicon, index.html, manifest.json

import 'templates/index.jade'
import '!file?name=[name].[ext]!manifest.json'

require.context('!file?name=assets/[path][name].[ext]!images/favicon/')
