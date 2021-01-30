import React, { useRef, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const AddCourseModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (title: string, date: Date) => void;
}> = (props) => {
  const titleRef = useRef<HTMLIonInputElement>(null);
  const dateRef = useRef<HTMLIonDatetimeElement>(null);
  const [error, setError] = useState("");
  const saveHandler = () => {
    /**
     * Task:
     * 1. extract value and check whether they'are valid,提取数据并验证数据
     * 2. 将数组转发给使用这个组件的组件,本例中,使用这个组件的父组件是Course
     */
    const enteredTitle = titleRef.current!.value;
    const selectedDate = dateRef.current!.value;
    if (
      !enteredTitle ||
      !selectedDate ||
      enteredTitle.toString().trim().length === 0 ||
      selectedDate.trim().length === 0
    ) {
      // 如果数据不合法,设置error state
      setError("Please enter a valid title and select a valid date");
      return;
    }

    setError("");

    props.onSave(enteredTitle.toString(), new Date(selectedDate));
  };
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Course</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Should be Course Form */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Title</IonLabel>
                <IonInput type="text" ref={titleRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Enrolment Date</IonLabel>
                <IonDatetime displayFormat="MM DD YY" ref={dateRef} />
              </IonItem>
            </IonCol>
          </IonRow>

          {error && (
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
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
    </IonModal>
  );
};

export default AddCourseModal;
