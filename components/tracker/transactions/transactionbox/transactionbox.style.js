import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingRight: SIZES.large,
        paddingLeft: SIZES.xxLarge,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    transaction: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: SIZES.xxLarge,
    },
    text: {
        fontSize: SIZES.medium,
    },
    amount: {
        fontSize: SIZES.medium,
    }
});

export default styles;