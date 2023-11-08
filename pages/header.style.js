import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
    },
    headerText: {
        color: COLORS.white,
        fontSize: SIZES.xLarge
    },
    smallText: {
        color:COLORS.gray,
        fontSize: SIZES.small,
        marginBottom: SIZES.smallMargin
    }
})

export default styles