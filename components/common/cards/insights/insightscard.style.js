import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.xSmall,
    margin: SIZES.smallMargin,
    borderRadius: SIZES.smallMargin,
    borderColor: COLORS.primary,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: SIZES.smallMargin
  },
  text: {
    fontFamily: FONT.medium,
  },
  promptRed: {
    fontFamily: FONT.medium,
    fontWeight: '700',
    color: COLORS.red,
  },
  promptGreen: {
    fontFamily: FONT.medium,
    fontWeight: '700',
    color: COLORS.green
  },
  date: {
    fontFamily: FONT.medium,
    fontWeight: '700',
  },
});

export default styles;
