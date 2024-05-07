import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import BookedActivitiesScreen from '../screens/BookedActivitiesScreen';
import ActivityBookScreen from '../screens/ActivityBookScreen';

import { colors } from '../constants/colors';

import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const icons = {
  home: require('../../assets/home.png'),
  settings: require('../../assets/settings.png'),
  books: require('../../assets/activity.png'),
  profile: require('../../assets/profile.png'),
  bookmark: require('../../assets/bookmark.png'),
};

const headerOptions = {
  headerTitle: '',
  headerRight: () => (
    <Image
      source={require('../../assets/menu.png')}
      style={{ height: 20, width: 20, marginRight: 15 }}
    />
  ),
  headerLeft: () => (
    <Image
      source={require('../../assets/logo.png')}
      style={{ height: 20, width: 20, marginLeft: 15 }}
    />
  )
};

const tabOptions = {
  headerShown: false,
  headerTitle: '',
  tabBarLabel: '',
  tabBarStyle: { padding: 10 },
  tabBarActiveTintColor: colors.primary,
};

const homeStack = createStackNavigator();
const userStack = createStackNavigator();
const bookmarkStack = createStackNavigator();
const booksStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <homeStack.Navigator
      initialRouteName="Home"
      screenOptions={headerOptions}
    >
      <homeStack.Screen name="Home" component={HomeScreen} />
      <homeStack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
      <homeStack.Screen name="ActivityBook" component={ActivityBookScreen} />
    </homeStack.Navigator>
  );
}

const UserStackScreen = () => {
  const { user, isLoggedIn } = useSelector(state => state.user);

  return (
    <userStack.Navigator
      screenOptions={headerOptions}
    >
      {isLoggedIn ? (
        <userStack.Screen name="Profile" component={ProfileScreen} />
      ) : (
        <>
          <userStack.Screen name="Login" component={LoginScreen} />
          <userStack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </userStack.Navigator>
  );
}

const BookmarkStackScreen = () => {
  return (
    <bookmarkStack.Navigator
      screenOptions={headerOptions}
    >
      <bookmarkStack.Screen name="Bookmark" component={BookmarkScreen} />
    </bookmarkStack.Navigator>
  );
}

const BookedActivitiesStackScreen = () => {
  return (
    <booksStack.Navigator
      screenOptions={headerOptions}
    >
      <booksStack.Screen name="Books" component={BookedActivitiesScreen} />
    </booksStack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="HomeContainer">
      <Tab.Screen
        name="HomeContainer"
        component={HomeStackScreen}
        options={{
          ...tabOptions,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={icons.home}
              style={{ height: size, width: size }}
              tintColor={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="BookmarkContainer"
        component={BookmarkStackScreen}
        options={{
          ...tabOptions,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={icons.bookmark}
              style={{ height: size, width: size }}
              tintColor={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="BookedActivitiesContainer"
        component={BookedActivitiesStackScreen}
        options={{
          ...tabOptions,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={icons.books}
              style={{ height: size, width: size }}
              tintColor={color}
            />
          )
        }}
      />

      <Tab.Screen
        name="userContainer"
        component={UserStackScreen}
        options={{
          ...tabOptions,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={icons.profile}
              style={{ height: size, width: size }}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}