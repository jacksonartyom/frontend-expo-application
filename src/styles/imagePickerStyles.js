import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 5,
    },

    uploadButton: {
        backgroundColor: "#4F46E5",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: "center",
    },

    uploadText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

    previewCard: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        padding: 12,
        borderRadius: 12,
    },

    imagePreview: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 12,
    },

    infoBox: {
        flex: 1,
    },

    fileName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },

    subText: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },
    removeButton: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#EF4444",
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },

    removeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
});