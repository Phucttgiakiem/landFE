import {
    Document,
    Page,
    Text,
    View,
    Font,
    StyleSheet
} from "@react-pdf/renderer"

import dayjs from "dayjs"
import RobotoRegular from "../../assets/fonts/Roboto-Regular.ttf"
import RobotoBold from "../../assets/fonts/Roboto-Bold.ttf"
// REGISTER FONT
Font.register({
    family: "Roboto",
    fonts: [
        {
            src: RobotoRegular
        },
        {
            src: RobotoBold,
            fontWeight: 700
        }
    ]
})

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Roboto",
        fontSize: 12,
        lineHeight: 1.5
    },

    title: {
        fontSize: 24,
        fontWeight: 700,
        textAlign: "center",
        marginBottom: 20
    },

    section: {
        marginBottom: 15
    },

    heading: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 8
    },

    text: {
        marginBottom: 4
    },

    footer: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 12
    }
})

const PreviewContractComponent = ({ contract }) => {
    if (!contract) return null

    return (
        <Document>

            <Page
                size="A4"
                style={styles.page}
            >

                {/* TITLE */}
                <View>
                    <Text style={styles.title}>
                        {contract.typeContract === "rent" ? "RENTAL" : "SELLING"} CONTRACT
                    </Text>
                </View>

                {/* PROPERTY */}
                <View style={styles.section}>

                    <Text style={styles.heading}>
                        Detail for contract
                    </Text>

                    <Text style={styles.text}>
                        Name of Property: {contract?.propertySnapshot?.title || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Address: {contract?.propertySnapshot?.address || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Area: {contract?.propertySnapshot?.area || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Price {contract.typeContract === "rent" ? " Rental" : " Sale"}:
                        {" "}
                        {Number(contract?.price || 0).toLocaleString("vi-VN")} VND
                    </Text>

                </View>

                {/* CUSTOMER */}
                <View style={styles.section}>

                    <Text style={styles.heading}>
                        Customer Information {contract.typeContract === "rent" ? "Tenant" : "Buyer"}
                    </Text>

                    <Text style={styles.text}>
                        Name:
                        {" "}
                        {contract.typeContract === "rent"
                            ? contract?.tenantSnapshot?.fullName
                            : contract?.buyerSnapshot?.fullName}
                    </Text>

                    <Text style={styles.text}>
                        ID Number:
                        {" "}
                        {contract.typeContract === "rent"
                            ? contract?.tenantSnapshot?.idNumber
                            : contract?.buyerSnapshot?.idNumber}
                    </Text>

                    <Text style={styles.text}>
                        Address:
                        {" "}
                        {contract.typeContract === "rent"
                            ? contract?.tenantSnapshot?.address
                            : contract?.buyerSnapshot?.address}
                    </Text>

                </View>

                {/* RENT INFO */}
                {
                    contract.typeContract === "rent" ? (

                        <View style={styles.section}>

                            <Text style={styles.heading}>
                                Information about rental contract
                            </Text>

                            <Text style={styles.text}>
                                Contract Duration:
                                {" "}
                                {
                                    contract?.rentalInfo?.startDate &&
                                    contract?.rentalInfo?.endDate
                                        ? `${dayjs(contract.rentalInfo.startDate).format("DD/MM/YYYY")} - ${dayjs(contract.rentalInfo.endDate).format("DD/MM/YYYY")}`
                                        : "N/A"
                                }
                            </Text>

                            <Text style={styles.text}>
                                Deposit:
                                {" "}
                                {
                                    contract?.rentalInfo?.deposit
                                        ? Number(contract.rentalInfo.deposit).toLocaleString("vi-VN") + " VND"
                                        : "N/A"
                                }
                            </Text>

                        </View>

                    ) : (

                        <View style={styles.section}>

                            <Text style={styles.heading}>
                                Information about sale contract
                            </Text>

                            <Text style={styles.text}>
                                Payment Date:
                                {" "}
                                {
                                    contract?.saleInfo?.paymentDate
                                        ? dayjs(contract.saleInfo.paymentDate).format("DD/MM/YYYY")
                                        : "N/A"
                                }
                            </Text>

                        </View>

                    )
                }

                {/* OWNER */}
                <View style={styles.section}>

                    <Text style={styles.heading}>
                        Information about creator of contract
                    </Text>

                    <Text style={styles.text}>
                        Name:
                        {" "}
                        {contract?.ownerSnapshot?.fullName || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        ID Number:
                        {" "}
                        {contract?.ownerSnapshot?.idNumber || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Address:
                        {" "}
                        {contract?.ownerSnapshot?.address || "N/A"}
                    </Text>

                </View>

                {/* FOOTER */}
                <View>

                    <Text style={styles.footer}>
                        This contract is made in 02 copies with equal legal value,
                        each party keeps 01 copy.
                    </Text>

                </View>

            </Page>

        </Document>
    )
}

export default PreviewContractComponent