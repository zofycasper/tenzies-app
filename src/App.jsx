import React from "react";
import "./App.css";
import Dice from "./Dice";

export default function App() {
    const [diceData, setDiceData] = React.useState(getNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const firstDice = diceData[0].value;
        const allSelect = diceData.every((dice) => dice.isSelect);
        const allDiceSame = diceData.every((dice) => dice.value === firstDice);

        if (allSelect && allDiceSame) {
            setTenzies(true);
        }
    }, [diceData]);

    const diceElement = diceData.map((dice, index) => {
        return (
            <Dice
                key={index}
                id={index}
                value={dice.value}
                isSelect={dice.isSelect}
                handleSelect={handleSelect}
            />
        );
    });

    function handleSelect(id) {
        setDiceData((prevData) => {
            return prevData.map((dice) => {
                return dice.id === id
                    ? { ...dice, isSelect: !dice.isSelect }
                    : dice;
            });
        });
    }

    function getNewDice() {
        let newDiceArray = [];
        for (let i = 0; i < 10; i++) {
            let randomNumber = {
                value: Math.floor(Math.random() * 10) + 1,
                isSelect: false,
                id: i,
            };
            newDiceArray.push(randomNumber);
        }
        return newDiceArray;
    }

    function handleClick() {
        if (tenzies) {
            setTenzies(false);
            setDiceData(getNewDice);
        } else {
            setDiceData((prevData) => {
                return prevData.map((dice) => {
                    return dice.isSelect
                        ? dice
                        : {
                              ...dice,
                              value: Math.floor(Math.random() * 10) + 1,
                          };
                });
            });
        }
    }

    return (
        <div className="app">
            <h2 className="title">Tenzies</h2>
            <h4 className="subtitle">
                Roll until all dice are the same. <br />
                Click each die to freeze it at its current value between rolls.
            </h4>
            <div className="dice-container">{diceElement}</div>

            <button className="roll-btn" onClick={handleClick}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </div>
    );
}
