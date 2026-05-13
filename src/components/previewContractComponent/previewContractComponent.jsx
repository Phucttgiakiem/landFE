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
                        HỢP ĐỒNG {contract.typeContract === "rent" ? "THUÊ" : "BÁN"}
                    </Text>
                </View>

                {/* PROPERTY */}
                <View style={styles.section}>

                    <Text style={styles.heading}>
                        Thông Tin Bất Động Sản
                    </Text>

                    <Text style={styles.text}>
                        Tên BĐS: {contract?.propertySnapshot?.title || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Địa chỉ: {contract?.propertySnapshot?.address || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Diện tích: {contract?.propertySnapshot?.area || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Giá {contract.typeContract === "rent" ? "thuê" : "bán"}:
                        {" "}
                        {Number(contract?.price || 0).toLocaleString("vi-VN")} VND
                    </Text>

                </View>

                {/* CUSTOMER */}
                <View style={styles.section}>

                    <Text style={styles.heading}>
                        Thông Tin Người {contract.typeContract === "rent" ? "Thuê" : "Mua"}
                    </Text>

                    <Text style={styles.text}>
                        Tên:
                        {" "}
                        {contract.typeContract === "rent"
                            ? contract?.tenantSnapshot?.fullName
                            : contract?.buyerSnapshot?.fullName}
                    </Text>

                    <Text style={styles.text}>
                        Số CMND/CCCD:
                        {" "}
                        {contract.typeContract === "rent"
                            ? contract?.tenantSnapshot?.idNumber
                            : contract?.buyerSnapshot?.idNumber}
                    </Text>

                    <Text style={styles.text}>
                        Địa chỉ thường trú:
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
                                Thông Tin Thuê
                            </Text>

                            <Text style={styles.text}>
                                Hạn hợp đồng:
                                {" "}
                                {
                                    contract?.rentalInfo?.startDate &&
                                    contract?.rentalInfo?.endDate
                                        ? `${dayjs(contract.rentalInfo.startDate).format("DD/MM/YYYY")} - ${dayjs(contract.rentalInfo.endDate).format("DD/MM/YYYY")}`
                                        : "N/A"
                                }
                            </Text>

                            <Text style={styles.text}>
                                Tiền cọc:
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
                                Thông Tin Bán
                            </Text>

                            <Text style={styles.text}>
                                Ngày chuyển khoản:
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
                        Thông Tin Người Lập Đơn
                    </Text>

                    <Text style={styles.text}>
                        Họ tên:
                        {" "}
                        {contract?.ownerSnapshot?.fullName || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Số CMND/CCCD:
                        {" "}
                        {contract?.ownerSnapshot?.idNumber || "N/A"}
                    </Text>

                    <Text style={styles.text}>
                        Địa chỉ thường trú:
                        {" "}
                        {contract?.ownerSnapshot?.address || "N/A"}
                    </Text>

                </View>

                {/* FOOTER */}
                <View>

                    <Text style={styles.footer}>
                        Hợp đồng này được lập thành 02 bản có giá trị pháp lý như nhau,
                        mỗi bên giữ 01 bản.
                    </Text>

                </View>

            </Page>

        </Document>
    )
}

export default PreviewContractComponent