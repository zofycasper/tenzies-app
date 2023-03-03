import React from "react";

export default function Dice({ value, isSelect, handleSelect, id }) {
    const style = {
        backgroundColor: isSelect ? "#59E391" : "#FFFFFF",
    };

    return (
        <div className="dice" style={style} onClick={() => handleSelect(id)}>
            {value}
        </div>
    );
}
