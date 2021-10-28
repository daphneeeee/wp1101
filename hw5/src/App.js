import React, { useState } from "react";
import Wrapper from "./Wrapper";
import Screen from "./Screen";
import ButtonArea from "./ButtonArea";
import Button from "./Button";

export default function App() {
  const [num, setNum] = useState(0);
  const [res, setRes] = useState(0);
  const [calculate, setCalculate] = useState("");
  const [acc, setAcc] = useState(0);

  const buttons = [
    ["MC", "MR", "M+", "e"],
    ["+/-", "%", "AC", "C"],
    [7, 8, 9, "÷"],
    [4, 5, 6, "x"],
    [1, 2, 3, "-"],
    ["=", 0, ".", "+"],
  ];

  const handleNum = (e) => {
    const input = e.target.innerHTML[0];
    if (num.toString().length < 18) {
      if (num === 0) {
        setNum(input);
      } else {
        setNum(num.toString() + input);
      }
    }
  };

  const handleCalc = (e) => {
    const input = e.target.innerHTML[0];
    if (num !== 0) {
      setRes(num);
    }
    setCalculate(input);
    setNum(0);
  };

  const handleDecimal = () => {
    if (!num.toString().includes(".")) {
      setNum(num + ".");
    }
  };

  const handleInvert = () => {
    if (num !== 0) {
      setNum(num * -1);
    }
    if (res !== 0) {
      setRes(res * -1);
    }
    setCalculate("");
  };

  const handlePercent = () => {
    let number = parseFloat(num);
    let response = parseFloat(res);
    setNum((number /= 100));
    setRes((response /= 100));
    setCalculate("");
  };

  const handleClear = () => {
    setNum(0);
    setRes(0);
    setCalculate("");
  };

  const handleBack = () => {
    if (num !== 0) {
      setNum(num.toString().substring(0, num.toString().length - 1));
    } else {
      setNum(0);
      setRes(0);
    }
  };

  const handleEqual = () => {
    if (calculate !== "" && num !== 0) {
      if (calculate === "+") {
        setRes(Number(res) + Number(num));
        // setRes(Math.round(Number(res) + Number(num) * 1e15) / 1e15);
      } else if (calculate === "-") {
        setRes(Number(res) - Number(num));
        // setRes(Math.round(Number(res) - Number(num) * 1e15) / 1e15);
      } else if (calculate === "x") {
        setRes(Math.round(Number(res) * Number(num) * 1e15) / 1e15);
      } else {
        if (num === "0") {
          setRes("Error");
        } else {
          setRes(Math.round((Number(res) / Number(num)) * 1e15) / 1e15);
        }
      }
      setNum(0);
      setCalculate("");
    }
  };

  const handleMPlus = () => {
    if (num === 0) {
      setAcc(Number(acc) + Number(res));
    } else {
      setAcc(Number(acc) + Number(num));
      setRes(num);
      setNum(0);
    }
  };

  const handleMR = () => {
    setRes(acc);
  };

  const handleMC = () => {
    if (acc !== 0) {
      setAcc(0);
      setNum(0);
      setRes(0);
    }
  };

  const handleExp = () => {
    if (Number(num).toExponential() !== "0e+0") {
      setNum(Number(num).toExponential());
    }
  };

  return (
    <div>
      <Wrapper>
        <Screen currentNum={num ? num : res} />
        <ButtonArea>
          {buttons.map((button) =>
            button.map((btn, key) => {
              switch (btn) {
                case "+":
                  return <Button key={key} value={btn} onclick={handleCalc} />;
                case "-":
                  return <Button key={key} value={btn} onclick={handleCalc} />;
                case "x":
                  return <Button key={key} value={btn} onclick={handleCalc} />;
                case "÷":
                  return <Button key={key} value={btn} onclick={handleCalc} />;
                case "=":
                  return <Button key={key} value={btn} onclick={handleEqual} />;
                case ".":
                  return (
                    <Button key={key} value={btn} onclick={handleDecimal} />
                  );
                case "%":
                  return (
                    <Button key={key} value={btn} onclick={handlePercent} />
                  );
                case "+/-":
                  return (
                    <Button key={key} value={btn} onclick={handleInvert} />
                  );
                case "C":
                  return <Button key={key} value={btn} onclick={handleBack} />;
                case "AC":
                  return <Button key={key} value={btn} onclick={handleClear} />;
                case "MR":
                  return <Button key={key} value={btn} onclick={handleMR} />;
                case "M+":
                  return <Button key={key} value={btn} onclick={handleMPlus} />;
                case "MC":
                  return <Button key={key} value={btn} onclick={handleMC} />;
                case "e":
                  return <Button key={key} value={btn} onclick={handleExp} />;
                default:
                  return <Button key={key} value={btn} onclick={handleNum} />;
              }
            })
          )}
        </ButtonArea>
      </Wrapper>
    </div>
  );
}
