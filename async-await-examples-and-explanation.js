//async and await explained.
//its ES7 and its supported almost all browsers (updated browsers) and in node js from version 7.6 +

const users = [{
  id: 1,
  name: 'Andrew',
  schoolId: 101
}, {
  id: 2,
  name: 'Jessica',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

/*
the async key word :
notice the promise way vs the async way. (they both have the same functionality)

intro :
instead of returning a promise, and using resolve(value) , and reject(value)
to be able to chain a value later.
we can simply use the key word async near the arguments of the function (must be ES 7 which is node 7.6+)

behind the scenes these to functions are 100% identical.

and there would be no difference at all if we would call getUser instead of getUserAlt.

async explained :
when returning a value from an async function (a function with the word async)
it is like user resolve(value) - which means the async function returns a PROMISE

when throwing an error  from an async function
it is like user reject(value).

return in async function  = returns a PROMISE with the value returned.
*/

//promise way
const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};
//async way.
const getUserAlt = async(id) =>{
    const user = users.find((user) => user.id === id);
    if (user) {
        return user
    } else {
        throw new Error("the user does not exists.");
    }
};
getUserAlt(1).then((user) => console.log("user printed is :",user)).catch(e => console.log(e));



/*
 the await keyword "

 intro : first i created an async function getGradesAlt - returns a promise with the value of grades.

 regarding getStatusAlt and getStatus:
 behind the scenes these to functions are 100% identical.
 and there would be no difference at all if we would call getStatus instead of getStatusAlt.

 problem with promises :
 1. not very readable.
 2. notice getStatus function.
    after calling .then on the promise of getGradesAlt , we want to access the user object that was returned from getUser
    unfortunately we don`t have access to the user property , therefore we must create an ugly variable on the getStatus scope,
    and assign it a value in the getUser promise , (then we also have to call the variable of the callback in an ugly name.)

  await solves these problems.

  calling await is similar to calling .then for ex:
  const user = await getUser(userId);
  is equal :
  const user = getUser(userId).then((user) => user);

  but notice that we can only use await in an async function , that`s why we cant call getStatusAlt() like this :
  const status = await getStatusAlt(1)

  with the new async/await syntax the code is way more readable ,maintainable ,shorter,simpler
  and there is no problem with indention , promise chaining , and accessing a value of a previous promise call in the chain
  (like user).

  with async await we can access these values with ease as you can see user, grades.
  and simply call the next async function with their values.
  and without using Promise chaining which makes the code indent and complex.

  remember :
    async makes return  return a PROMISE<value>
    and await replaces .then, and gives as the VALUE.
    we can only call await in an ASYNC FUNCTION.

*/

const getGradesAlt = async(schoolId) => {
    return grades.filter(g => g.schoolId === schoolId)
};



const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGradesAlt(user.schoolId);
  let average = grades.map(g => g.grade).reduce((a,b) => a+b) / grades.length;
  return average;

};

const getStatus = (userId) => {
  let user;

  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGradesAlt(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
  });
};


getStatusAlt(1).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});
