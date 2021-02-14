export default function({ store, redirect, route }) {
  // If the user is not authenticated
  if (
    !store.state.user &&
    route.name !== "register" &&
    route.name !== "login"
  ) {
    console.log(route);
    return redirect("/login");
  }
}
