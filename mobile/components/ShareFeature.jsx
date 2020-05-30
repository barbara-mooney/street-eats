import React from 'react';
import { Share, View, Button } from 'react-native';

export default ShareFeature = (props) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `I just found ${props.businessName}, this amazing food truck on StreatEatz, click here to download the app.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 0, paddingLeft: 10}}>
      <Button onPress={onShare} title="Share This Truck!" />
    </View>
  );
};