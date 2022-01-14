import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { ListItem, Avatar, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
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
import { LinearGradient } from 'expo-linear-gradient';
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      announcements: [],
    };
  }

  getAnnouncements = () => {
    db.collection('announcements').onSnapshot((snapshot) => {
      var announcements = [];
      snapshot.docs.map((doc) => {
        var announcement = doc.data();
        announcements.push(announcement);
      });
      this.setState({
        announcements: announcements,
      });
    });
  };

  componentDidMount() {
    this.getAnnouncements();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        this.props.navigation.navigate('ViewAnnouncement', {
          announcement: item,
        });
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
        }}>
        <Text
          style={[styles.input, { fontWeight: 'bold' }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.announcementTitle}
        </Text>
        <Text
          style={[styles.input, { fontWeight: 'bold' }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.announcementDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Welcome',
              style: {
                margin: 2,
                padding: 2,
                fontWeight: 'bold',
                fontSize: 19,
                color: '#fff',
              },
            }}
            backgroundColor={'#FFDD1C'}
          />
          <Text style={[styles.input,{alignSelf:"center"}]}>Society Announcements</Text>
          <FlatList
            data={this.state.announcements}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
    borderRadius: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: '#2A299A',
  },
  input: {
    width: '85%',
    fontSize: 16,
    padding: 5,
  },
});
