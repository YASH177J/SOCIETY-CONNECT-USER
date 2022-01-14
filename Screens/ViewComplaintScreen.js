import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import db from '../config';

import { ListItem } from 'react-native-elements';
export default class ViewComplaints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintTitle:
        this.props.navigation.getParam('complaints')['complaintTitle'],
      complaintDescription:
        this.props.navigation.getParam('complaints')['complaintDescription'],
      complaintReply:
        this.props.navigation.getParam('complaints')['complaintReply'],
      name: this.props.navigation.getParam('complaints')['name'],
      contact: this.props.navigation.getParam('complaints')['contact'],
      docId: this.props.navigation.getParam('complaints')['doc_id'],
      userId: firebase.auth().currentUser.email,
    };
  }
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#FFDD1Cbf' }}>
        <Header
          centerComponent={{
            text: 'Complaint Details',
            style: {
              fontWeight: 'bold',
              fontSize: 19,
              color: 'white',
            },
          }}
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="white"
              size={24}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          backgroundColor={'#FFDD1C'}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            margin: 20,
            backgroundColor: '#fff',
            borderRadius: 20,
          }}>
          <Text style={{ margin: 10 }}>Member Name : {this.state.name}</Text>
          <Text style={{ margin: 10 }}>
            Member contact: {this.state.contact}
          </Text>
          <Text style={{ margin: 10 }}>
            Complaint Title: {this.state.complaintTitle}
          </Text>
          <Text style={{ margin: 10, color: 'black' }}>
            Complaint Description: {this.state.complaintDescription}
          </Text>
          <Text style={{ color: 'black', margin: 10 }}>
            Complaint Reply: {this.state.complaintReply}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#2A299A',
              width: '60%',
              alignSelf: 'center',
              borderRadius: 10,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              db.collection('complaints').doc(this.state.docId).delete();
              this.props.navigation.goBack();
            }}>
            <Text style={{ color: 'white' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

