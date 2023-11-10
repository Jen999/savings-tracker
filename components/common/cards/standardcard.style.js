import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    padding: SIZES.mediumMargin,
    margin: SIZES.small,
    borderRadius: SIZES.mediumMargin,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    backgroundColor: COLORS.secondary,
    ...SHADOWS.small,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    fontWeight: '500',
    alignSelf: 'flex-start'
  },
});

export default styles;
