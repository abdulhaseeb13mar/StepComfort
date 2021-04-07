import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './ScFrequentUsage/ScRefNavigation';
import ScHome from './ScMainScreens/ScHome';
import ScSP from './ScMainScreens/ScSP';
// import ScCart from './ScMainScreens/ScCart';
import ScFav from './ScMainScreens/ScFav';
import ScContact from './ScMainScreens/ScContact';
// import ScConfirmOrder from './ScSrc/ScConfirmOrder';
import ScSearch from './ScMainScreens/ScSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="ScHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="ScHome" component={ScHome} />
        <Stack.Screen name="ScSP" component={ScSP} />
        <Stack.Screen name="ScFav" component={ScFav} />
        {/* <Stack.Screen name="ScCart" component={ScCart} /> */}
        <Stack.Screen name="ScContact" component={ScContact} />
        {/* <Stack.Screen name="ScConfirmOrder" component={ScConfirmOrder} /> */}
        <Stack.Screen name="ScSearch" component={ScSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
