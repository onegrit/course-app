import React from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";

import { COURSE_DATA } from "../data/course-data";
import { create, trash } from "ionicons/icons";

const CourseGoals: React.FC = () => {
  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  let course = null;
  if (selectedCourseId) {
    course = COURSE_DATA.find((course) => course.id === selectedCourseId);
  }

  const editGoalHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Edit ...");
  };
  const deleteGoalHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Delted...");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{course ? course.title : "Not course found"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {course && (
          <IonList>
            {course.goals.map((goal) => (
              <IonItemSliding key={goal.id}>
                <IonItemOptions side="start">
                  <IonItemOption onClick={deleteGoalHandler} color="danger">
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>
                <IonItem lines="full">
                  <IonLabel>{goal.text}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption onClick={editGoalHandler}>
                    <IonIcon icon={create} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CourseGoals;
