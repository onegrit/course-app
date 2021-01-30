import React, { useState, useRef } from "react";
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
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  isPlatform,
  IonList,
} from "@ionic/react";
import { useParams } from "react-router-dom";

import { COURSE_DATA } from "../data/course-data";
import { addOutline } from "ionicons/icons";
import EditGoalModal from "../components/EditGoalModal";
import EditableGoalItem from "../components/EditableGoalItem";

const CourseGoals: React.FC = () => {
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  const selectedCourse = COURSE_DATA.find((c) => c.id === selectedCourseId);

  // Edit Logic
  const editGoalHandler = (event: React.MouseEvent, goalId: string) => {
    event.stopPropagation();
    const goal = selectedCourse?.goals.find(
      (g: { id: string; text: string }) => g.id === goalId
    );
    slidingOptionsRef.current?.closeOpened();
    if (!goal) {
      return;
    }
    setIsEditing(true);
    setSelectedGoal(goal);
    console.log(goal);
  };

  const cancelEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedGoal(null);
    console.log("Cancel Edit Goal...");
  };
  const saveEditGoalHandler = () => {
    setIsEditing(true);
    console.log("Save edit goal handler...");
  };

  // Delete Logic
  const startDeleteGoalHandler = () => {
    setStartedDeleting(true);
  };
  const deleteGoalHandler = () => {
    setStartedDeleting(false);
    setToastMessage("Deleted Goal!");
  };

  // Add logic
  const addGoalHandler = () => {
    setIsEditing(true);
    setSelectedGoal(null);
    // console.log("add...");
  };
  return (
    <React.Fragment>
      <EditGoalModal
        show={isEditing}
        onCancel={cancelEditGoalHandler}
        // onEditing={saveEditGoalHandler}
        editedGoal={selectedGoal}
      />
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
            <IonTitle>
              {selectedCourse ? selectedCourse.title : "Not course found"}
            </IonTitle>
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
          {selectedCourse && (
            <IonList>
              {selectedCourse.goals.map((goal) => (
                <EditableGoalItem
                  key={goal.id}
                  goalText={goal.text}
                  slidingRef={slidingOptionsRef}
                  onStartDelete={startDeleteGoalHandler}
                  onStartEdit={(e) => editGoalHandler(e, goal.id)}
                />
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
