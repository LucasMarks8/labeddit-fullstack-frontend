export const goToHomePage = (navigate) => {
    navigate("/")
}

export const goToSignUpPage = (navigate) => {
    navigate("/signup")
}

export const goToLoginPage = (navigate) => {
    navigate("/login")
}

export const goToCommentsPage = (navigate, commentId) => {
    navigate(`/comments/${commentId}`)
}