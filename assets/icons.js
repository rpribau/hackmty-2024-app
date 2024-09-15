import { AntDesign, FontAwesome6, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={22}  {...props} />,
    frida: (props)=> <FontAwesome6 name="plant-wilt" size={22}  {...props} />,
    automatic: (props)=> <MaterialCommunityIcons name="auto-fix" size={22}  {...props} />,
    products: (props)=> <Feather name="package" size={22}  {...props} />,
}
