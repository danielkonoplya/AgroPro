import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions
} from "react-native";

import MapView from "react-native-maps";


const Images = [
  { uri: "https://i.imgur.com/ag1okRo.png" },
  { uri: "https://i.imgur.com/z5UfrP7.png" },
  { uri: "https://i.imgur.com/duNPc9N.png" },
  { uri: "https://i.imgur.com/Bb3QHrB.png" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class VehiclesScreen extends Component {
  static navigationOptions = {
    header: null
}
  state = {
    markers: [
      {
        coordinate: {
          latitude: 55.850126, 
          longitude: 37.329165,
        },
        title: "Беларус-82.1",
        description: "Приступил к работе",
        image: Images[0],
      },
      {
        coordinate: {
          latitude: 55.849806, 
          longitude: 37.327646,
        },
        title: "Камаз 45141",
        description: "Следование за погрузчиком",
        image: Images[1],
      },
      {
        coordinate: {
          latitude: 55.849754, 
          longitude: 37.321969
        },
        title: "Merlo 80.9",
        description: "Погрузка сена ",
        image: Images[2],
      },
      {
        coordinate: {
          latitude: 55.848650, 
          longitude: 37.325385
        },
        title: "Беларус 82-2",
        description: "Следует в гараж",
        image: Images[3],
      },
    ],
    region: {
      latitude: 55.849973, 
      longitude: 37.325312,
      latitudeDelta: 0.01864195044303443,
      longitudeDelta: 0.010142817690068,
    },
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); 
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 5,
    elevation: 10,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});


