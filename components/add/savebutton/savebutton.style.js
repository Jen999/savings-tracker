import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.primary,
    alignSelf: 'center',
    width: '40%',
    borderRadius: SIZES.mediumMargin,
    marginTop: 30,
  },
});

export default styles;
