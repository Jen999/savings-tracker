import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.xSmall,
    margin: SIZES.smallMargin,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.primary,
    borderWidth: 1,
    backgroundColor: COLORS.darkwhite,
    ...SHADOWS.small,
  },
  text: {
    fontFamily: FONT.medium,
  },
});

export default styles;
