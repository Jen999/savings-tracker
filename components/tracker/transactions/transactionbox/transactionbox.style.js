import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'horizontal',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        borderColor: COLORS.tertiary,
        paddingTop: SIZES.small,
        paddingBottom: SIZES.small,
    },
    transactionLeft: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: SIZES.medium,
    },
    transactionRight: {
        flex: 0.65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: SIZES.large
    },
    date: {
        fontFamily: FONT.medium,
        fontSize: SIZES.smallmed,
        marginLeft: SIZES.medium,
    },
    text: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
    },
    amount: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        fontWeight: '900',
    },
    note: {
        color: COLORS.gray,
        fontSize: SIZES.smallmed,
        fontFamily: FONT.medium,
    }
});

export default styles;