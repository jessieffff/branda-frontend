//Author: Jiefang Li
import {React} from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import App from "../App";

const AppInfo = require("../app.json").expo;

export default function About(){
  return(
    <View>
      <Text>About this app.</Text>
      <DataTable>
        <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title>Value</DataTable.Title>
        </DataTable.Header>
    <DataTable.Row>
        <DataTable.Cell>Name</DataTable.Cell>
        <DataTable.Cell>{AppInfo.name}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
        <DataTable.Cell>Splash Location</DataTable.Cell>
        <DataTable.Cell>{AppInfo.splash.image}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
        <DataTable.Cell>Version</DataTable.Cell>
        <DataTable.Cell>{AppInfo.version}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
        <DataTable.Cell>Orientation</DataTable.Cell>
        <DataTable.Cell>{AppInfo.orientation}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
        <DataTable.Cell>Android</DataTable.Cell>
        <DataTable.Cell>{JSON.stringify(AppInfo.android)}</DataTable.Cell>
    </DataTable.Row>
    </DataTable>

    <Button title = "Click here to copy app info" onPress={copyToClipboard}>
        Click here to copy app info
    </Button>
    </View>
  );
}

const copyToClipboard = () => {
    Clipboard.setString(JSON.stringify(AppInfo, undefined, 2));
  };


