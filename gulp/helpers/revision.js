import git from 'git-rev-sync'

var revision = {
  hash: git.short(),
  branch: git.branch(),
  count: git.count(),
  tag: git.tag(),
  version: `git-${git.short()}-${git.count()} (${git.branch()})`
}

export default revision
