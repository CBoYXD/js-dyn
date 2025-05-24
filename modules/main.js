import { Animal, Cat, Dog } from './animals.js';

const animals = [
  new Animal("Животное", 5),
  new Cat("Кот", 2, "Неизвестная порода"),
  new Dog("Собака", 4, 10)
];

animals.forEach(animal => {
  console.log(animal.info());
});