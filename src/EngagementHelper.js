const EngagementHelper = {
    engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
      const channelDataArray = [];
  
      messageCountList.forEach((item) => {
        const channelId = item.channelId;
        const existingData = channelDataArray.find(
          (channelData) => channelData.id === channelId
        );
  
        if (existingData) {
          existingData.data.push({
            date: new Date(item.timeBucket).getTime(),
            count: parseInt(item.count)
          });
        } else {
          channelDataArray.push({
            id: channelId,
            data: [
              {
                date: new Date(item.timeBucket).getTime(),
                count: parseInt(item.count)
              }
            ]
          });
        }
      });
  
      const filteredChannels = channels.filter((channel) =>
        channelDataArray.some(
          (channelData) =>
            channelData.id === channel.id && channelData.data.length > 1
        )
      );
  
      const seriesData = filteredChannels.map((channel) => {
        const channelData = channelDataArray.find(
          (channelData) => channelData.id === channel.id
        );
  
        return {
          name: channel.name,
          data: channelData.data.map((dataPoint) => [
            dataPoint.date,
            dataPoint.count
          ])
        };
      });
  
      const options = {
        chart: {
          backgroundColor: "#f4f4f4", // Grey background
          type: "spline"
        },
        title: {
          text: "Engagement Messages Over Time"
        },
        xAxis: {
          type: "datetime",
          title: {
            text: "Date"
          },
          tickInterval: 24 * 3600 * 1000
        },
        yAxis: {
          title: {
            text: "Message Count"
          }
        },
        series: seriesData,
        plotOptions: {
          line: {
            color: "#006400" 
          }
        }
      };
  
      return options;
    }
  };
  
  export default EngagementHelper;
  