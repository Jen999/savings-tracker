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
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginRight: SIZES.smallMargin,
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
    color: COLORS.red,
    fontWeight: '500'
  },
  goal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.smallMargin,
    paddingLeft: SIZES.mediumMargin,
    paddingRight: SIZES.mediumMargin,
  },
  text: {
    fontSize: SIZES.medium,
    fontWeight: '500',
  },
  amount: {
    fontSize: SIZES.smallmed
  },
  nogoal: {
    alignSelf: 'center',
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    fontWeight: '500',
    color: COLORS.secondary
  }
});

export default styles;
