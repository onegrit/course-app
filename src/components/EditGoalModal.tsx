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
  IonText,
} from "@ionic/react";
import React, { useState, useRef } from "react";

const EditGoalModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (title: string) => void;
  editedGoal: { id: string; text: string } | null;
}> = (props) => {
  const titleRef = useRef<HTMLIonInputElement>(null);
  const [error, setError] = useState("");

  const saveHandler = () => {
    const enteredTitle = titleRef.current!.value;
    if (!enteredTitle || enteredTitle.toString().trim().length === 0) {
      setError("Please enter a valide text!");
      return;
    }
    setError(""); // 如果是有效数据，需要清除error
    props.onSave(enteredTitle.toString());
  };

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
                <IonInput
                  type="text"
                  ref={titleRef}
                  value={props.editedGoal?.text}
                />
              </IonItem>
            </IonCol>
          </IonRow>

          {error && (
            <IonRow>
              <IonCol>
                <IonText>
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}

          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton fill="clear" color="dark" onClick={props.onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="secondary" expand="block" onClick={saveHandler}>
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
