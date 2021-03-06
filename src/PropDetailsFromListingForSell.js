import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Container,
  AppBar,
  CssBaseline,
  Typography,
  createMuiTheme,
  TextField,
  withStyles,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl
} from '@material-ui/core';
import Slideshow from "./components/Slideshow";
import { numDifferentiation, dateFormat } from "./util/methods";
import axios from "axios";
import { SERVER_URL } from "./util/constant";




const PropDetailsFromListingForSell = props => {
  const { agentId, propId, propType } = props;
  const [item, setItem] = useState(null)
  // console.log("item:  ", props.agentId);


  useEffect(() => {
    getPropertyDetailsByIdToShare();
  }, [agentId, propId, propType]);

  const getPropertyDetailsByIdToShare = () => {
    const user = {
      agent_id: agentId,
      property_id: propId,
      property_type: propType
    };
    console.log(JSON.stringify(user));
    axios(SERVER_URL + "/getPropertyDetailsByIdToShare", {
      method: "POST",
      // headers: {
      //   "Content-type": "Application/json",
      //   Accept: "Application/json"
      // },
      data: user
    }).then(
      response => {
        console.log(response.data);
        setItem(response.data)
        // setData(response.data);
        // props.setResidentialCustomerList(response.data);
      },
      error => {
        // console.log(error);
      }
    );
  }

  return (
    item ? <Container maxWidth="xs">
      <ScrollView style={[styles.container]}>
        <View style={[styles.headerContainer]}>
          <Text style={[styles.title]}>
            Sell in {item.property_address.building_name},{" "}
            {item.property_address.landmark_or_street}
          </Text>
          <Text style={[StyleSheet.subTitle]}>
            {item.property_address.formatted_address}
          </Text>
        </View>
        {/* <Image
        source={require("../../assets/images/p1.jpg")}
        resizeMode={"stretch"}
        resizeMethod={"resize"}
        style={{ width: "100%", height: 200 }}
      /> */}
        <Slideshow
          dataSource={item.image_urls}
        />
        <View style={[styles.detailsContainer]}>
          <View style={[styles.details]}>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue, { marginTop: 7 }]}>
                {item.property_details.bhk_type}
              </Text>
              {/* <Text style={[styles.subDetailsTitle]}>BHK</Text> */}
            </View>
            <View style={styles.verticalLine}></View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {numDifferentiation(item.sell_details.expected_sell_price)}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Price</Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {item.property_details.property_size}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Buildup</Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {item.property_details.furnishing_status}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Furnishing</Text>
            </View>
            {/* <View style={styles.verticalLine}></View> */}
            {/* <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {item.property_details.property_size}sqft
            </Text>
            <Text style={[styles.subDetailsTitle]}>Buildup</Text>
          </View> */}
          </View>
        </View>

        <View style={styles.margin1}></View>
        {/* property details */}
        <View style={styles.overviewContainer}>
          <View style={styles.overview}>
            <Text>Details</Text>
            <View style={styles.horizontalLine}></View>
          </View>
          <View style={styles.overviewColumnWrapper}>
            <View style={styles.overviewLeftColumn}>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.washroom_numbers}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Bathroom</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {dateFormat(item.sell_details.available_from)}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Possession</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {numDifferentiation(item.sell_details.maintenance_charge)}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Maintenance charge</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.lift}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Lift</Text>
              </View>
            </View>
            <View style={styles.overviewRightColumn}>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.parking_number}{" "}
                  {item.property_details.parking_type}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Parking</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.floor_number}/
                  {item.property_details.total_floor}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Floor</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.sell_details.negotiable}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Negotiable</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.property_age} years
                </Text>
                <Text style={[styles.subDetailsTitle]}>Age of Building</Text>
              </View>
            </View>
          </View>
        </View>
        {/* owner details */}
        <View style={styles.margin1}></View>
        <View style={styles.overviewContainer}>
          <View style={styles.overview}>
            <Text>Owner</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.ownerDetails}>
              <Text>{item.owner_details.name}</Text>
              <Text>{item.owner_details.address}</Text>
              <Text>+91 {item.owner_details.mobile1}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

    </Container> : <View>
      <Text>
        NO REsuLT
      </Text>
    </View>);
};

const styles = StyleSheet.create({
  container: {},
  card: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "#ffffff"
  },
  cardImage: {
    alignSelf: "stretch",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "stretch"
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "#d1d1d1"
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255 ,255 ,255 , 0.87)"
  },
  detailsContainer: {
    // borderBottomWidth: 1,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#C0C0C0",
    backgroundColor: "rgba(220,220,220, 0.80)"
  },

  details: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subDetails: {
    paddingBottom: 20
  },
  subDetailsTitle: {
    fontSize: 12,
    fontWeight: "400"
  },
  subDetailsValue: {
    fontSize: 14,
    fontWeight: "600"
  },
  verticalLine: {
    height: "70%",
    width: 1,
    backgroundColor: "#909090"
  },

  horizontalLine: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10
  },
  overviewContainer: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "white"
  },
  overview: {
    padding: 10
  },
  overviewSubDetailsRow: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15
  },

  overviewColumnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  overviewLeftColumn: {
    flexDirection: "column",
    justifyContent: "center"
  },
  overviewRightColumn: {
    flexDirection: "column",
    justifyContent: "center"
  },
  margin1: {
    marginTop: 2
    // paddingTop: 5
  },
  ownerDetails: {
    paddingTop: 10,
    paddingBottom: 10
  }
});



export default PropDetailsFromListingForSell;
