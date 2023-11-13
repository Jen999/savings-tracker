import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.small,
    margin: SIZES.smallMargin,
    padding: SIZES.smallMargin,
    borderRadius: SIZES.xSmall,
    height: 230,
    alignItems: 'center',
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    marginTop: SIZES.mediumMargin
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default styles;