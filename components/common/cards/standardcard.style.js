import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    padding: SIZES.mediumMargin,
    margin: SIZES.medium,
    borderRadius: SIZES.mediumMargin,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    backgroundColor: COLORS.secondary,
    ...SHADOWS.small,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    alignSelf: 'flex-start'
  },
});

export default styles;
