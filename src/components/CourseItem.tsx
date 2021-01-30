import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import React from "react";

const CourseItem: React.FC<{
  id: string;
  title: string;
  enrollmentDate: Date;
}> = (props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>
          {"Enrolled on: "}
          {props.enrollmentDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </IonCardSubtitle>
        <IonCardTitle> {props.title} </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="ion-text-center">
        <IonButton routerLink={`/courses/${props.id}`}>
          View Course Goals
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default CourseItem;
