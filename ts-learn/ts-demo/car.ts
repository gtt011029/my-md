interface Alarm {
  alert()
}
interface Light {
  lightOn(): void;
  lightOff(): void;
}
interface LightHigh extends Light{
  LightHigh(): void
}
class Door {
  public name;
  constructor(name) {
    this.name = name
  }
}

class ProtectedDoor extends Door implements Alarm {
  alert() {
    console.log('this id ProtectedDoor')
  }
}

class Car implements Alarm, LightHigh {
  alert() {
    console.log('this is car')
  }
  lightOn() {
    console.log('this car light On')
  }
  lightOff() {
    console.log('this car light off')
  }
  LightHigh() {
    console.log('LightHigh')
  }
}

let newCar = new Car
newCar.alert()