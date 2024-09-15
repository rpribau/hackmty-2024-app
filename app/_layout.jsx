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
                name="frida"
                options={{
                    title: 'AI Frida',
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="automatic"
                options={{
                    title: 'IoT Settings',
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="products"
                options={{
                    title: 'Products',
                    headerShown: false,
                }}
            />


        </Tabs>
    )
}

export default _layout