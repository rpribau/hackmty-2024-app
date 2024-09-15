import React from 'react'
import {Tabs} from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
    return (
        <Tabs
            tabBar={props=> <TabBar {...props}/>}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="wallet"
                options={{
                    title: 'Wallet',
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="investments"
                options={{
                    title: 'Stocks',
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="social"
                options={{
                    title: 'News',
                    headerShown: false,
                }}
            />

        </Tabs>
    )
}

export default _layout