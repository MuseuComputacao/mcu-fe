import React from 'react';

import { style } from "../../globalStyles";

import RNPickerSelect from "react-native-picker-select";
import { DropdownWrapper } from './styles';

const dropdownStyle = {
  height: 56,
  width: '100%',
  paddingLeft: 14,
  paddingRight: 14,
  fontSize: 16,
  backgroundColor: style.colors.offWhite,
  borderRadius: +style.borderRadius.slice(0, 2),
};

interface DropdownProps {
  value: any;
  onValueChange: any;
  items: Array<{label:string, value:string}>;
}

const Dropdown = ({value, onValueChange, items}:DropdownProps) => {
  return (
    <DropdownWrapper>
      <RNPickerSelect
        value={value}
        onValueChange={onValueChange}
        items={items}
        useNativeAndroidPickerStyle={false}
        style={{
          inputIOS: { ...dropdownStyle },
          inputAndroid: { ...dropdownStyle },
          inputWeb: { ...dropdownStyle },
        }}
      />
    </DropdownWrapper>
  )
}

export default Dropdown
