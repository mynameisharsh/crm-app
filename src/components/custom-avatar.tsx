import React from "react";
import { Avatar, AvatarProps } from "antd"
import { getNameInitials } from "../utilities";

type Props = AvatarProps & {
  name: string
}

const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <Avatar
      alt={name}
      size="small"
      style={{ 
        backgroundColor: "#153b50",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style
      }}
      {...rest}
    >
      {getNameInitials(name)}
    </Avatar>
  )
}

export default CustomAvatar;