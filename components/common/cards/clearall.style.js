import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: SIZES.small,
    },
    subHeaders: {
        color: COLORS.primary,
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
    },
    clearall: {
        marginTop: 7,
        color: COLORS.gray,
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
        marginBottom: SIZES.smallMargin
    }
});

export default styles;
