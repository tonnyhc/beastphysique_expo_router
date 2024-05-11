import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { IconProps } from '@/types/common';

const TimelineIcon:React.FC<IconProps> = ({
    size,
    color
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <MaterialIcons name="timeline" size={size} color={color} />
    </View>
  )
}

export default TimelineIcon