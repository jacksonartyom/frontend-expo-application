import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { styles } from '../styles/imagePickerStyles';

export default function ImagePickerSection({ image, pickImage, removeImage }) {
    return (
        <View style={styles.container}>

            {/* Upload Button */}
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadText}>
                    📷 Select Profile Image
                </Text>
            </TouchableOpacity>

            {/* Preview Card */}
            {image && (
                <View style={styles.previewCard}>

                    {/* Image */}
                    <Image
                        source={{ uri: image.uri }}
                        style={styles.imagePreview}
                    />

                    {/* Info */}
                    <View style={styles.infoBox}>
                        <Text style={styles.fileName}>
                            {image.fileName || "Selected Image"}
                        </Text>

                        <Text style={styles.subText}>
                            Tap to change image
                        </Text>
                    </View>

                    {/* ❌ Remove Button */}
                    <TouchableOpacity
                        onPress={removeImage}
                        style={styles.removeButton}
                    >
                        <Text style={styles.removeText}>✕</Text>
                    </TouchableOpacity>

                </View>
            )}

        </View>
    );
}