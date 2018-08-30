import { createBottomTabNavigator } from 'react-navigation';
import { CameraView } from 'screens/Camera/CameraView';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { AuthScreen } from 'screens/AuthScreen';

const AppNavigator = createBottomTabNavigator({
    camera: { screen: CameraView },
});

export const MainNavigator = createBottomTabNavigator({
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen },
    main: AppNavigator,
});
