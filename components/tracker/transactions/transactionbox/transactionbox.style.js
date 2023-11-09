import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        borderColor: COLORS.tertiary,
    },
    transactionLeft: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: SIZES.medium,
    },
    transactionRight: {
        flex: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: SIZES.large
    },
    date: {
        fontSize: SIZES.smallmed,
        fontWeight: '600'
    },
    text: {
        fontSize: SIZES.medium,
    },
    amount: {
        fontSize: SIZES.medium,
    },
});

export default styles;