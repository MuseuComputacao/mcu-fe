import React from 'react';
import { Pressable as NativePressable } from 'react-native';

// React Native 0.68's declaration package resolves a second React 17 type tree
// in this legacy Expo app. Keep the runtime component intact while exposing a
// single React component type to the TypeScript JSX checker.
const Pressable = React.forwardRef<any, any>((props, ref) =>
  React.createElement(NativePressable as any, { ...props, ref }),
);

Pressable.displayName = 'Pressable';

export default Pressable;
