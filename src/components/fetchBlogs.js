const url = 'https://secure-depths-94771.herokuapp.com/';

export async function getBlogs() {
  let result = await fetch(url).then((data => data.json()));
  return result.blogs;
}