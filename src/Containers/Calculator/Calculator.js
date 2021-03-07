import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import Display from "../../Components/Display/Display";
import "./Calculator.css";

function Calculator() {
  const [previousNumber, setPreviousNumber] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [nextOperator, setNextOperator] = useState("");
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState(0);
  const [isEqualsClicked, setIsEqualsClicked] = useState(false);

  //Handle number keys
  const numberClickHandler = (val) => {
    setInput(input + val);
    setDisplay(display + val);
  };

  //Handle operator keys
  const operatorClickHandler = (operation) => {
    //If operators are clicked without entering number, return
    if (display === "") {
      return;
    }
    //When operator is clicked and prevNum is empty
    if (previousNumber === "") {
      setDisplay(display + operation);
      setPreviousNumber(input);
      setOperator(operation);
      setInput("");
    }
    //When operator is clicked; prevNum is not empty and operator is empty
    if (previousNumber !== "" && operator === "") {
      setDisplay(display + operation);
      setOperator(operation);
      setCurrentNumber(input);
    }
    //When once calculation cycle is completed
    if (previousNumber !== "" && operator !== "") {
      setDisplay(display + operation);
      setNextOperator(operation);
      setCurrentNumber(input);
    }
  };

  //Equals button handler
  const handleEqualsClick = () => {
    if (previousNumber !== 0 && operator !== "") {
      setCurrentNumber(input);
      setIsEqualsClicked(true);
    }
  };

  //Resetting states after calculation. This function is used inside useEffect
  const postResultCalculation = () => {
    setInput("");
    if (nextOperator !== "") {
      setOperator(nextOperator);
    }
    if (isEqualsClicked) {
      setOperator("");
    }
    setCurrentNumber("");
    setIsEqualsClicked(false);
  };

  //Result calculation triggered when current number's state is changed
  useEffect(() => {
    if (previousNumber === "" || currentNumber === "" || operator === "") {
      return;
    }
    switch (operator) {
      case "+":
        setResult(parseFloat(previousNumber) + parseFloat(currentNumber));
        setPreviousNumber(
          parseFloat(previousNumber) + parseFloat(currentNumber)
        );
        postResultCalculation();
        break;
      case "-":
        setResult(parseFloat(previousNumber) - parseFloat(currentNumber));
        setPreviousNumber(
          parseFloat(previousNumber) - parseFloat(currentNumber)
        );
        postResultCalculation();
        break;
      case "x":
        setResult(parseFloat(previousNumber) * parseFloat(currentNumber));
        setPreviousNumber(
          parseFloat(previousNumber) * parseFloat(currentNumber)
        );
        postResultCalculation();
        break;
      case "/":
        setResult(parseFloat(previousNumber) / parseFloat(currentNumber));
        setPreviousNumber(
          parseFloat(previousNumber) / parseFloat(currentNumber)
        );
        postResultCalculation();
        break;
      default:
        setResult("Error. Please click on clear");
    }
  }, [currentNumber]);

  //Clear button handler
  const handleClear = () => {
    setDisplay("");
    setInput("");
    setOperator("");
    setPreviousNumber("");
    setCurrentNumber("");
    setResult(0);
  };

  return (
    <div className="calculator">
      <Display display={display} result={result} />
      <div className="calculator__row">
        <Button onClick={numberClickHandler}>7</Button>
        <Button onClick={numberClickHandler}>8</Button>
        <Button onClick={numberClickHandler}>9</Button>
        <Button onClick={() => operatorClickHandler("+")}>+</Button>
      </div>
      <div className="calculator__row">
        <Button onClick={numberClickHandler}>4</Button>
        <Button onClick={numberClickHandler}>5</Button>
        <Button onClick={numberClickHandler}>6</Button>
        <Button onClick={() => operatorClickHandler("-")}>-</Button>
      </div>
      <div className="calculator__row">
        <Button onClick={numberClickHandler}>1</Button>
        <Button onClick={numberClickHandler}>2</Button>
        <Button onClick={numberClickHandler}>3</Button>
        <Button onClick={() => operatorClickHandler("x")}>x</Button>
      </div>
      <div className="calculator__row">
        <Button onClick={numberClickHandler}>.</Button>
        <Button onClick={numberClickHandler}>0</Button>
        <Button onClick={handleEqualsClick}>=</Button>
        <Button onClick={() => operatorClickHandler("/")}>÷</Button>
      </div>
      <p className="calculator__clear" onClick={handleClear}>
        Clear
      </p>
    </div>
  );
}

export default Calculator;
