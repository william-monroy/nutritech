import { Switch } from "@nextui-org/react";
import React from "react";
import useDarkMode from "use-dark-mode";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

const SwitchTheme = () => {
  const darkMode = useDarkMode(false);

  return (
    <Switch
      checked={useDarkMode.value}
      size="xl"
      iconOn={<SunIcon filled />}
      iconOff={<MoonIcon filled />}
      onChange={() => darkMode.toggle()}
    />
  );
};

export default SwitchTheme;
