import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Typography from "../styles/typography";
import PickerSelect from "react-native-picker-select";
import * as Colors from "../styles/colors";

class AddIngredientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      measure: ""
    };
  }

  validateAddIngredient = () => {
    if (this.state.name && this.state.quantity && this.state.measure) {
      return true;
    }
    return false;
  };

  render() {
    const {
      visible,
      screenWidth,
      setModalVisible,
      onAddIngredient
    } = this.props;
    const pickerStyle = {
      inputIOS: {
        color: Colors.BLACK
      },
      inputAndroid: {
        color: Colors.BLACK
      }
    };
    return (
      <Modal animationType="slide" transparent={false} visible={visible}>
        <View style={[styles.container, { marginTop: 50 }]}>
          <View style={{ width: screenWidth * 0.9, marginBottom: 40 }}>
            <TouchableOpacity
              onPress={setModalVisible}
              style={styles.goBackButton}
            >
              <Icon name={"keyboard-arrow-left"} size={40} />
            </TouchableOpacity>
          </View>
          <View style={{ width: screenWidth * 0.9 }}>
            <Text style={[Typography.FONT_H2_BLACK, { marginBottom: 20 }]}>
              Add Ingredient
            </Text>
            <TextInput
              placeholder="Ingredient name"
              onChangeText={name => this.setState({ name })}
              style={[Typography.FONT_INPUT, styles.inputText, styles.inputBox]}
              value={this.state.name}
              placeholderTextColor={Colors.MEDIUM_GREY}
            />
            <TextInput
              placeholder="Quantity"
              onChangeText={quantity => this.setState({ quantity })}
              style={[Typography.FONT_INPUT, styles.inputBox]}
              value={this.state.quantity}
              keyboardType={"numeric"}
              placeholderTextColor={Colors.MEDIUM_GREY}
            />
            <View style={styles.inputBox}>
              <PickerSelect
                style={pickerStyle}
                onValueChange={measure => this.setState({ measure })}
                items={[
                  { label: "Tablespoon", value: "Tablespoon" },
                  { label: "Teaspoon", value: "Teaspoon" },
                  { label: "Liter", value: "Liter" },
                  { label: "Desiliter", value: "Desiliter" },
                  { label: "Milliliter", value: "Milliliter" },
                  { label: "Gram", value: "Gram" },
                  { label: "Kilogram", value: "Kilogram" },
                  { label: "Units", value: "Units" }
                ]}
                placeholder={{ label: "Measure", value: null }}
                placeholderTextColor={Colors.MEDIUM_GREY}
              />
            </View>
            <TouchableOpacity
              disabled={!this.validateAddIngredient()}
              onPress={() => {
                onAddIngredient({
                  name: this.state.name,
                  quantity: this.state.quantity,
                  measure: this.state.measure
                });
                setModalVisible();
                this.setState({
                  name: "",
                  quantity: "",
                  measure: ""
                });
              }}
              style={
                this.validateAddIngredient()
                  ? [styles.button, { backgroundColor: Colors.LIGHTGREEN }]
                  : [styles.button, { backgroundColor: Colors.MEDIUM_GREY }]
              }
            >
              <Text style={Typography.FONT_H3_WHITE}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AddIngredientModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexGrow: 1,
    marginBottom: 20
  },
  button: {
    width: 120,
    height: 30,
    backgroundColor: Colors.MEDIUM_GREY,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 20
  },
  goBackButton: {
    position: "absolute",
    marginTop: -10,
    marginLeft: -5
  },
  inputBox: {
    width: "100%",
    height: 40,
    backgroundColor: Colors.LIGHTGREY,
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 5,
    justifyContent: "center",
    paddingLeft: 10
  }
});
