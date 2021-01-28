import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import React, { useState } from "react";

const EditGoalModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  //   onEditing: () => void;
  editedGoal: { id: string; text: string } | null;
}> = (props) => {
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.editedGoal ? "Edit" : "Add"} Goal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Goal</IonLabel>
                <IonInput type="text" value={props.editedGoal?.text} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton fill="clear" color="dark" onClick={props.onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                color="secondary"
                expand="block"
                // onClick={props.onEditing}
              >
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonContent></IonContent>
    </IonModal>
  );
};

export default EditGoalModal;
