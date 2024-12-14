const isDev = import.meta.env.DEV;
export function filterDraftAndHidden(posts) {
  posts = posts.filter(post => !post.data.hidden)
  if (isDev) {
    return posts;
  }
  return posts.filter(post => !post.data.draft);
}
