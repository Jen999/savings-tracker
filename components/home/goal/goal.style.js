import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    margin: SIZES.smallMargin,
    padding: SIZES.smallMargin,
    borderRadius: SIZES.xSmall,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.smallMargin,
    marginTop: SIZES.smallMargin,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  progressBar: {
    alignSelf: 'center',
    marginTop: SIZES.smallMargin,
  },
  percentage: {
    alignSelf: 'flex-end',
    marginRight: SIZES.smallMargin,
    fontWeight: "500",
  },
  warning: {
    alignSelf: 'center',
    color: 'darkred',
    fontWeight: '500'
  },
  text: {
    fontSize: SIZES.medium
  },
  amount: {
    fontSize: SIZES.smallmed
  }
});

export default styles;
