import { Popover } from "antd"
import React from "react"
import CustomAvatar from "./custom-avatar";
import { useGetIdentity } from "@refinedev/core";
import { User } from "../graphql/schema.types";

const CurrentUser = () => {
  const { data: currentUser } = useGetIdentity<User>();
  return (
    <div>
      <Popover
        placement="bottomRight"
        trigger='click'
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar
          name={currentUser?.name ?? ""}
          src={currentUser?.avatarUrl}
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>
    </div>
  )
}

export default CurrentUser;