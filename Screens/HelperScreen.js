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
  Platform,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import call from 'react-native-phone-call';
import db from '../config';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem } from 'react-native-elements';

export default class HelperScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allHelpers: [],
    };
  }
  getAllHelpers() {
    db.collection('helpers').onSnapshot((snapshot) => {
      var allHelpers = [];
      snapshot.docs.map((doc) => {
        var helper = doc.data();
        helper['doc_id'] = doc.id;
        allHelpers.push(helper);
      });
      this.setState({
        allHelpers: allHelpers,
      })
    });
  }
  renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        paddingLeft: 10,
        width: '100%',
      }}>
      <View
        style={{
          flex: 0.8,
          flexDirection: 'column',
          paddingLeft: 10,
          width: '100%',
        }}>
        <Text
          style={[styles.input, { fontWeight: 'bold' }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.helperName}
        </Text>
        <Text
          style={[styles.input, { fontSize: 14 }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.helperDesignation}
        </Text>
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: 'column',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            // Check for perfect 10 digit length
            if (item.helperContact.length != 10) {
              alert('Incorrect contact number');
              return;
            }

            const args = {
              number: item.helperContact,
              prompt: true,
            };
            // Make a call
            call(args).catch(console.error);
     
          }}>
          <Ionicons name="call" size={30} color="Blue"></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );

  componentDidMount() {
    this.getAllHelpers();
  }
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          centerComponent={{
            text: 'Helper Screen',
            style: {
              fontWeight: 'bold',
              fontSize: 19,
              color: 'white',
            },
          }}
          backgroundColor={'#FFDD1C'}
        />
         <FlatList
            data={this.state.allHelpers}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({

  input: {
    width: '60%',
    fontSize: 16,
    padding: 5,
  },
  
});
