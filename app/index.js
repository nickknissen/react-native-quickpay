import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";

import {
  QuickPayDefaults,
  QuickPayHeaders,
  CreatePaymentParameters,
  Shipping,
  ShippingMethod,
  Quickpay,
  CreatePaymentRequest
} from "./Quickpay";

const merchantToken =
  "99357254255b6cc17e9474e8d24c9e550a8504760ab3df537a5a09192e97b63e";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createPaymentResultId: null,
      transactionIdInput: null,
      orderId: ""
    };
  }
  requestToCreatePaymentWith() {
    const orderId = this.state.orderId;
    const headers = new QuickPayHeaders(
      merchantToken,
      QuickPayDefaults.DEFAULT_VERSION
    );

    const sh = new Shipping()
      .setMethod(ShippingMethod.STORE_PICK_UP)
      .setCompany("YourComapny AS");

    const params = new CreatePaymentParameters()
      .setOrderId(orderId)
      .setCurreny("DKK")
      .setShipping(sh);

    const req = new CreatePaymentRequest(headers, params)
      .executeRequest()
      .then(paymentResponse => {
        this.setState({
          createPaymentResultId: paymentResponse.id,
          transactionIdInput: paymentResponse.id
        });

        Alert.alert("Shipping method", `${paymentResponse.shipping.method}`);
      })
      .catch();
  }

  requestToGenerateLinkWith() {
    const params = new GeneratePaymentLinkParameters()
        .setId(this.createPaymentResultId)
        .setAmount(100);

        const headers = new QuickPayHeaders(
          merchantToken,
          QuickPayDefaults.DEFAULT_VERSION
        )

        const req = new GeneratePaymentLinkRequest(headers, params);

      .then(paymentResponse => {
        this.setState({
          createPaymentResultId: paymentResponse.id,
          transactionIdInput: paymentResponse.id
        });

        Alert.alert("Shipping method", `${paymentResponse.shipping.method}`);
      })

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Payment</Text>
        <View style={styles.group}>
          <Text>Order Id</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="123456"
              onChangeText={orderId => this.setState({ orderId })}
            />
            <Button
              style={styles.button}
              title="Create"
              onPress={() => this.requestToCreatePaymentWith()}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.input}>Created paymentID</Text>
            <Text>{this.state.createPaymentResultId}</Text>
          </View>
        </View>
        <View style={styles.group}>
          <Text>Transaction ID</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="123456"
              onChangeText={orderId => this.setState({ orderId })}
            />
            <Button
              style={styles.button}
              title="Pay"
              onPress={() => this.requestToGenerateLinkWith()}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.input}>Created paymentID</Text>
            <Text>{this.state.createPaymentResultId}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20,
    justifyContent: "flex-start"
  },
  group: {
    marginBottom: 50
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    flex: 1,
    marginRight: 20
  },
  title: {
    fontSize: 20,
    color: "black",
    marginBottom: 20
  },
  button: {
    fontSize: 23,
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});
