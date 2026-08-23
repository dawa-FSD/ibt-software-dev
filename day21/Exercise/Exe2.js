const KEY = "students";

function save(students) {
  try {
    localStorage.setItem(KEY, JSON.stringify(students));
  } catch (error) {
    console.error(error);
  }
}

function load() {
  try {
    const data = localStorage.getItem(KEY);

    if (data === null) {
      return [];
    }

    const students = JSON.parse(data);

    if (!Array.isArray(students)) {
      return [];
    }

    return students;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const students = [
  {
    name: "Dawa",
    age: 22,
  },
  {
    name: "Abel",
    age: 23,
  },
];

save(students);

const result = load();

console.log(result);
