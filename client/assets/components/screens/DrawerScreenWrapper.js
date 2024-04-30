import React from "react";
import {StyleSheet} from "react-native";
import Animated, {interpolate, useAnimatedStyle} from "react-native-reanimated";
import {useDrawerProgress} from "@react-navigation/drawer";

const DrawerScreenWrapper = ({children}) => {
  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(
            progress.value,
            [0, 1],
            [0, -15],
            "clamp"
          )}deg`,
        },
      ],
      opacity: interpolate(progress.value, [0, 1], [1, 0], "clamp"),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerScreenWrapper;
