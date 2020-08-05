import {Dimensions} from "react-native";

export function getBoxWidth(screenWidth) {
    return (screenWidth * 0.9 - 20) / 2;
}

export function getScreenWidth() {
    return Math.round(Dimensions.get("window").width);
}