import React, { Component } from "react";
import { StyleSheet, Text, View, WebView } from "react-native";

class QuickPayHeaders {
  constructor(authorization, acceptVersion = "v10") {
    this.authorization = authorization;
    this.acceptVersion = acceptVersion;
  }
}

class CreatePaymentRequest {
  constructor(headers, parameters) {
    this.headers = headers;
    this.parameters = parameters;
    this.url = "https://api.quickpay.net/payments";
  }

  executeRequest() {
    const headers = new Headers({
      "Content-Type": "application/json charset=utf-8",
      "Accept-Version": this.headers.acceptVersion,
      Authorization: encodeAuthorization(this.headers.authorization)
    });

    const body = {
      curreny: this.parameters.curreny,
      order_id: this.parameters.orderId,
      text_on_statement: this.parameters.textOnStatement,
      variables: this.parameters.variables,
      branding_id: this.parameters.branding_id
    };

    if (this.parameters.shipping) {
      body.shipping = this.parameters.shipping;
    }

    if (this.parameters.invoiceAddress) {
      body.invoice_address = this.parameters.invoiceAddress;
    }

    if (this.parameters.shippingAddress) {
      body.invoice_address = this.parameters.shippingAddress;
    }

    return fetch(this.url, {
      method: "POST",
      headers: headers,
      body: body
    });
  }

  encodeAuthorization(password) {
    const credentials = `${username}:${password}`;
    return `Basic ${btoa(credentials)}`;
  }
}

class Quickpay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPayment: true
    };
  }

  render() {
    return (
      <View>
        <Text>This is a quickpay view</Text>

        <WebView
          source={{ uri: "https://github.com/facebook/react-native" }}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

class Address {
  // name: string;
  // att: string;
  // street: string;
  // houseNumber: string;
  // houseExtension: string;
  // city: string;
  // zipCode: string;
  // region: string;
  // countryCode: string;
  // vatNo: string;
  // phoneNumber: string;
  // mobileNumber: string;
  // email: string;

  constructor(
    name,
    att,
    street,
    houseNumber,
    houseExtension,
    city,
    zipCode,
    region,
    countryCode,
    vatNo,
    phoneNumber,
    mobileNumber,
    email
  ) {
    this.name = name;
    this.att = att;
    this.street = street;
    this.houseNumber = houseNumber;
    this.houseExtension = houseExtension;
    this.city = city;
    this.zipCode = zipCode;
    this.region = region;
    this.countryCode = countryCode;
    this.vatNo = vatNo;
    this.phoneNumber = phoneNumber;
    this.mobileNumber = mobileNumber;
    this.email = email;
  }
}

class Shipping {
  //method: string;
  //company: string;
  //amount: number;
  //vatRate: number;
  //trackingNumber: string;
  //trackingUrl: string;

  setMethod(method) {
    this.method = method;
    return this;
  }

  setCompany(company) {
    this.company = company;
    return this;
  }
}

class Basket {}

class CreatePaymentParameters {
  //curreny: string;
  //orderId: string;
  //brandingId: number;
  //textOnStatement: string;
  //variables: Array<string>;
  //shipping: Shipping;
  //basket: Array<Basket>;
  //shippingAddress: Address;
  //invoiceAddress: Address;

  setOrderId(orderId) {
    this.orderId = orderId;
    return this;
  }

  setCurreny(curreny) {
    this.curreny = curreny;
    return this;
  }

  setShipping(shipping) {
    this.shipping = shipping;
    return this;
  }
}

const QuickPayDefaults = {
  SUCCESS_RESULT: "Success",
  CANCEL_RESULT: "Cancel",
  urlPropertyName: "quickpayLink",
  DEFAULT_VERSION: "v10"
};

const ShippingMethod = {
  STORE_PICK_UP: "store_pick_up",
  HOME_DELIVERY: "home_delivery",
  REGISTERED_BOX: "registered_box",
  UNREGISTERED_BOX: "unregistered_box",
  PICK_UP_POINT: "pick_up_point",
  OWN_DELIVERY: "own_delivery"
};

export {
  QuickPayHeaders,
  CreatePaymentParameters,
  CreatePaymentRequest,
  QuickPayDefaults,
  Shipping,
  ShippingMethod,
  Quickpay
};
