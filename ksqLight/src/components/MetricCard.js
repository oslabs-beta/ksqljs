import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { Typography, CardContent, IconButton } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ErrorIcon from '@mui/icons-material/Error';
import BugReportIcon from '@mui/icons-material/BugReport';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache(),
});

export const MetricCard = ({ type, index }) => {
  const [data, setData] = useState(null);

  const metricType = ["Liveness Indicator", "Error Rate", "Error Queries", "Bytes Consumed"];
  const iconColor = ["rgb(6, 27, 100)", "rgb(4, 41, 122)", "rgb(122, 79, 1)", "rgb(122, 12, 46)"];
  const bgColor = ["rgb(209, 233, 252)", "rgb(208, 242, 255)", "rgb(255, 247, 205)", "rgb(255, 231, 217)"];
  const textColor = ["#061B64", "#04297A", "#7A4F01", "#7A0C2E"];
  const bgImage = [`linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)`,
    `linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)`,
    `linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)`,
    `linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)`];
  

  const flipCard = () => {
    // supposed to flip liveness card here
  }

  useEffect(() => {
    client.query({
      query: gql`
      query testQuery {
        ${type}(prometheusURL: "http://localhost:9090/")
      }
  `
    })
      .then(res => setData(res.data[type]))
      .catch(error => console.log(error));
  }, []);



  return (
    <CardContent
      sx={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor: bgColor[index], boxShadow: 0, borderRadius: '16px' }}>
      <IconButton
        size="small"
        style={{ width: "2.9rem", height: "2.9rem", backgroundImage: bgImage[index] }}
        sx={{ color: iconColor[index], borderRadius: '50%' }}
        onClick={() => console.log('')} // placeholder for flipping card
      >
        {index === 0 && <MonitorHeartIcon />}
        {index === 1 && <ErrorIcon />}
        {index === 2 && <BugReportIcon />}
        {index === 3 && <DataThresholdingIcon />}
      </IconButton>

      <Typography variant='h3' sx={{ textAlign: 'center', pt: '1.2rem', fontWeight: 700, lineHeight: 1.5, fontSize: '1.8rem', fontFamily: 'Public Sans', color: textColor[index] }}>
        {index === 0 && (data ? 'Running' : 'Down')}
        {index === 1 && (data !== null ? data : 'N/A')}
        {index === 2 && (data !== null ? data : 'N/A')}
        {index === 3 && (data !== null ? data : 'N/A')}
      </Typography>

      <Typography variant='h6' sx={{ fontWeight: 600, lineHeight: 1.5, fontSize: '0.96rem', fontFamily: 'Public Sans', opacity: 0.72, color: textColor[index] }}>
        {metricType[index]}</Typography>

    </CardContent >

  )
}