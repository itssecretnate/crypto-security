const users = []

const bcryptjs = require("bcryptjs");

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && bcryptjs.compareSync(password, users[i].password)) {
          let userData = {...users[i]}
          delete userData.password;
          res.status(200).send(userData)
          return;
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')

        const { password } = req.body;

        let hashSalt = bcryptjs.genSaltSync(5);
        let hashPassword = bcryptjs.hashSync(password, hashSalt);

        users.push({...req.body, password: hashPassword})

        delete req.body.password;

        // console.log(req.body);
        res.status(200).send(req.body)
    }
}