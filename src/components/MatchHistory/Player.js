import React from "react";

export default function Player(props) {
  const { placement, traits, units } = props.playerInfo;
  console.log(traits, units);
  const traitsJSX = traits.reduce((acc, curr) => {
    if (curr.tier_current > 0) {
      acc.push(<div>{curr.name}</div>);
    }
    return acc;
  }, []);

  const unitsJSX = units.map((unit) => {
    return <img src={unit.path} alt={unit.name}></img>;
  });
  console.log(unitsJSX);
  return (
    <div>
      <div>{placement}</div>
      <div>{traitsJSX}</div>
      <div>{unitsJSX}</div>
      <img src="public/champions/TFT8_Aphelios"></img>
    </div>
  );
}
