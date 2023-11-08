import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const inputboxStyle = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center',
        padding: SIZES.mediumMargin,
        marginTop: 15,
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
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: SIZES.smallMargin
    }
})

export default inputboxStyle