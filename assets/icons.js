import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={22}  {...props} />,
    wallet: (props)=> <Entypo name="wallet" size={22}  {...props} />,
    investments: (props)=> <AntDesign name="linechart" size={22}  {...props} />,
    social: (props)=> <Fontisto name="world-o" size={22}  {...props} />,
}
