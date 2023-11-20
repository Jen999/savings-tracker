import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.small,
    margin: SIZES.smallMargin,
    padding: SIZES.smallMargin,
    borderRadius: SIZES.xSmall,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.smallMargin,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  chev: {
    color: COLORS.primary, 
    fontSize: SIZES.xLarge
  }
});

export default styles;
