import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";

// Create styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    backgroundColor: "white",
    padding: "10px",
  },
});

// Create Document Component
const AdmitCard = ({ data, exam }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ border: "1px solid grey", height: "300px" }}>
          <View
            style={{
              height: "50px",
              textAlign: "center",
              borderBottom: "1px solid grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                {exam[0].title}
              </Text>
              <Text style={{ fontSize: "16px" }}>
                Exam Date:{moment(exam[0].date).format("DD/MM/YY")}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: "200px",
              display: "flex",
              flexDirection: "row",
              padding: "20px",
            }}
          >
            <View style={{ flex: 7 }}>
              <Text style={{ marginTop: "10px" }}>Name: {data.name}</Text>
              <Text style={{ marginTop: "10px" }}>
                DOB: {moment(data.dob).format("DD/MM/YY")}
              </Text>
              <Text style={{ marginTop: "10px" }}>
                Registration No.: {data.reg}
              </Text>
            </View>

            <View style={{ flex: 3 }}>
              <Image style={{ height: "200px" }} src={data.avatar} />
            </View>
          </View>
          <View
            style={{
              height: "50px",
              padding: "10px",
              borderTop: "1px solid grey",
            }}
          >
            <Text>Signature</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AdmitCard;
