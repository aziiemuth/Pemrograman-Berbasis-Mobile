// components/CustomHeader.js
import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title, showBack = false }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      {showBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default CustomHeader;
