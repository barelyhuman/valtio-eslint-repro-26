import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { memberStore } from "./store/member";

export const App = () => {
  return (
    <>
      <DirectUsage />

      {/* valid cases */}
      <InsideCallback />
      <InsideAnEffectCallback />

      {/* should warn */}
      <InsideCallbackInvalid />
      <InsideAnEffectCallbackInvalid />
    </>
  );
};

export const DirectUsage = () => {
  const { isEdited } = useSnapshot(memberStore);
  return <>{isEdited}</>;
};

export const InsideCallback = () => {
  const { isEdited } = useSnapshot(memberStore);
  const saveChange = () => {
    memberStore.member = memberStore.memberEdit;
  };
  return (
    <>
      <button onClick={isEdited ? saveChange : null} disabled={!isEdited}>
        Save Changes
      </button>
    </>
  );
};

export const InsideAnEffectCallback = () => {
  const { isEdited } = useSnapshot(memberStore);

  useEffect(() => {
    // shouldn't really do it , if it's computed
    // but just for the tests
    memberStore.isEdited = false;
  }, []);

  return <>{isEdited}</>;
};

// should have a warning
export const InsideCallbackInvalid = () => {
  const { isEdited } = useSnapshot(memberStore);

  const reset = () => {
    isEdited = false;
  };

  return (
    <>
      <button onClick={reset} disabled={!isEdited}>
        Reset
      </button>
    </>
  );
};

// should have a warning
export const InsideAnEffectCallbackInvalid = () => {
  const { isEdited } = useSnapshot(memberStore);

  useEffect(() => {
    isEdited = false;
  }, []);

  return <></>;
};
