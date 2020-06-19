export default function({ $auth, redirect }) {
  // console.log($auth.loggedIn)
  if ($auth.loggedIn) {
    return redirect('/')
  }
}
