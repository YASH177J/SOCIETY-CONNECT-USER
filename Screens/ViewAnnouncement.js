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
export default class ViewAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementTitle:
        this.props.navigation.getParam('announcement')['announcementTitle'],
      announcementDescription:
        this.props.navigation.getParam('announcement')[
          'announcementDescription'
        ],
      docId: this.props.navigation.getParam('announcement')['doc_id'],
      userId: firebase.auth().currentUser.email,
    };
  }

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#FFDD1Cbf' }}>
        <Header
          centerComponent={{
            text: 'Announcement Details',
            style: {
              fontWeight: 'bold',
              fontSize: 17,
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
          <Text style={{ margin: 10 }}>
            Title : {this.state.announcementTitle}
          </Text>
          <Text style={{ margin: 10 }}>
            Additional Information: {this.state.announcementDescription}
          </Text>

      
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({

});
