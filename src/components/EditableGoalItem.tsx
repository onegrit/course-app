import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { trash, create } from "ionicons/icons";
import React from "react";

const EditableGoalItem: React.FC<{
  goalText: string;
  slidingRef: React.Ref<HTMLIonItemSlidingElement>;
  onStartDelete: () => void;
  onStartEdit: (event: React.MouseEvent) => void;
}> = (props) => {
  return (
    <IonItemSliding ref={props.slidingRef}>
      <IonItemOptions side="start">
        <IonItemOption onClick={props.onStartDelete} color="danger">
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
      <IonItem lines="full">
        <IonLabel>{props.goalText}</IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption onClick={props.onStartEdit}>
          <IonIcon icon={create} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default EditableGoalItem;
