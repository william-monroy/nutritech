import React, { useState, useEffect } from "react";
import { Divider, Input, Popover, Spacer, Text } from "@nextui-org/react";
import styles from "./Autocomplete.module.css";

const Autocomplete = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const recetas = [
      "Tlayudas",
      "Mole coloradito",
      "Tejate",
      "Sopa de guías",
      "Tamales oaxaqueños",
    ];
    setOptions(recetas);
  }, []);

  return (
    <>
      <Input
        label="Autocomplete"
        placeholder="Autocomplete"
        type="text"
        name="autocomplete"
        onChange={(e) => setSearch(e.target.value)}
      />
      {display && (
        <div className={styles.autocomplete}>
          {options
            .filter((option) =>
              option.toLowerCase().includes(search.toLowerCase())
            )
            .map((option) => (
              <>
                <div
                  key={option}
                  className={styles.option}
                  onClick={() => setSearch(option)}
                >
                  {option}
                </div>
                <Spacer y={0.3} />
                <Divider />
                <Spacer y={0.3} />
              </>
            ))}
          {/* <Text css={{ margin: "0px" }}>Ejemplo de Item</Text>
          <Text css={{ margin: "0px" }}>Ejemplo de Item</Text> */}
        </div>
      )}
    </>
  );
};

export default Autocomplete;
