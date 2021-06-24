import { withStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../store/actions/authActions";
import BasicDrawer from "./BasicDrawer";
import useStyles from "./drawer";
import SellerDrawer from "./SellerDrawer";
import UserDrawer from "./UserDrawer";

const Index = (props) => {
  const { openDrawer, setOpenDrawer } = props;
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  const dispatch = useDispatch();
  let storeItems = useSelector((state) => state.storeItems);
  let total = useSelector((state) => state.storeItems.total);
  const router = useRouter();

  function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  const handleSignout = () => {
    dispatch(signOut());
    router.push("/");
  };

  return auth.uid ? (
    profile.role === "ROLE_SELLER" ? (
      <SellerDrawer
        auth={auth}
        profile={profile}
        router={router}
        setOpenDrawer={setOpenDrawer}
        handleSignout={handleSignout}
        ElevationScroll={ElevationScroll}
        openDrawer={openDrawer}
        storeItems={storeItems}
        total={total}
      />
    ) : (
      <UserDrawer
        auth={auth}
        profile={profile}
        router={router}
        setOpenDrawer={setOpenDrawer}
        handleSignout={handleSignout}
        ElevationScroll={ElevationScroll}
        openDrawer={openDrawer}
        storeItems={storeItems}
        total={total}
      />
    )
  ) : (
    <BasicDrawer
      setOpenDrawer={setOpenDrawer}
      ElevationScroll={ElevationScroll}
      openDrawer={openDrawer}
    />
  );
};

export default withStyles(useStyles, { withTheme: true })(Index);
