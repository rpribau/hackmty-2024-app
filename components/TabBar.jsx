  import { View, StyleSheet } from 'react-native';
  import React from 'react';
  import PropTypes from 'prop-types'; // Importa PropTypes
  import TabBarButton from './TabBarButton';

  const TabBar = ({ state, descriptors, navigation }) => {
      const primaryColor = '#689940';
      const greyColor = '#222';

      return (
          <View style={styles.tabbar}>
              {state.routes.map((route, index) => {
                  const { options } = descriptors[route.key];
                  const label =
                      options.tabBarLabel !== undefined
                          ? options.tabBarLabel
                          : options.title !== undefined
                              ? options.title
                              : route.name;

                  if (['_sitemap', '+not-found'].includes(route.name)) return null;

                  const isFocused = state.index === index;

                  const onPress = () => {
                      const event = navigation.emit({
                          type: 'tabPress',
                          target: route.key,
                          canPreventDefault: true,
                      });

                      if (!isFocused && !event.defaultPrevented) {
                          navigation.navigate(route.name, route.params);
                      }
                  };

                  const onLongPress = () => {
                      navigation.emit({
                          type: 'tabLongPress',
                          target: route.key,
                      });
                  };

                  return (
                      <TabBarButton
                          key={route.name}
                          style={styles.tabbarItem}
                          onPress={onPress}
                          onLongPress={onLongPress}
                          isFocused={isFocused}
                          routeName={route.name}
                          color={isFocused ? primaryColor : greyColor}
                          label={label}
                      />
                  );
              })}
          </View>
      );
  };

  // Define los PropTypes justo después de la definición del componente
  TabBar.propTypes = {
      state: PropTypes.object.isRequired,
      descriptors: PropTypes.object.isRequired,
      navigation: PropTypes.object.isRequired
  };

  const styles = StyleSheet.create({
      tabbar: {
          
          bottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: '#fff',
          borderRadius: 25,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          shadowOpacity: 0.1,
          elevation: 5, // Para sombra en Android
      },
  });

  export default TabBar;