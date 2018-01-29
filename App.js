
import React, { Component } from 'react';
import { Text, Image, StyleSheet, ListView, ScrollView, View, TextInput, TouchableHighlight } from 'react-native';

import MapView from 'react-native-maps';
import haversine from 'haversine'; // for distance calculation
 
import RunInfoNumeric from './components/run-info-numeric';

const styles = StyleSheet.create({
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

let id = 0;

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = { markers: [], watchId };

    let watchId = navigator.geolocation.watchPosition((position) => {
      // Distance Info
      let distance = 0;

      if (this.state.previousCoordinate) {
          distance = this.state.distance + haversine(this.state.previousCoordinate, position.coords);

          this.distanceInfo.setState({ value: distance });
      }
      
      // Speed
      this.speedInfo.setState({ value: position.coords.speed });

      // Direction Info
      let x = position.coords.heading;
      if ((x > 0 && x <=23 ) || (x > 338 && x<=360)) {
        this.directionInfo.setState({ value: 'N' });
      } else if ((x > 23 && x <= 65 )) {
        this.directionInfo.setState({ value: 'NE' });
      }  else if ((x > 65 && x <= 110 )) {
        this.directionInfo.setState({ value: 'E' });
      }  else if ((x > 110 && x <= 155 )) {
        this.directionInfo.setState({ value: 'SE' });
      }  else if ((x > 155 && x <= 203 )) {
        this.directionInfo.setState({ value: 'S' });
      }  else if ((x > 203 && x <= 248 )) {
        this.directionInfo.setState({ value: 'SW' });
      }  else if ((x > 248 && x <= 293 )) {
        this.directionInfo.setState({ value: 'W' });
      }  else if ((x > 293 && x <= 338 )) {
        this.directionInfo.setState({ value: 'NW' });
      }  




      this.setState({
        markers: [
          ...this.state.markers, {
            cordinate: position.coords,
            key: id++
          }
        ],
        previousCoordinate: position.coords,
        distance
      }, null, { distanceFilter:10 });
    });
    

    // Data Source for listview
    // let ds = new ListView.DataSource({ rowHasChanged: () => a !== b });

    // this.state = { dataSource: ds.cloneWithRows([
    //   'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
    //   'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
    //   'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
    //   'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
    // ]) };


    setInterval(() => {
      this.distanceInfo.setState({ value: Math.random() * 100 });
      this.speedInfo.setState({ value: Math.random() * 15 });
      this.directionInfo.setState({
        value: this.directionInfo.state === 'N' ? 'NW' : 'N'
      });
    }, 1000);
    

    
  }

  addMarker(region) {
    let now = (new Date).getTime();

    if (this.state.lastAddedMarker > now - 5000) {
      return;
    }

    this.setState({
      markers: [
        ...this.state.markers, {
          cordinate: region,
          key: id++
        }
      ],
      lastAddedMarker: now
    });
  }

  render() {
    return (
        // List View
      // <ListView // <Text style={{flex: 1, backgroundColor: 'red', fontSize: 18}}>{this.state.confirmedText}</Text>
      //   dataSource={this.state.dataSource}
      //   renderSeparator={() => <View style={{backgroundColor: '#ccc', height:1}} />}
      //   renderRow={(row) => (
      //     <View style={{flexDirection: 'row'}}>
      //       <Image source={{uri: 'https://www.novoda.com/blog/content/images/2016/06/reactive-nativingitup-png-800x600_q96.png'}} style={{width: 50, height: 50, margin: 10}} />
      //       <Text style={{fontSize: 25, padding:10}}>{row}</Text>
      //     </View>
      //   )}
      // />

        // Image Slideshow
      // <ScrollView horizontal={true} pagingEnabled={true}>
      //   <Image source={{uri: 'https://www.novoda.com/blog/content/images/2016/06/reactive-nativingitup-png-800x600_q96.png'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://www.novoda.com/blog/content/images/2016/06/reactive-nativingitup-png-800x600_q96.png'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://www.novoda.com/blog/content/images/2016/06/reactive-nativingitup-png-800x600_q96.png'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://www.novoda.com/blog/content/images/2016/06/reactive-nativingitup-png-800x600_q96.png'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://www.novoda.com/blog/content/images/2016/06/reactive-nativingitup-png-800x600_q96.png'}} style={{width: 320, height: 213, margin: 25}} />
      //   <Image source={{uri: 'https://www.novoda.com/blog/content/images/2016/06/reactive-nativingitup-png-800x600_q96.png'}} style={{width: 320, height: 213, margin: 25}} />
      // </ScrollView>


        // Scroll View
      // <ScrollView>
      //   <Text style={{padding: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sapien at ipsum efficitur malesuada nec sed felis. Nunc libero dolor, ullamcorper a aliquam non, maximus quis mi. Nulla facilisi. Sed eleifend lorem quam, at euismod quam elementum in.</Text>
      //   <Text style={{padding: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sapien at ipsum efficitur malesuada nec sed felis. Nunc libero dolor, ullamcorper a aliquam non, maximus quis mi. Nulla facilisi. Sed eleifend lorem quam, at euismod quam elementum in.</Text>
      //   <Text style={{padding: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sapien at ipsum efficitur malesuada nec sed felis. Nunc libero dolor, ullamcorper a aliquam non, maximus quis mi. Nulla facilisi. Sed eleifend lorem quam, at euismod quam elementum in.</Text>
      //   <Text style={{padding: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sapien at ipsum efficitur malesuada nec sed felis. Nunc libero dolor, ullamcorper a aliquam non, maximus quis mi. Nulla facilisi. Sed eleifend lorem quam, at euismod quam elementum in.</Text>
      //   <Text style={{padding: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sapien at ipsum efficitur malesuada nec sed felis. Nunc libero dolor, ullamcorper a aliquam non, maximus quis mi. Nulla facilisi. Sed eleifend lorem quam, at euismod quam elementum in.</Text>
      //   <Text style={{padding: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sapien at ipsum efficitur malesuada nec sed felis. Nunc libero dolor, ullamcorper a aliquam non, maximus quis mi. Nulla facilisi. Sed eleifend lorem quam, at euismod quam elementum in.</Text>
      //   <Text style={{padding: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sapien at ipsum efficitur malesuada nec sed felis. Nunc libero dolor, ullamcorper a aliquam non, maximus quis mi. Nulla facilisi. Sed eleifend lorem quam, at euismod quam elementum in.</Text>
      //   <Text style={{padding: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sapien at ipsum efficitur malesuada nec sed felis. Nunc libero dolor, ullamcorper a aliquam non, maximus quis mi. Nulla facilisi. Sed eleifend lorem quam, at euismod quam elementum in.</Text>
      // </ScrollView>


      <View style={{flex: 1}}>
      
      {/* Event Handler Example */}
        {/* <TextInput 
          style={styles.textInput}
          autoCapitalize="words"
          placeholder="Type Something..."
          onChangeText={(text) => this.setState({ text })}
          onBlur={() => this.setState({ text: this.state.text.toUpperCase() })}
        />
        <TouchableHighlight
          onPress={() => this.setState({ confirmedText: this.state.text })}
          onLongPress={() => this.setState({ confirmedText: this.state.text.toLowerCase() })}
        >
          <Text style={{fontSize: 16, color: '#EEE', textAlign: 'center'}} >Press Me!</Text>
        </TouchableHighlight>
        <Text style={{flex: 1, backgroundColor: 'red', fontSize: 18}}>{this.state.confirmedText}</Text>  */}

          {/* Map */}
          <MapView style={styles.map}
            showsUserLocation
            followsUserLocation
            initialRegion={{
              latitude: 37.33307,
              longitude: -122.0324,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02
            }}
            onRegionChange={(region) => this.addMarker(region)}
          >
          <MapView.Polyline
            coordinates={this.state.markers.map((marker) => marker.cordinate)}
            strokeWidth={5} />
            {this.state.markers.map((marker) => (
              <MapView.Marker coordinate={marker.cordinate} key={marker.key} />
            ))}
          </MapView>
          
          <View style={styles.infoWrapper}>
            <RunInfoNumeric 
              title="Distance" 
              unit="km"
              ref={(info) => { this.distanceInfo = info; }} 
            />
            <RunInfoNumeric 
              title="Speed"
              unit="km/hr" 
              ref={(info) => { this.speedInfo = info; }}
            />
            <RunInfoNumeric 
              title="Direction" 
              value="NE"
              ref={(info) => { this.directionInfo = info; }} 
            />
          </View>
      </View>
      
    );
  }
}
