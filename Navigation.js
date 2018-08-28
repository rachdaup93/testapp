import { createBottomTabNavigator } from 'react-navigation';
import CameraView from './screens/Camera/CameraView';

export default MainNavigator = createBottomTabNavigator({
    camera: { screen: CameraView },
})
