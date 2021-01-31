import React, { useState, useRef, useContext } from "react";
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
  IonItem,
  IonText,
} from "@ionic/react";
import { useParams } from "react-router-dom";

import { addOutline } from "ionicons/icons";
import EditGoalModal from "../components/EditGoalModal";
import EditableGoalItem from "../components/EditableGoalItem";
import CourseContext from "../data/courses-context";

const CourseGoals: React.FC = () => {
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const selectedGoalRef = useRef<string | null>(null);

  const courseCtx = useContext(CourseContext);

  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  const selectedCourse = courseCtx.courses.find(
    (c) => c.id === selectedCourseId
  );

  // Conditional rendering
  let content = (
    <IonItem>
      <IonText>No goals found!</IonText>
    </IonItem>
  );
  if (!selectedCourse) {
    content = (
      <IonItem>
        <IonText>No Course found!</IonText>
      </IonItem>
    );
  }
  if (selectedCourse && selectedCourse.goals.length > 0) {
    content = (
      <IonList>
        {selectedCourse.goals.map((goal) => (
          <EditableGoalItem
            key={goal.id}
            goalText={goal.text}
            slidingRef={slidingOptionsRef}
            onStartDelete={() => startDeleteGoalHandler(goal.id)}
            onStartEdit={(e) => editGoalHandler(e, goal.id)}
          />
        ))}
      </IonList>
    );
  }
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

  // Save Logic
  const saveGoalHandler = (goalTitle: string) => {
    if (selectedGoal) {
      // Edting
      console.log(selectedGoal);

      courseCtx.updateGoal(selectedCourseId, selectedGoal.id, goalTitle);
    } else {
      // Adding
      courseCtx.addGoal(selectedCourseId, goalTitle);
    }
    setIsEditing(false); // Close the modal. 更进一步，提供保存和保存并退出两个button
    slidingOptionsRef.current?.closeOpened();
  };

  // Delete Logic
  const startDeleteGoalHandler = (goalId: string) => {
    // Fix: 将原设置IonToast onDidMiss上的清空通知操作转移到这里，避免warning
    setToastMessage("");
    setStartedDeleting(true);
    // 利用useRef保存将要删除的goal
    selectedGoalRef.current = goalId;
  };
  const deleteGoalHandler = () => {
    setStartedDeleting(false);
    courseCtx.deleteGoal(selectedCourseId, selectedGoalRef.current!);
    setToastMessage("Deleted Goal!");
  };

  // Add logic
  const startAddGoalHandler = () => {
    setIsEditing(true);
    setSelectedGoal(null);
    // console.log("add...");
  };
  return (
    <React.Fragment>
      <EditGoalModal
        show={isEditing}
        onCancel={cancelEditGoalHandler}
        onSave={saveGoalHandler}
        editedGoal={selectedGoal}
      />
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
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
                  <IonButton onClick={startAddGoalHandler}>
                    <IonIcon slot="icon-only" icon={addOutline} />
                  </IonButton>
                </IonButtons>
              )
            }
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {content}
          {
            // Fab Button for Android
            isPlatform("android") && (
              <IonFab horizontal="end" vertical="bottom" slot="fixed">
                <IonFabButton color="secondary" onClick={startAddGoalHandler}>
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
