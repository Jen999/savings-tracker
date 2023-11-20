import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
    },
    headerText: {
        color: COLORS.white,
        fontSize: SIZES.xLarge,
        fontFamily: FONT.medium,
    },
    smallText: {
        color: COLORS.gray,
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
        marginBottom: SIZES.smallMargin
    },
    subHeaders: {
        color: COLORS.primary,
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
    },
    container: {
        backgroundColor: COLORS.white,
        padding: SIZES.xxLarge,
    },
    errorMessage: {
        fontFamily: FONT.medium,
        color: COLORS.red
    },
    successMessage: {
        fontFamily: FONT.medium,
        color: COLORS.green
    }
})

export default styles