import { createBottomTabNavigator } from 'react-navigation';
import { CameraView } from 'screens/Camera/CameraView';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { AuthScreen } from 'screens/AuthScreen';
import { HandleBoot } from 'HandleBoot';

const AppNavigator = createBottomTabNavigator({
    camera: { screen: CameraView },
}, { animationEnabled: true });

export const MainNavigator = createBottomTabNavigator({
    root: { screen: HandleBoot },
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen },
    main: AppNavigator,
}, { animationEnabled: true });
