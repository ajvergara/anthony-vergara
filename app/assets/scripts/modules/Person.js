class Person{
  constructor(fullName, favColor){
    this.name = fullName;
    this.color = favColor;
  }

  greet(){
    console.log("Hello! my name is " + this.name + " and my favorite color is " + this.color);
  }
}

export default Person;
