import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const inputboxStyle = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center',
        padding: SIZES.smallMargin,
        marginTop: 10,
    },
    header: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
        paddingBottom: SIZES.smallMargin
    },
    inputbox: {
        backgroundColor: COLORS.white,
        width: '100%',
        alignSelf: 'center',
        padding: SIZES.mediumMargin,
        paddingLeft: SIZES.large,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: SIZES.smallMargin,
    },
    dropdownbox: {
        backgroundColor: COLORS.white,
        width: '100%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: SIZES.smallMargin,
        color: COLORS.primary,
    }
})

export default inputboxStyle