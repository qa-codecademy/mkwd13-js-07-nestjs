//Type assertion

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    city: string;
    street: string;
  };
}

const studentJohn: Student = {
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com",
  address: {
    city: "Orlando",
    street: "Street",
  },
};

const studentJSON = JSON.stringify(studentJohn);

const parsedStudent = JSON.parse(studentJSON) as Student;
const parsedStudent2 = <Student>JSON.parse(studentJSON);

interface Todo {
  userId: number;
  id: number;
  title: string;
  author: string;
  completed: boolean;
}

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(json => {
    const todo = json as Todo;

    console.log(todo);
    console.log(todo.completed);
  });
