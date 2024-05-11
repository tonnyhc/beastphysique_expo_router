import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { IconProps } from '@/types/common';

const GearIcon:React.FC<IconProps> = ({
    size,
    color
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesome name="gear" size={size} color={color} />
    </View>
  )
}

export default GearIcon