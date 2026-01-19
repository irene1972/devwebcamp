import bcrypt from 'bcrypt';

const matchPassword = function(password, savedPassword){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, savedPassword, (err, matches) => {
      if (err) reject(err)
      else resolve(matches)
    })
  })
}

export default matchPassword