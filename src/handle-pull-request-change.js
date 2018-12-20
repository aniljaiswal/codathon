module.exports = handlePullRequestChange

async function handlePullRequestChange (context, config) {
  const { title, head } = context.payload.pull_request
  const wipPresent = title.includes('WIP:')

  const state = wipPresent ? 'pending' : 'success'

  const status = {
    sha: head.sha,
    state,
    target_url: 'https://github.com/anuragmaher',
    description: 'WIP present check',
    context: 'Pull Request Tests'
  }

  const result = await context.github.repos.createStatus(context.repo(status))
  return result
}
