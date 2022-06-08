import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {ViewStyle} from 'react-native';

type Props = {
  text: string;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
  rest?: TouchableOpacityProps;
};

const Button = (props: Props) => {
  const {text = '', containerStyle = {}, textStyle = {}, ...rest} = props;
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} {...rest}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
