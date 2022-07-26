let Database = [
    {
      id: 1,
      name: "John Smith",
      ppi: '',
      role: 'user',
      email: "johnjohn@gmail.com",
      password: "john123", 
      reminders: [{id: 1, title: "3012 test1", description: "test the userDatabase 01", completed: false},
      {id: 2, title: "3012 test2", description: "johntest_02_des", completed: false}]
    },
    {
      id: 2,
      name: "Tom cruse",
      ppi: '',
      role: 'user',
      email: "topgun@gmail.com",
      password: "tom123",
      reminders: [{id: 1, title: "Top GUN 2", description: "hyper sonic jajaja", completed: false},
      {id: 2, title: "Tom Tom", description: "gun gun gun", completed: false}]
    },
    {
      id: 3,
      name: "Air BnB",
      ppi: '',
      role: 'administrator',
      email: 'airbbbnnnbbb@gmail.com',
      password: "air123",
      reminders: [{}]
    },
  ];
  
  const userModel = {
    findOne: (email, password) => {
      let DatabaseID = Database.length + 1
      const user = Database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      Database.push({
        id: DatabaseID,
        name: email,
        //ppi: email,
        //role: user,
        
        password: password,
        reminders: [{}]
      })
      console.log(Database)
  
      return email
      // throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = Database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },

  }
module.exports = {Database, userModel};