import React, { Component } from "react";
import {
  Modal,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";

class ChooseTypeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: this.props.chosen,
      refresh: false
    };
  }

  selectItem = item => {
    if (this.state.chosen.includes(item)) {
      const index = this.state.chosen.indexOf(item);
      this.state.chosen.splice(index, 1);
    } else {
      this.state.chosen.push(item);
    }
    this.setState({ refresh: !this.state.refresh });
  };

  renderItem = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={
          this.state.chosen.includes(item)
            ? [{ backgroundColor: Colors.LIGHTGREEN }, styles.renderItem]
            : [{ backgroundColor: Colors.WHITE }, styles.renderItem]
        }
        onPress={() => this.selectItem(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      type,
      types,
      visible,
      onPress,
      screenWidth,
      setModalVisible
    } = this.props;
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
              Choose {type}
            </Text>
            <ScrollView style={{flexGrow: 1, marginBottom: 200}}>
              <FlatList
                data={types}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                extraData={this.state.refresh}
                contentContainerStyle={{ marginBottom: 20 }}
              />
              <TouchableOpacity
                disabled={this.state.chosen.length == 0}
                onPress={() => {
                  onPress(this.state.chosen);
                  setModalVisible();
                }}
                style={
                  this.state.chosen.length > 0
                    ? [styles.button, { backgroundColor: Colors.LIGHTGREEN }]
                    : [styles.button, { backgroundColor: Colors.MEDIUM_GREY }]
                }
              >
                <Text style={Typography.FONT_H3_WHITE}>Choose</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ChooseTypeModal;

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
  renderItem: {
    height: 50,
    paddingLeft: 10,
    justifyContent: "center",
    marginBottom: 1
  }
});
