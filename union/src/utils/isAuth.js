const isAuth = ( Token ) => {
    if (Token === undefined || Token === "undefined" || Token === "" || Token === " ") {
        return false
    } else {
        return true
    }
  };

export default isAuth;