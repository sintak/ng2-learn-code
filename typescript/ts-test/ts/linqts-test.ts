import { List } from 'linqts';

let arr = new List<number>([1, 2, 3, 4, 5])
    .Where(x => x > 3)
    .Select(y => y * 2)
    .ToArray(); // > [8, 10] 
console.log(arr);

interface Person {
    Name: string;
    Age: number;
}

let bob: Person = { Name: "Bob", Age: 50 };
let cathy: Person = { Name: "Cathy", Age: 15 };

let people = new List<Person>(
    [
        { Name:"Alice", Age: 25 },
        bob,
        cathy
    ]
    );
console.log(people.Where(p => p.Age > 20));

interface Pet {
    Owner: Person;
    Name: string;
}

let pets = new List<Pet>(
    [
        { Owner: bob, Name: "DoDo"},
        { Owner: cathy, Name: "FeiFei"}
    ]
    );

let query = people.Join(pets,
    person => person,
    pet => pet.Owner,
    (person, pet) =>
        ({ OwnerName: person.Name, Pet: pet.Name }));
console.log(query);
