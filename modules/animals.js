export class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  info() {
    return `Животное: ${this.name}, возраст: ${this.age}`;
  }

  walk() {
    super.walk();
    alert(`${this.name} jumps!`);
  }
}

export class Cat extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  info() {
    return `Кошка: ${this.name}, возраст: ${this.age}, порода: ${this.breed}`;
  }
}

export class Dog extends Animal {
  constructor(name, age, size) {
    super(name, age);
    this.size = size;
  }

  info() {
    return `Собака: ${this.name}, возраст: ${this.age}, размер: ${this.size}`;
  }
}
