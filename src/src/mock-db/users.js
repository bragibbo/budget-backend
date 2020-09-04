const mockUser = {
    id: null,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  }

  module.exports.createUser = async function (body) {
      mockUser.id = body.id
      mockUser.username = body.username
      mockUser.firstName = body.firstName
      mockUser.lastName = body.lastName
      mockUser.email = body.email
      mockUser.password = body.password
      mockUser.phone = body.phone

      return { statusCode: 201, body: { description: "Create successful" }}
  }

  module.exports.login = async function (body) {
    if((body.username === mockUser.username) && (body.password === mockUser.password)) {
      return { statusCode: 200, body: { description: "Success" }}
    
    } else {
      return { statusCode: 400, body: { description: "Invalid credentials" }}
    }
  }