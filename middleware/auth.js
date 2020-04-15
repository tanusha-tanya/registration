export default function({store, redirect}) {
    let token = window.$cookies.get('token')
    if(!token) {
      redirect('/login?message=login')
    }
}
