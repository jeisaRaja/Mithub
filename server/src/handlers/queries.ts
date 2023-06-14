const getUser = "SELECT * FROM Users;"
const getUserbyEmail = "SELECT * FROM Users WHERE email = $1;"
const insertUser ="INSERT INTO users (name, email, picture) VALUES ($1,$2,$3);"
export {getUser, getUserbyEmail, insertUser}
