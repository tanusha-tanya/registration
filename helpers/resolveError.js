export default function (e) {
  let data
  if (e.response) {
    switch (e.response.status) {
      case 401:
        data = 'redirect'
        $nuxt.$router.push('/login?message=login')
        break
      case 422:
        data = e.response.data.errors
    }
  } else {
    data = 'data error'
    console.log(e)
  }
  return data
}
