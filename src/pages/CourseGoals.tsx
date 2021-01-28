import React, { useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
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
  IonToast,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { useParams } from "react-router-dom";

import { COURSE_DATA } from "../data/course-data";
import { addOutline, create, trash } from "ionicons/icons";

const CourseGoals: React.FC = () => {
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  let course = null;
  if (selectedCourseId) {
    course = COURSE_DATA.find((course) => course.id === selectedCourseId);
  }

  const editGoalHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Edit ...");
  };
  const startDeleteGoalHandler = (event: React.MouseEvent) => {
    setStartedDeleting(true);
  };
  const deleteGoalHandler = () => {
    setStartedDeleting(false);
    setToastMessage("Deleted Goal!");
  };
  const addGoalHandler = () => {
    console.log("add...");
  };
  return (
    <React.Fragment>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => {
          setToastMessage("");
        }}
      />
      <IonAlert
        isOpen={startedDeleting}
        header="Are you sure?"
        message="Do you want to delete the goal?"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setStartedDeleting(false);
            },
          },
          {
            text: "Yes",
            handler: deleteGoalHandler,
          },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/courses/list" />
            </IonButtons>
            <IonTitle>{course ? course.title : "Not course found"}</IonTitle>
            {
              // add on IOS
              !isPlatform("android") && (
                <IonButtons slot="end">
                  <IonButton onClick={addGoalHandler}>
                    <IonIcon slot="icon-only" icon={addOutline} />
                  </IonButton>
                </IonButtons>
              )
            }
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {course && (
            <IonList>
              {course.goals.map((goal) => (
                <IonItemSliding key={goal.id}>
                  <IonItemOptions side="start">
                    <IonItemOption
                      onClick={startDeleteGoalHandler}
                      color="danger"
                    >
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
          {
            // Fab Button for Android
            isPlatform("android") && (
              <IonFab horizontal="end" vertical="bottom" slot="fixed">
                <IonFabButton color="secondary" onClick={addGoalHandler}>
                  <IonIcon icon={addOutline} />
                </IonFabButton>
              </IonFab>
            )
          }
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default CourseGoals;
